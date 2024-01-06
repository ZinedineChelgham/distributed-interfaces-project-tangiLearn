import {
  __commonJS,
  __export,
  __toESM
} from "./chunk-ZS7NZCD4.js";

// node_modules/jquery/dist/jquery.min.js
var require_jquery_min = __commonJS({
  "node_modules/jquery/dist/jquery.min.js"(exports, module) {
    !function(e, t) {
      "use strict";
      "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, true) : function(e2) {
        if (!e2.document)
          throw new Error("jQuery requires a window with a document");
        return t(e2);
      } : t(e);
    }("undefined" != typeof window ? window : exports, function(C, e) {
      "use strict";
      var t = [], r = Object.getPrototypeOf, s = t.slice, g = t.flat ? function(e2) {
        return t.flat.call(e2);
      } : function(e2) {
        return t.concat.apply([], e2);
      }, u = t.push, i2 = t.indexOf, n = {}, o = n.toString, v = n.hasOwnProperty, a = v.toString, l = a.call(Object), y = {}, m = function(e2) {
        return "function" == typeof e2 && "number" != typeof e2.nodeType;
      }, x = function(e2) {
        return null != e2 && e2 === e2.window;
      }, E = C.document, c = { type: true, src: true, nonce: true, noModule: true };
      function b(e2, t2, n2) {
        var r2, i3, o2 = (n2 = n2 || E).createElement("script");
        if (o2.text = e2, t2)
          for (r2 in c)
            (i3 = t2[r2] || t2.getAttribute && t2.getAttribute(r2)) && o2.setAttribute(r2, i3);
        n2.head.appendChild(o2).parentNode.removeChild(o2);
      }
      function w(e2) {
        return null == e2 ? e2 + "" : "object" == typeof e2 || "function" == typeof e2 ? n[o.call(e2)] || "object" : typeof e2;
      }
      var f = "3.5.0", S = function(e2, t2) {
        return new S.fn.init(e2, t2);
      };
      function p(e2) {
        var t2 = !!e2 && "length" in e2 && e2.length, n2 = w(e2);
        return !m(e2) && !x(e2) && ("array" === n2 || 0 === t2 || "number" == typeof t2 && 0 < t2 && t2 - 1 in e2);
      }
      S.fn = S.prototype = { jquery: f, constructor: S, length: 0, toArray: function() {
        return s.call(this);
      }, get: function(e2) {
        return null == e2 ? s.call(this) : e2 < 0 ? this[e2 + this.length] : this[e2];
      }, pushStack: function(e2) {
        var t2 = S.merge(this.constructor(), e2);
        return t2.prevObject = this, t2;
      }, each: function(e2) {
        return S.each(this, e2);
      }, map: function(n2) {
        return this.pushStack(S.map(this, function(e2, t2) {
          return n2.call(e2, t2, e2);
        }));
      }, slice: function() {
        return this.pushStack(s.apply(this, arguments));
      }, first: function() {
        return this.eq(0);
      }, last: function() {
        return this.eq(-1);
      }, even: function() {
        return this.pushStack(S.grep(this, function(e2, t2) {
          return (t2 + 1) % 2;
        }));
      }, odd: function() {
        return this.pushStack(S.grep(this, function(e2, t2) {
          return t2 % 2;
        }));
      }, eq: function(e2) {
        var t2 = this.length, n2 = +e2 + (e2 < 0 ? t2 : 0);
        return this.pushStack(0 <= n2 && n2 < t2 ? [this[n2]] : []);
      }, end: function() {
        return this.prevObject || this.constructor();
      }, push: u, sort: t.sort, splice: t.splice }, S.extend = S.fn.extend = function() {
        var e2, t2, n2, r2, i3, o2, a2 = arguments[0] || {}, s2 = 1, u2 = arguments.length, l2 = false;
        for ("boolean" == typeof a2 && (l2 = a2, a2 = arguments[s2] || {}, s2++), "object" == typeof a2 || m(a2) || (a2 = {}), s2 === u2 && (a2 = this, s2--); s2 < u2; s2++)
          if (null != (e2 = arguments[s2]))
            for (t2 in e2)
              r2 = e2[t2], "__proto__" !== t2 && a2 !== r2 && (l2 && r2 && (S.isPlainObject(r2) || (i3 = Array.isArray(r2))) ? (n2 = a2[t2], o2 = i3 && !Array.isArray(n2) ? [] : i3 || S.isPlainObject(n2) ? n2 : {}, i3 = false, a2[t2] = S.extend(l2, o2, r2)) : void 0 !== r2 && (a2[t2] = r2));
        return a2;
      }, S.extend({ expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""), isReady: true, error: function(e2) {
        throw new Error(e2);
      }, noop: function() {
      }, isPlainObject: function(e2) {
        var t2, n2;
        return !(!e2 || "[object Object]" !== o.call(e2)) && (!(t2 = r(e2)) || "function" == typeof (n2 = v.call(t2, "constructor") && t2.constructor) && a.call(n2) === l);
      }, isEmptyObject: function(e2) {
        var t2;
        for (t2 in e2)
          return false;
        return true;
      }, globalEval: function(e2, t2, n2) {
        b(e2, { nonce: t2 && t2.nonce }, n2);
      }, each: function(e2, t2) {
        var n2, r2 = 0;
        if (p(e2)) {
          for (n2 = e2.length; r2 < n2; r2++)
            if (false === t2.call(e2[r2], r2, e2[r2]))
              break;
        } else
          for (r2 in e2)
            if (false === t2.call(e2[r2], r2, e2[r2]))
              break;
        return e2;
      }, makeArray: function(e2, t2) {
        var n2 = t2 || [];
        return null != e2 && (p(Object(e2)) ? S.merge(n2, "string" == typeof e2 ? [e2] : e2) : u.call(n2, e2)), n2;
      }, inArray: function(e2, t2, n2) {
        return null == t2 ? -1 : i2.call(t2, e2, n2);
      }, merge: function(e2, t2) {
        for (var n2 = +t2.length, r2 = 0, i3 = e2.length; r2 < n2; r2++)
          e2[i3++] = t2[r2];
        return e2.length = i3, e2;
      }, grep: function(e2, t2, n2) {
        for (var r2 = [], i3 = 0, o2 = e2.length, a2 = !n2; i3 < o2; i3++)
          !t2(e2[i3], i3) !== a2 && r2.push(e2[i3]);
        return r2;
      }, map: function(e2, t2, n2) {
        var r2, i3, o2 = 0, a2 = [];
        if (p(e2))
          for (r2 = e2.length; o2 < r2; o2++)
            null != (i3 = t2(e2[o2], o2, n2)) && a2.push(i3);
        else
          for (o2 in e2)
            null != (i3 = t2(e2[o2], o2, n2)) && a2.push(i3);
        return g(a2);
      }, guid: 1, support: y }), "function" == typeof Symbol && (S.fn[Symbol.iterator] = t[Symbol.iterator]), S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e2, t2) {
        n["[object " + t2 + "]"] = t2.toLowerCase();
      });
      var d = function(n2) {
        var e2, d2, b2, o2, i3, h2, f2, g2, w2, u2, l2, T2, C2, a2, E2, v2, s2, c2, y2, S2 = "sizzle" + 1 * /* @__PURE__ */ new Date(), p2 = n2.document, k2 = 0, r2 = 0, m2 = ue2(), x2 = ue2(), A2 = ue2(), N2 = ue2(), D2 = function(e3, t3) {
          return e3 === t3 && (l2 = true), 0;
        }, j2 = {}.hasOwnProperty, t2 = [], q2 = t2.pop, L2 = t2.push, H2 = t2.push, O2 = t2.slice, P2 = function(e3, t3) {
          for (var n3 = 0, r3 = e3.length; n3 < r3; n3++)
            if (e3[n3] === t3)
              return n3;
          return -1;
        }, R2 = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", M2 = "[\\x20\\t\\r\\n\\f]", I2 = "(?:\\\\[\\da-fA-F]{1,6}" + M2 + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", W2 = "\\[" + M2 + "*(" + I2 + ")(?:" + M2 + "*([*^$|!~]?=)" + M2 + `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + I2 + "))|)" + M2 + "*\\]", F2 = ":(" + I2 + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + W2 + ")*)|.*)\\)|)", B2 = new RegExp(M2 + "+", "g"), $3 = new RegExp("^" + M2 + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M2 + "+$", "g"), _2 = new RegExp("^" + M2 + "*," + M2 + "*"), z2 = new RegExp("^" + M2 + "*([>+~]|" + M2 + ")" + M2 + "*"), U2 = new RegExp(M2 + "|>"), X2 = new RegExp(F2), V2 = new RegExp("^" + I2 + "$"), G2 = { ID: new RegExp("^#(" + I2 + ")"), CLASS: new RegExp("^\\.(" + I2 + ")"), TAG: new RegExp("^(" + I2 + "|[*])"), ATTR: new RegExp("^" + W2), PSEUDO: new RegExp("^" + F2), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M2 + "*(even|odd|(([+-]|)(\\d*)n|)" + M2 + "*(?:([+-]|)" + M2 + "*(\\d+)|))" + M2 + "*\\)|)", "i"), bool: new RegExp("^(?:" + R2 + ")$", "i"), needsContext: new RegExp("^" + M2 + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M2 + "*((?:-\\d)?\\d*)" + M2 + "*\\)|)(?=[^-]|$)", "i") }, Y2 = /HTML$/i, Q2 = /^(?:input|select|textarea|button)$/i, J2 = /^h\d$/i, K2 = /^[^{]+\{\s*\[native \w/, Z2 = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ee2 = /[+~]/, te2 = new RegExp("\\\\[\\da-fA-F]{1,6}" + M2 + "?|\\\\([^\\r\\n\\f])", "g"), ne2 = function(e3, t3) {
          var n3 = "0x" + e3.slice(1) - 65536;
          return t3 || (n3 < 0 ? String.fromCharCode(n3 + 65536) : String.fromCharCode(n3 >> 10 | 55296, 1023 & n3 | 56320));
        }, re3 = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, ie2 = function(e3, t3) {
          return t3 ? "\0" === e3 ? "�" : e3.slice(0, -1) + "\\" + e3.charCodeAt(e3.length - 1).toString(16) + " " : "\\" + e3;
        }, oe2 = function() {
          T2();
        }, ae2 = be2(function(e3) {
          return true === e3.disabled && "fieldset" === e3.nodeName.toLowerCase();
        }, { dir: "parentNode", next: "legend" });
        try {
          H2.apply(t2 = O2.call(p2.childNodes), p2.childNodes), t2[p2.childNodes.length].nodeType;
        } catch (e3) {
          H2 = { apply: t2.length ? function(e4, t3) {
            L2.apply(e4, O2.call(t3));
          } : function(e4, t3) {
            var n3 = e4.length, r3 = 0;
            while (e4[n3++] = t3[r3++])
              ;
            e4.length = n3 - 1;
          } };
        }
        function se2(t3, e3, n3, r3) {
          var i4, o3, a3, s3, u3, l3, c3, f3 = e3 && e3.ownerDocument, p3 = e3 ? e3.nodeType : 9;
          if (n3 = n3 || [], "string" != typeof t3 || !t3 || 1 !== p3 && 9 !== p3 && 11 !== p3)
            return n3;
          if (!r3 && (T2(e3), e3 = e3 || C2, E2)) {
            if (11 !== p3 && (u3 = Z2.exec(t3)))
              if (i4 = u3[1]) {
                if (9 === p3) {
                  if (!(a3 = e3.getElementById(i4)))
                    return n3;
                  if (a3.id === i4)
                    return n3.push(a3), n3;
                } else if (f3 && (a3 = f3.getElementById(i4)) && y2(e3, a3) && a3.id === i4)
                  return n3.push(a3), n3;
              } else {
                if (u3[2])
                  return H2.apply(n3, e3.getElementsByTagName(t3)), n3;
                if ((i4 = u3[3]) && d2.getElementsByClassName && e3.getElementsByClassName)
                  return H2.apply(n3, e3.getElementsByClassName(i4)), n3;
              }
            if (d2.qsa && !N2[t3 + " "] && (!v2 || !v2.test(t3)) && (1 !== p3 || "object" !== e3.nodeName.toLowerCase())) {
              if (c3 = t3, f3 = e3, 1 === p3 && (U2.test(t3) || z2.test(t3))) {
                (f3 = ee2.test(t3) && ye2(e3.parentNode) || e3) === e3 && d2.scope || ((s3 = e3.getAttribute("id")) ? s3 = s3.replace(re3, ie2) : e3.setAttribute("id", s3 = S2)), o3 = (l3 = h2(t3)).length;
                while (o3--)
                  l3[o3] = (s3 ? "#" + s3 : ":scope") + " " + xe2(l3[o3]);
                c3 = l3.join(",");
              }
              try {
                return H2.apply(n3, f3.querySelectorAll(c3)), n3;
              } catch (e4) {
                N2(t3, true);
              } finally {
                s3 === S2 && e3.removeAttribute("id");
              }
            }
          }
          return g2(t3.replace($3, "$1"), e3, n3, r3);
        }
        function ue2() {
          var r3 = [];
          return function e3(t3, n3) {
            return r3.push(t3 + " ") > b2.cacheLength && delete e3[r3.shift()], e3[t3 + " "] = n3;
          };
        }
        function le2(e3) {
          return e3[S2] = true, e3;
        }
        function ce2(e3) {
          var t3 = C2.createElement("fieldset");
          try {
            return !!e3(t3);
          } catch (e4) {
            return false;
          } finally {
            t3.parentNode && t3.parentNode.removeChild(t3), t3 = null;
          }
        }
        function fe2(e3, t3) {
          var n3 = e3.split("|"), r3 = n3.length;
          while (r3--)
            b2.attrHandle[n3[r3]] = t3;
        }
        function pe2(e3, t3) {
          var n3 = t3 && e3, r3 = n3 && 1 === e3.nodeType && 1 === t3.nodeType && e3.sourceIndex - t3.sourceIndex;
          if (r3)
            return r3;
          if (n3) {
            while (n3 = n3.nextSibling)
              if (n3 === t3)
                return -1;
          }
          return e3 ? 1 : -1;
        }
        function de2(t3) {
          return function(e3) {
            return "input" === e3.nodeName.toLowerCase() && e3.type === t3;
          };
        }
        function he2(n3) {
          return function(e3) {
            var t3 = e3.nodeName.toLowerCase();
            return ("input" === t3 || "button" === t3) && e3.type === n3;
          };
        }
        function ge2(t3) {
          return function(e3) {
            return "form" in e3 ? e3.parentNode && false === e3.disabled ? "label" in e3 ? "label" in e3.parentNode ? e3.parentNode.disabled === t3 : e3.disabled === t3 : e3.isDisabled === t3 || e3.isDisabled !== !t3 && ae2(e3) === t3 : e3.disabled === t3 : "label" in e3 && e3.disabled === t3;
          };
        }
        function ve2(a3) {
          return le2(function(o3) {
            return o3 = +o3, le2(function(e3, t3) {
              var n3, r3 = a3([], e3.length, o3), i4 = r3.length;
              while (i4--)
                e3[n3 = r3[i4]] && (e3[n3] = !(t3[n3] = e3[n3]));
            });
          });
        }
        function ye2(e3) {
          return e3 && "undefined" != typeof e3.getElementsByTagName && e3;
        }
        for (e2 in d2 = se2.support = {}, i3 = se2.isXML = function(e3) {
          var t3 = e3.namespaceURI, n3 = (e3.ownerDocument || e3).documentElement;
          return !Y2.test(t3 || n3 && n3.nodeName || "HTML");
        }, T2 = se2.setDocument = function(e3) {
          var t3, n3, r3 = e3 ? e3.ownerDocument || e3 : p2;
          return r3 != C2 && 9 === r3.nodeType && r3.documentElement && (a2 = (C2 = r3).documentElement, E2 = !i3(C2), p2 != C2 && (n3 = C2.defaultView) && n3.top !== n3 && (n3.addEventListener ? n3.addEventListener("unload", oe2, false) : n3.attachEvent && n3.attachEvent("onunload", oe2)), d2.scope = ce2(function(e4) {
            return a2.appendChild(e4).appendChild(C2.createElement("div")), "undefined" != typeof e4.querySelectorAll && !e4.querySelectorAll(":scope fieldset div").length;
          }), d2.attributes = ce2(function(e4) {
            return e4.className = "i", !e4.getAttribute("className");
          }), d2.getElementsByTagName = ce2(function(e4) {
            return e4.appendChild(C2.createComment("")), !e4.getElementsByTagName("*").length;
          }), d2.getElementsByClassName = K2.test(C2.getElementsByClassName), d2.getById = ce2(function(e4) {
            return a2.appendChild(e4).id = S2, !C2.getElementsByName || !C2.getElementsByName(S2).length;
          }), d2.getById ? (b2.filter.ID = function(e4) {
            var t4 = e4.replace(te2, ne2);
            return function(e5) {
              return e5.getAttribute("id") === t4;
            };
          }, b2.find.ID = function(e4, t4) {
            if ("undefined" != typeof t4.getElementById && E2) {
              var n4 = t4.getElementById(e4);
              return n4 ? [n4] : [];
            }
          }) : (b2.filter.ID = function(e4) {
            var n4 = e4.replace(te2, ne2);
            return function(e5) {
              var t4 = "undefined" != typeof e5.getAttributeNode && e5.getAttributeNode("id");
              return t4 && t4.value === n4;
            };
          }, b2.find.ID = function(e4, t4) {
            if ("undefined" != typeof t4.getElementById && E2) {
              var n4, r4, i4, o3 = t4.getElementById(e4);
              if (o3) {
                if ((n4 = o3.getAttributeNode("id")) && n4.value === e4)
                  return [o3];
                i4 = t4.getElementsByName(e4), r4 = 0;
                while (o3 = i4[r4++])
                  if ((n4 = o3.getAttributeNode("id")) && n4.value === e4)
                    return [o3];
              }
              return [];
            }
          }), b2.find.TAG = d2.getElementsByTagName ? function(e4, t4) {
            return "undefined" != typeof t4.getElementsByTagName ? t4.getElementsByTagName(e4) : d2.qsa ? t4.querySelectorAll(e4) : void 0;
          } : function(e4, t4) {
            var n4, r4 = [], i4 = 0, o3 = t4.getElementsByTagName(e4);
            if ("*" === e4) {
              while (n4 = o3[i4++])
                1 === n4.nodeType && r4.push(n4);
              return r4;
            }
            return o3;
          }, b2.find.CLASS = d2.getElementsByClassName && function(e4, t4) {
            if ("undefined" != typeof t4.getElementsByClassName && E2)
              return t4.getElementsByClassName(e4);
          }, s2 = [], v2 = [], (d2.qsa = K2.test(C2.querySelectorAll)) && (ce2(function(e4) {
            var t4;
            a2.appendChild(e4).innerHTML = "<a id='" + S2 + "'></a><select id='" + S2 + "-\r\\' msallowcapture=''><option selected=''></option></select>", e4.querySelectorAll("[msallowcapture^='']").length && v2.push("[*^$]=" + M2 + `*(?:''|"")`), e4.querySelectorAll("[selected]").length || v2.push("\\[" + M2 + "*(?:value|" + R2 + ")"), e4.querySelectorAll("[id~=" + S2 + "-]").length || v2.push("~="), (t4 = C2.createElement("input")).setAttribute("name", ""), e4.appendChild(t4), e4.querySelectorAll("[name='']").length || v2.push("\\[" + M2 + "*name" + M2 + "*=" + M2 + `*(?:''|"")`), e4.querySelectorAll(":checked").length || v2.push(":checked"), e4.querySelectorAll("a#" + S2 + "+*").length || v2.push(".#.+[+~]"), e4.querySelectorAll("\\\f"), v2.push("[\\r\\n\\f]");
          }), ce2(function(e4) {
            e4.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
            var t4 = C2.createElement("input");
            t4.setAttribute("type", "hidden"), e4.appendChild(t4).setAttribute("name", "D"), e4.querySelectorAll("[name=d]").length && v2.push("name" + M2 + "*[*^$|!~]?="), 2 !== e4.querySelectorAll(":enabled").length && v2.push(":enabled", ":disabled"), a2.appendChild(e4).disabled = true, 2 !== e4.querySelectorAll(":disabled").length && v2.push(":enabled", ":disabled"), e4.querySelectorAll("*,:x"), v2.push(",.*:");
          })), (d2.matchesSelector = K2.test(c2 = a2.matches || a2.webkitMatchesSelector || a2.mozMatchesSelector || a2.oMatchesSelector || a2.msMatchesSelector)) && ce2(function(e4) {
            d2.disconnectedMatch = c2.call(e4, "*"), c2.call(e4, "[s!='']:x"), s2.push("!=", F2);
          }), v2 = v2.length && new RegExp(v2.join("|")), s2 = s2.length && new RegExp(s2.join("|")), t3 = K2.test(a2.compareDocumentPosition), y2 = t3 || K2.test(a2.contains) ? function(e4, t4) {
            var n4 = 9 === e4.nodeType ? e4.documentElement : e4, r4 = t4 && t4.parentNode;
            return e4 === r4 || !(!r4 || 1 !== r4.nodeType || !(n4.contains ? n4.contains(r4) : e4.compareDocumentPosition && 16 & e4.compareDocumentPosition(r4)));
          } : function(e4, t4) {
            if (t4) {
              while (t4 = t4.parentNode)
                if (t4 === e4)
                  return true;
            }
            return false;
          }, D2 = t3 ? function(e4, t4) {
            if (e4 === t4)
              return l2 = true, 0;
            var n4 = !e4.compareDocumentPosition - !t4.compareDocumentPosition;
            return n4 || (1 & (n4 = (e4.ownerDocument || e4) == (t4.ownerDocument || t4) ? e4.compareDocumentPosition(t4) : 1) || !d2.sortDetached && t4.compareDocumentPosition(e4) === n4 ? e4 == C2 || e4.ownerDocument == p2 && y2(p2, e4) ? -1 : t4 == C2 || t4.ownerDocument == p2 && y2(p2, t4) ? 1 : u2 ? P2(u2, e4) - P2(u2, t4) : 0 : 4 & n4 ? -1 : 1);
          } : function(e4, t4) {
            if (e4 === t4)
              return l2 = true, 0;
            var n4, r4 = 0, i4 = e4.parentNode, o3 = t4.parentNode, a3 = [e4], s3 = [t4];
            if (!i4 || !o3)
              return e4 == C2 ? -1 : t4 == C2 ? 1 : i4 ? -1 : o3 ? 1 : u2 ? P2(u2, e4) - P2(u2, t4) : 0;
            if (i4 === o3)
              return pe2(e4, t4);
            n4 = e4;
            while (n4 = n4.parentNode)
              a3.unshift(n4);
            n4 = t4;
            while (n4 = n4.parentNode)
              s3.unshift(n4);
            while (a3[r4] === s3[r4])
              r4++;
            return r4 ? pe2(a3[r4], s3[r4]) : a3[r4] == p2 ? -1 : s3[r4] == p2 ? 1 : 0;
          }), C2;
        }, se2.matches = function(e3, t3) {
          return se2(e3, null, null, t3);
        }, se2.matchesSelector = function(e3, t3) {
          if (T2(e3), d2.matchesSelector && E2 && !N2[t3 + " "] && (!s2 || !s2.test(t3)) && (!v2 || !v2.test(t3)))
            try {
              var n3 = c2.call(e3, t3);
              if (n3 || d2.disconnectedMatch || e3.document && 11 !== e3.document.nodeType)
                return n3;
            } catch (e4) {
              N2(t3, true);
            }
          return 0 < se2(t3, C2, null, [e3]).length;
        }, se2.contains = function(e3, t3) {
          return (e3.ownerDocument || e3) != C2 && T2(e3), y2(e3, t3);
        }, se2.attr = function(e3, t3) {
          (e3.ownerDocument || e3) != C2 && T2(e3);
          var n3 = b2.attrHandle[t3.toLowerCase()], r3 = n3 && j2.call(b2.attrHandle, t3.toLowerCase()) ? n3(e3, t3, !E2) : void 0;
          return void 0 !== r3 ? r3 : d2.attributes || !E2 ? e3.getAttribute(t3) : (r3 = e3.getAttributeNode(t3)) && r3.specified ? r3.value : null;
        }, se2.escape = function(e3) {
          return (e3 + "").replace(re3, ie2);
        }, se2.error = function(e3) {
          throw new Error("Syntax error, unrecognized expression: " + e3);
        }, se2.uniqueSort = function(e3) {
          var t3, n3 = [], r3 = 0, i4 = 0;
          if (l2 = !d2.detectDuplicates, u2 = !d2.sortStable && e3.slice(0), e3.sort(D2), l2) {
            while (t3 = e3[i4++])
              t3 === e3[i4] && (r3 = n3.push(i4));
            while (r3--)
              e3.splice(n3[r3], 1);
          }
          return u2 = null, e3;
        }, o2 = se2.getText = function(e3) {
          var t3, n3 = "", r3 = 0, i4 = e3.nodeType;
          if (i4) {
            if (1 === i4 || 9 === i4 || 11 === i4) {
              if ("string" == typeof e3.textContent)
                return e3.textContent;
              for (e3 = e3.firstChild; e3; e3 = e3.nextSibling)
                n3 += o2(e3);
            } else if (3 === i4 || 4 === i4)
              return e3.nodeValue;
          } else
            while (t3 = e3[r3++])
              n3 += o2(t3);
          return n3;
        }, (b2 = se2.selectors = { cacheLength: 50, createPseudo: le2, match: G2, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: true }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: true }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function(e3) {
          return e3[1] = e3[1].replace(te2, ne2), e3[3] = (e3[3] || e3[4] || e3[5] || "").replace(te2, ne2), "~=" === e3[2] && (e3[3] = " " + e3[3] + " "), e3.slice(0, 4);
        }, CHILD: function(e3) {
          return e3[1] = e3[1].toLowerCase(), "nth" === e3[1].slice(0, 3) ? (e3[3] || se2.error(e3[0]), e3[4] = +(e3[4] ? e3[5] + (e3[6] || 1) : 2 * ("even" === e3[3] || "odd" === e3[3])), e3[5] = +(e3[7] + e3[8] || "odd" === e3[3])) : e3[3] && se2.error(e3[0]), e3;
        }, PSEUDO: function(e3) {
          var t3, n3 = !e3[6] && e3[2];
          return G2.CHILD.test(e3[0]) ? null : (e3[3] ? e3[2] = e3[4] || e3[5] || "" : n3 && X2.test(n3) && (t3 = h2(n3, true)) && (t3 = n3.indexOf(")", n3.length - t3) - n3.length) && (e3[0] = e3[0].slice(0, t3), e3[2] = n3.slice(0, t3)), e3.slice(0, 3));
        } }, filter: { TAG: function(e3) {
          var t3 = e3.replace(te2, ne2).toLowerCase();
          return "*" === e3 ? function() {
            return true;
          } : function(e4) {
            return e4.nodeName && e4.nodeName.toLowerCase() === t3;
          };
        }, CLASS: function(e3) {
          var t3 = m2[e3 + " "];
          return t3 || (t3 = new RegExp("(^|" + M2 + ")" + e3 + "(" + M2 + "|$)")) && m2(e3, function(e4) {
            return t3.test("string" == typeof e4.className && e4.className || "undefined" != typeof e4.getAttribute && e4.getAttribute("class") || "");
          });
        }, ATTR: function(n3, r3, i4) {
          return function(e3) {
            var t3 = se2.attr(e3, n3);
            return null == t3 ? "!=" === r3 : !r3 || (t3 += "", "=" === r3 ? t3 === i4 : "!=" === r3 ? t3 !== i4 : "^=" === r3 ? i4 && 0 === t3.indexOf(i4) : "*=" === r3 ? i4 && -1 < t3.indexOf(i4) : "$=" === r3 ? i4 && t3.slice(-i4.length) === i4 : "~=" === r3 ? -1 < (" " + t3.replace(B2, " ") + " ").indexOf(i4) : "|=" === r3 && (t3 === i4 || t3.slice(0, i4.length + 1) === i4 + "-"));
          };
        }, CHILD: function(h3, e3, t3, g3, v3) {
          var y3 = "nth" !== h3.slice(0, 3), m3 = "last" !== h3.slice(-4), x3 = "of-type" === e3;
          return 1 === g3 && 0 === v3 ? function(e4) {
            return !!e4.parentNode;
          } : function(e4, t4, n3) {
            var r3, i4, o3, a3, s3, u3, l3 = y3 !== m3 ? "nextSibling" : "previousSibling", c3 = e4.parentNode, f3 = x3 && e4.nodeName.toLowerCase(), p3 = !n3 && !x3, d3 = false;
            if (c3) {
              if (y3) {
                while (l3) {
                  a3 = e4;
                  while (a3 = a3[l3])
                    if (x3 ? a3.nodeName.toLowerCase() === f3 : 1 === a3.nodeType)
                      return false;
                  u3 = l3 = "only" === h3 && !u3 && "nextSibling";
                }
                return true;
              }
              if (u3 = [m3 ? c3.firstChild : c3.lastChild], m3 && p3) {
                d3 = (s3 = (r3 = (i4 = (o3 = (a3 = c3)[S2] || (a3[S2] = {}))[a3.uniqueID] || (o3[a3.uniqueID] = {}))[h3] || [])[0] === k2 && r3[1]) && r3[2], a3 = s3 && c3.childNodes[s3];
                while (a3 = ++s3 && a3 && a3[l3] || (d3 = s3 = 0) || u3.pop())
                  if (1 === a3.nodeType && ++d3 && a3 === e4) {
                    i4[h3] = [k2, s3, d3];
                    break;
                  }
              } else if (p3 && (d3 = s3 = (r3 = (i4 = (o3 = (a3 = e4)[S2] || (a3[S2] = {}))[a3.uniqueID] || (o3[a3.uniqueID] = {}))[h3] || [])[0] === k2 && r3[1]), false === d3) {
                while (a3 = ++s3 && a3 && a3[l3] || (d3 = s3 = 0) || u3.pop())
                  if ((x3 ? a3.nodeName.toLowerCase() === f3 : 1 === a3.nodeType) && ++d3 && (p3 && ((i4 = (o3 = a3[S2] || (a3[S2] = {}))[a3.uniqueID] || (o3[a3.uniqueID] = {}))[h3] = [k2, d3]), a3 === e4))
                    break;
              }
              return (d3 -= v3) === g3 || d3 % g3 == 0 && 0 <= d3 / g3;
            }
          };
        }, PSEUDO: function(e3, o3) {
          var t3, a3 = b2.pseudos[e3] || b2.setFilters[e3.toLowerCase()] || se2.error("unsupported pseudo: " + e3);
          return a3[S2] ? a3(o3) : 1 < a3.length ? (t3 = [e3, e3, "", o3], b2.setFilters.hasOwnProperty(e3.toLowerCase()) ? le2(function(e4, t4) {
            var n3, r3 = a3(e4, o3), i4 = r3.length;
            while (i4--)
              e4[n3 = P2(e4, r3[i4])] = !(t4[n3] = r3[i4]);
          }) : function(e4) {
            return a3(e4, 0, t3);
          }) : a3;
        } }, pseudos: { not: le2(function(e3) {
          var r3 = [], i4 = [], s3 = f2(e3.replace($3, "$1"));
          return s3[S2] ? le2(function(e4, t3, n3, r4) {
            var i5, o3 = s3(e4, null, r4, []), a3 = e4.length;
            while (a3--)
              (i5 = o3[a3]) && (e4[a3] = !(t3[a3] = i5));
          }) : function(e4, t3, n3) {
            return r3[0] = e4, s3(r3, null, n3, i4), r3[0] = null, !i4.pop();
          };
        }), has: le2(function(t3) {
          return function(e3) {
            return 0 < se2(t3, e3).length;
          };
        }), contains: le2(function(t3) {
          return t3 = t3.replace(te2, ne2), function(e3) {
            return -1 < (e3.textContent || o2(e3)).indexOf(t3);
          };
        }), lang: le2(function(n3) {
          return V2.test(n3 || "") || se2.error("unsupported lang: " + n3), n3 = n3.replace(te2, ne2).toLowerCase(), function(e3) {
            var t3;
            do {
              if (t3 = E2 ? e3.lang : e3.getAttribute("xml:lang") || e3.getAttribute("lang"))
                return (t3 = t3.toLowerCase()) === n3 || 0 === t3.indexOf(n3 + "-");
            } while ((e3 = e3.parentNode) && 1 === e3.nodeType);
            return false;
          };
        }), target: function(e3) {
          var t3 = n2.location && n2.location.hash;
          return t3 && t3.slice(1) === e3.id;
        }, root: function(e3) {
          return e3 === a2;
        }, focus: function(e3) {
          return e3 === C2.activeElement && (!C2.hasFocus || C2.hasFocus()) && !!(e3.type || e3.href || ~e3.tabIndex);
        }, enabled: ge2(false), disabled: ge2(true), checked: function(e3) {
          var t3 = e3.nodeName.toLowerCase();
          return "input" === t3 && !!e3.checked || "option" === t3 && !!e3.selected;
        }, selected: function(e3) {
          return e3.parentNode && e3.parentNode.selectedIndex, true === e3.selected;
        }, empty: function(e3) {
          for (e3 = e3.firstChild; e3; e3 = e3.nextSibling)
            if (e3.nodeType < 6)
              return false;
          return true;
        }, parent: function(e3) {
          return !b2.pseudos.empty(e3);
        }, header: function(e3) {
          return J2.test(e3.nodeName);
        }, input: function(e3) {
          return Q2.test(e3.nodeName);
        }, button: function(e3) {
          var t3 = e3.nodeName.toLowerCase();
          return "input" === t3 && "button" === e3.type || "button" === t3;
        }, text: function(e3) {
          var t3;
          return "input" === e3.nodeName.toLowerCase() && "text" === e3.type && (null == (t3 = e3.getAttribute("type")) || "text" === t3.toLowerCase());
        }, first: ve2(function() {
          return [0];
        }), last: ve2(function(e3, t3) {
          return [t3 - 1];
        }), eq: ve2(function(e3, t3, n3) {
          return [n3 < 0 ? n3 + t3 : n3];
        }), even: ve2(function(e3, t3) {
          for (var n3 = 0; n3 < t3; n3 += 2)
            e3.push(n3);
          return e3;
        }), odd: ve2(function(e3, t3) {
          for (var n3 = 1; n3 < t3; n3 += 2)
            e3.push(n3);
          return e3;
        }), lt: ve2(function(e3, t3, n3) {
          for (var r3 = n3 < 0 ? n3 + t3 : t3 < n3 ? t3 : n3; 0 <= --r3; )
            e3.push(r3);
          return e3;
        }), gt: ve2(function(e3, t3, n3) {
          for (var r3 = n3 < 0 ? n3 + t3 : n3; ++r3 < t3; )
            e3.push(r3);
          return e3;
        }) } }).pseudos.nth = b2.pseudos.eq, { radio: true, checkbox: true, file: true, password: true, image: true })
          b2.pseudos[e2] = de2(e2);
        for (e2 in { submit: true, reset: true })
          b2.pseudos[e2] = he2(e2);
        function me2() {
        }
        function xe2(e3) {
          for (var t3 = 0, n3 = e3.length, r3 = ""; t3 < n3; t3++)
            r3 += e3[t3].value;
          return r3;
        }
        function be2(s3, e3, t3) {
          var u3 = e3.dir, l3 = e3.next, c3 = l3 || u3, f3 = t3 && "parentNode" === c3, p3 = r2++;
          return e3.first ? function(e4, t4, n3) {
            while (e4 = e4[u3])
              if (1 === e4.nodeType || f3)
                return s3(e4, t4, n3);
            return false;
          } : function(e4, t4, n3) {
            var r3, i4, o3, a3 = [k2, p3];
            if (n3) {
              while (e4 = e4[u3])
                if ((1 === e4.nodeType || f3) && s3(e4, t4, n3))
                  return true;
            } else
              while (e4 = e4[u3])
                if (1 === e4.nodeType || f3)
                  if (i4 = (o3 = e4[S2] || (e4[S2] = {}))[e4.uniqueID] || (o3[e4.uniqueID] = {}), l3 && l3 === e4.nodeName.toLowerCase())
                    e4 = e4[u3] || e4;
                  else {
                    if ((r3 = i4[c3]) && r3[0] === k2 && r3[1] === p3)
                      return a3[2] = r3[2];
                    if ((i4[c3] = a3)[2] = s3(e4, t4, n3))
                      return true;
                  }
            return false;
          };
        }
        function we2(i4) {
          return 1 < i4.length ? function(e3, t3, n3) {
            var r3 = i4.length;
            while (r3--)
              if (!i4[r3](e3, t3, n3))
                return false;
            return true;
          } : i4[0];
        }
        function Te2(e3, t3, n3, r3, i4) {
          for (var o3, a3 = [], s3 = 0, u3 = e3.length, l3 = null != t3; s3 < u3; s3++)
            (o3 = e3[s3]) && (n3 && !n3(o3, r3, i4) || (a3.push(o3), l3 && t3.push(s3)));
          return a3;
        }
        function Ce2(d3, h3, g3, v3, y3, e3) {
          return v3 && !v3[S2] && (v3 = Ce2(v3)), y3 && !y3[S2] && (y3 = Ce2(y3, e3)), le2(function(e4, t3, n3, r3) {
            var i4, o3, a3, s3 = [], u3 = [], l3 = t3.length, c3 = e4 || function(e5, t4, n4) {
              for (var r4 = 0, i5 = t4.length; r4 < i5; r4++)
                se2(e5, t4[r4], n4);
              return n4;
            }(h3 || "*", n3.nodeType ? [n3] : n3, []), f3 = !d3 || !e4 && h3 ? c3 : Te2(c3, s3, d3, n3, r3), p3 = g3 ? y3 || (e4 ? d3 : l3 || v3) ? [] : t3 : f3;
            if (g3 && g3(f3, p3, n3, r3), v3) {
              i4 = Te2(p3, u3), v3(i4, [], n3, r3), o3 = i4.length;
              while (o3--)
                (a3 = i4[o3]) && (p3[u3[o3]] = !(f3[u3[o3]] = a3));
            }
            if (e4) {
              if (y3 || d3) {
                if (y3) {
                  i4 = [], o3 = p3.length;
                  while (o3--)
                    (a3 = p3[o3]) && i4.push(f3[o3] = a3);
                  y3(null, p3 = [], i4, r3);
                }
                o3 = p3.length;
                while (o3--)
                  (a3 = p3[o3]) && -1 < (i4 = y3 ? P2(e4, a3) : s3[o3]) && (e4[i4] = !(t3[i4] = a3));
              }
            } else
              p3 = Te2(p3 === t3 ? p3.splice(l3, p3.length) : p3), y3 ? y3(null, t3, p3, r3) : H2.apply(t3, p3);
          });
        }
        function Ee2(e3) {
          for (var i4, t3, n3, r3 = e3.length, o3 = b2.relative[e3[0].type], a3 = o3 || b2.relative[" "], s3 = o3 ? 1 : 0, u3 = be2(function(e4) {
            return e4 === i4;
          }, a3, true), l3 = be2(function(e4) {
            return -1 < P2(i4, e4);
          }, a3, true), c3 = [function(e4, t4, n4) {
            var r4 = !o3 && (n4 || t4 !== w2) || ((i4 = t4).nodeType ? u3(e4, t4, n4) : l3(e4, t4, n4));
            return i4 = null, r4;
          }]; s3 < r3; s3++)
            if (t3 = b2.relative[e3[s3].type])
              c3 = [be2(we2(c3), t3)];
            else {
              if ((t3 = b2.filter[e3[s3].type].apply(null, e3[s3].matches))[S2]) {
                for (n3 = ++s3; n3 < r3; n3++)
                  if (b2.relative[e3[n3].type])
                    break;
                return Ce2(1 < s3 && we2(c3), 1 < s3 && xe2(e3.slice(0, s3 - 1).concat({ value: " " === e3[s3 - 2].type ? "*" : "" })).replace($3, "$1"), t3, s3 < n3 && Ee2(e3.slice(s3, n3)), n3 < r3 && Ee2(e3 = e3.slice(n3)), n3 < r3 && xe2(e3));
              }
              c3.push(t3);
            }
          return we2(c3);
        }
        return me2.prototype = b2.filters = b2.pseudos, b2.setFilters = new me2(), h2 = se2.tokenize = function(e3, t3) {
          var n3, r3, i4, o3, a3, s3, u3, l3 = x2[e3 + " "];
          if (l3)
            return t3 ? 0 : l3.slice(0);
          a3 = e3, s3 = [], u3 = b2.preFilter;
          while (a3) {
            for (o3 in n3 && !(r3 = _2.exec(a3)) || (r3 && (a3 = a3.slice(r3[0].length) || a3), s3.push(i4 = [])), n3 = false, (r3 = z2.exec(a3)) && (n3 = r3.shift(), i4.push({ value: n3, type: r3[0].replace($3, " ") }), a3 = a3.slice(n3.length)), b2.filter)
              !(r3 = G2[o3].exec(a3)) || u3[o3] && !(r3 = u3[o3](r3)) || (n3 = r3.shift(), i4.push({ value: n3, type: o3, matches: r3 }), a3 = a3.slice(n3.length));
            if (!n3)
              break;
          }
          return t3 ? a3.length : a3 ? se2.error(e3) : x2(e3, s3).slice(0);
        }, f2 = se2.compile = function(e3, t3) {
          var n3, v3, y3, m3, x3, r3, i4 = [], o3 = [], a3 = A2[e3 + " "];
          if (!a3) {
            t3 || (t3 = h2(e3)), n3 = t3.length;
            while (n3--)
              (a3 = Ee2(t3[n3]))[S2] ? i4.push(a3) : o3.push(a3);
            (a3 = A2(e3, (v3 = o3, m3 = 0 < (y3 = i4).length, x3 = 0 < v3.length, r3 = function(e4, t4, n4, r4, i5) {
              var o4, a4, s3, u3 = 0, l3 = "0", c3 = e4 && [], f3 = [], p3 = w2, d3 = e4 || x3 && b2.find.TAG("*", i5), h3 = k2 += null == p3 ? 1 : Math.random() || 0.1, g3 = d3.length;
              for (i5 && (w2 = t4 == C2 || t4 || i5); l3 !== g3 && null != (o4 = d3[l3]); l3++) {
                if (x3 && o4) {
                  a4 = 0, t4 || o4.ownerDocument == C2 || (T2(o4), n4 = !E2);
                  while (s3 = v3[a4++])
                    if (s3(o4, t4 || C2, n4)) {
                      r4.push(o4);
                      break;
                    }
                  i5 && (k2 = h3);
                }
                m3 && ((o4 = !s3 && o4) && u3--, e4 && c3.push(o4));
              }
              if (u3 += l3, m3 && l3 !== u3) {
                a4 = 0;
                while (s3 = y3[a4++])
                  s3(c3, f3, t4, n4);
                if (e4) {
                  if (0 < u3)
                    while (l3--)
                      c3[l3] || f3[l3] || (f3[l3] = q2.call(r4));
                  f3 = Te2(f3);
                }
                H2.apply(r4, f3), i5 && !e4 && 0 < f3.length && 1 < u3 + y3.length && se2.uniqueSort(r4);
              }
              return i5 && (k2 = h3, w2 = p3), c3;
            }, m3 ? le2(r3) : r3))).selector = e3;
          }
          return a3;
        }, g2 = se2.select = function(e3, t3, n3, r3) {
          var i4, o3, a3, s3, u3, l3 = "function" == typeof e3 && e3, c3 = !r3 && h2(e3 = l3.selector || e3);
          if (n3 = n3 || [], 1 === c3.length) {
            if (2 < (o3 = c3[0] = c3[0].slice(0)).length && "ID" === (a3 = o3[0]).type && 9 === t3.nodeType && E2 && b2.relative[o3[1].type]) {
              if (!(t3 = (b2.find.ID(a3.matches[0].replace(te2, ne2), t3) || [])[0]))
                return n3;
              l3 && (t3 = t3.parentNode), e3 = e3.slice(o3.shift().value.length);
            }
            i4 = G2.needsContext.test(e3) ? 0 : o3.length;
            while (i4--) {
              if (a3 = o3[i4], b2.relative[s3 = a3.type])
                break;
              if ((u3 = b2.find[s3]) && (r3 = u3(a3.matches[0].replace(te2, ne2), ee2.test(o3[0].type) && ye2(t3.parentNode) || t3))) {
                if (o3.splice(i4, 1), !(e3 = r3.length && xe2(o3)))
                  return H2.apply(n3, r3), n3;
                break;
              }
            }
          }
          return (l3 || f2(e3, c3))(r3, t3, !E2, n3, !t3 || ee2.test(e3) && ye2(t3.parentNode) || t3), n3;
        }, d2.sortStable = S2.split("").sort(D2).join("") === S2, d2.detectDuplicates = !!l2, T2(), d2.sortDetached = ce2(function(e3) {
          return 1 & e3.compareDocumentPosition(C2.createElement("fieldset"));
        }), ce2(function(e3) {
          return e3.innerHTML = "<a href='#'></a>", "#" === e3.firstChild.getAttribute("href");
        }) || fe2("type|href|height|width", function(e3, t3, n3) {
          if (!n3)
            return e3.getAttribute(t3, "type" === t3.toLowerCase() ? 1 : 2);
        }), d2.attributes && ce2(function(e3) {
          return e3.innerHTML = "<input/>", e3.firstChild.setAttribute("value", ""), "" === e3.firstChild.getAttribute("value");
        }) || fe2("value", function(e3, t3, n3) {
          if (!n3 && "input" === e3.nodeName.toLowerCase())
            return e3.defaultValue;
        }), ce2(function(e3) {
          return null == e3.getAttribute("disabled");
        }) || fe2(R2, function(e3, t3, n3) {
          var r3;
          if (!n3)
            return true === e3[t3] ? t3.toLowerCase() : (r3 = e3.getAttributeNode(t3)) && r3.specified ? r3.value : null;
        }), se2;
      }(C);
      S.find = d, S.expr = d.selectors, S.expr[":"] = S.expr.pseudos, S.uniqueSort = S.unique = d.uniqueSort, S.text = d.getText, S.isXMLDoc = d.isXML, S.contains = d.contains, S.escapeSelector = d.escape;
      var h = function(e2, t2, n2) {
        var r2 = [], i3 = void 0 !== n2;
        while ((e2 = e2[t2]) && 9 !== e2.nodeType)
          if (1 === e2.nodeType) {
            if (i3 && S(e2).is(n2))
              break;
            r2.push(e2);
          }
        return r2;
      }, T = function(e2, t2) {
        for (var n2 = []; e2; e2 = e2.nextSibling)
          1 === e2.nodeType && e2 !== t2 && n2.push(e2);
        return n2;
      }, k = S.expr.match.needsContext;
      function A(e2, t2) {
        return e2.nodeName && e2.nodeName.toLowerCase() === t2.toLowerCase();
      }
      var N = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
      function D(e2, n2, r2) {
        return m(n2) ? S.grep(e2, function(e3, t2) {
          return !!n2.call(e3, t2, e3) !== r2;
        }) : n2.nodeType ? S.grep(e2, function(e3) {
          return e3 === n2 !== r2;
        }) : "string" != typeof n2 ? S.grep(e2, function(e3) {
          return -1 < i2.call(n2, e3) !== r2;
        }) : S.filter(n2, e2, r2);
      }
      S.filter = function(e2, t2, n2) {
        var r2 = t2[0];
        return n2 && (e2 = ":not(" + e2 + ")"), 1 === t2.length && 1 === r2.nodeType ? S.find.matchesSelector(r2, e2) ? [r2] : [] : S.find.matches(e2, S.grep(t2, function(e3) {
          return 1 === e3.nodeType;
        }));
      }, S.fn.extend({ find: function(e2) {
        var t2, n2, r2 = this.length, i3 = this;
        if ("string" != typeof e2)
          return this.pushStack(S(e2).filter(function() {
            for (t2 = 0; t2 < r2; t2++)
              if (S.contains(i3[t2], this))
                return true;
          }));
        for (n2 = this.pushStack([]), t2 = 0; t2 < r2; t2++)
          S.find(e2, i3[t2], n2);
        return 1 < r2 ? S.uniqueSort(n2) : n2;
      }, filter: function(e2) {
        return this.pushStack(D(this, e2 || [], false));
      }, not: function(e2) {
        return this.pushStack(D(this, e2 || [], true));
      }, is: function(e2) {
        return !!D(this, "string" == typeof e2 && k.test(e2) ? S(e2) : e2 || [], false).length;
      } });
      var j, q = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
      (S.fn.init = function(e2, t2, n2) {
        var r2, i3;
        if (!e2)
          return this;
        if (n2 = n2 || j, "string" == typeof e2) {
          if (!(r2 = "<" === e2[0] && ">" === e2[e2.length - 1] && 3 <= e2.length ? [null, e2, null] : q.exec(e2)) || !r2[1] && t2)
            return !t2 || t2.jquery ? (t2 || n2).find(e2) : this.constructor(t2).find(e2);
          if (r2[1]) {
            if (t2 = t2 instanceof S ? t2[0] : t2, S.merge(this, S.parseHTML(r2[1], t2 && t2.nodeType ? t2.ownerDocument || t2 : E, true)), N.test(r2[1]) && S.isPlainObject(t2))
              for (r2 in t2)
                m(this[r2]) ? this[r2](t2[r2]) : this.attr(r2, t2[r2]);
            return this;
          }
          return (i3 = E.getElementById(r2[2])) && (this[0] = i3, this.length = 1), this;
        }
        return e2.nodeType ? (this[0] = e2, this.length = 1, this) : m(e2) ? void 0 !== n2.ready ? n2.ready(e2) : e2(S) : S.makeArray(e2, this);
      }).prototype = S.fn, j = S(E);
      var L = /^(?:parents|prev(?:Until|All))/, H = { children: true, contents: true, next: true, prev: true };
      function O(e2, t2) {
        while ((e2 = e2[t2]) && 1 !== e2.nodeType)
          ;
        return e2;
      }
      S.fn.extend({ has: function(e2) {
        var t2 = S(e2, this), n2 = t2.length;
        return this.filter(function() {
          for (var e3 = 0; e3 < n2; e3++)
            if (S.contains(this, t2[e3]))
              return true;
        });
      }, closest: function(e2, t2) {
        var n2, r2 = 0, i3 = this.length, o2 = [], a2 = "string" != typeof e2 && S(e2);
        if (!k.test(e2)) {
          for (; r2 < i3; r2++)
            for (n2 = this[r2]; n2 && n2 !== t2; n2 = n2.parentNode)
              if (n2.nodeType < 11 && (a2 ? -1 < a2.index(n2) : 1 === n2.nodeType && S.find.matchesSelector(n2, e2))) {
                o2.push(n2);
                break;
              }
        }
        return this.pushStack(1 < o2.length ? S.uniqueSort(o2) : o2);
      }, index: function(e2) {
        return e2 ? "string" == typeof e2 ? i2.call(S(e2), this[0]) : i2.call(this, e2.jquery ? e2[0] : e2) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
      }, add: function(e2, t2) {
        return this.pushStack(S.uniqueSort(S.merge(this.get(), S(e2, t2))));
      }, addBack: function(e2) {
        return this.add(null == e2 ? this.prevObject : this.prevObject.filter(e2));
      } }), S.each({ parent: function(e2) {
        var t2 = e2.parentNode;
        return t2 && 11 !== t2.nodeType ? t2 : null;
      }, parents: function(e2) {
        return h(e2, "parentNode");
      }, parentsUntil: function(e2, t2, n2) {
        return h(e2, "parentNode", n2);
      }, next: function(e2) {
        return O(e2, "nextSibling");
      }, prev: function(e2) {
        return O(e2, "previousSibling");
      }, nextAll: function(e2) {
        return h(e2, "nextSibling");
      }, prevAll: function(e2) {
        return h(e2, "previousSibling");
      }, nextUntil: function(e2, t2, n2) {
        return h(e2, "nextSibling", n2);
      }, prevUntil: function(e2, t2, n2) {
        return h(e2, "previousSibling", n2);
      }, siblings: function(e2) {
        return T((e2.parentNode || {}).firstChild, e2);
      }, children: function(e2) {
        return T(e2.firstChild);
      }, contents: function(e2) {
        return null != e2.contentDocument && r(e2.contentDocument) ? e2.contentDocument : (A(e2, "template") && (e2 = e2.content || e2), S.merge([], e2.childNodes));
      } }, function(r2, i3) {
        S.fn[r2] = function(e2, t2) {
          var n2 = S.map(this, i3, e2);
          return "Until" !== r2.slice(-5) && (t2 = e2), t2 && "string" == typeof t2 && (n2 = S.filter(t2, n2)), 1 < this.length && (H[r2] || S.uniqueSort(n2), L.test(r2) && n2.reverse()), this.pushStack(n2);
        };
      });
      var P = /[^\x20\t\r\n\f]+/g;
      function R(e2) {
        return e2;
      }
      function M(e2) {
        throw e2;
      }
      function I(e2, t2, n2, r2) {
        var i3;
        try {
          e2 && m(i3 = e2.promise) ? i3.call(e2).done(t2).fail(n2) : e2 && m(i3 = e2.then) ? i3.call(e2, t2, n2) : t2.apply(void 0, [e2].slice(r2));
        } catch (e3) {
          n2.apply(void 0, [e3]);
        }
      }
      S.Callbacks = function(r2) {
        var e2, n2;
        r2 = "string" == typeof r2 ? (e2 = r2, n2 = {}, S.each(e2.match(P) || [], function(e3, t3) {
          n2[t3] = true;
        }), n2) : S.extend({}, r2);
        var i3, t2, o2, a2, s2 = [], u2 = [], l2 = -1, c2 = function() {
          for (a2 = a2 || r2.once, o2 = i3 = true; u2.length; l2 = -1) {
            t2 = u2.shift();
            while (++l2 < s2.length)
              false === s2[l2].apply(t2[0], t2[1]) && r2.stopOnFalse && (l2 = s2.length, t2 = false);
          }
          r2.memory || (t2 = false), i3 = false, a2 && (s2 = t2 ? [] : "");
        }, f2 = { add: function() {
          return s2 && (t2 && !i3 && (l2 = s2.length - 1, u2.push(t2)), function n3(e3) {
            S.each(e3, function(e4, t3) {
              m(t3) ? r2.unique && f2.has(t3) || s2.push(t3) : t3 && t3.length && "string" !== w(t3) && n3(t3);
            });
          }(arguments), t2 && !i3 && c2()), this;
        }, remove: function() {
          return S.each(arguments, function(e3, t3) {
            var n3;
            while (-1 < (n3 = S.inArray(t3, s2, n3)))
              s2.splice(n3, 1), n3 <= l2 && l2--;
          }), this;
        }, has: function(e3) {
          return e3 ? -1 < S.inArray(e3, s2) : 0 < s2.length;
        }, empty: function() {
          return s2 && (s2 = []), this;
        }, disable: function() {
          return a2 = u2 = [], s2 = t2 = "", this;
        }, disabled: function() {
          return !s2;
        }, lock: function() {
          return a2 = u2 = [], t2 || i3 || (s2 = t2 = ""), this;
        }, locked: function() {
          return !!a2;
        }, fireWith: function(e3, t3) {
          return a2 || (t3 = [e3, (t3 = t3 || []).slice ? t3.slice() : t3], u2.push(t3), i3 || c2()), this;
        }, fire: function() {
          return f2.fireWith(this, arguments), this;
        }, fired: function() {
          return !!o2;
        } };
        return f2;
      }, S.extend({ Deferred: function(e2) {
        var o2 = [["notify", "progress", S.Callbacks("memory"), S.Callbacks("memory"), 2], ["resolve", "done", S.Callbacks("once memory"), S.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", S.Callbacks("once memory"), S.Callbacks("once memory"), 1, "rejected"]], i3 = "pending", a2 = { state: function() {
          return i3;
        }, always: function() {
          return s2.done(arguments).fail(arguments), this;
        }, "catch": function(e3) {
          return a2.then(null, e3);
        }, pipe: function() {
          var i4 = arguments;
          return S.Deferred(function(r2) {
            S.each(o2, function(e3, t2) {
              var n2 = m(i4[t2[4]]) && i4[t2[4]];
              s2[t2[1]](function() {
                var e4 = n2 && n2.apply(this, arguments);
                e4 && m(e4.promise) ? e4.promise().progress(r2.notify).done(r2.resolve).fail(r2.reject) : r2[t2[0] + "With"](this, n2 ? [e4] : arguments);
              });
            }), i4 = null;
          }).promise();
        }, then: function(t2, n2, r2) {
          var u2 = 0;
          function l2(i4, o3, a3, s3) {
            return function() {
              var n3 = this, r3 = arguments, e3 = function() {
                var e4, t4;
                if (!(i4 < u2)) {
                  if ((e4 = a3.apply(n3, r3)) === o3.promise())
                    throw new TypeError("Thenable self-resolution");
                  t4 = e4 && ("object" == typeof e4 || "function" == typeof e4) && e4.then, m(t4) ? s3 ? t4.call(e4, l2(u2, o3, R, s3), l2(u2, o3, M, s3)) : (u2++, t4.call(e4, l2(u2, o3, R, s3), l2(u2, o3, M, s3), l2(u2, o3, R, o3.notifyWith))) : (a3 !== R && (n3 = void 0, r3 = [e4]), (s3 || o3.resolveWith)(n3, r3));
                }
              }, t3 = s3 ? e3 : function() {
                try {
                  e3();
                } catch (e4) {
                  S.Deferred.exceptionHook && S.Deferred.exceptionHook(e4, t3.stackTrace), u2 <= i4 + 1 && (a3 !== M && (n3 = void 0, r3 = [e4]), o3.rejectWith(n3, r3));
                }
              };
              i4 ? t3() : (S.Deferred.getStackHook && (t3.stackTrace = S.Deferred.getStackHook()), C.setTimeout(t3));
            };
          }
          return S.Deferred(function(e3) {
            o2[0][3].add(l2(0, e3, m(r2) ? r2 : R, e3.notifyWith)), o2[1][3].add(l2(0, e3, m(t2) ? t2 : R)), o2[2][3].add(l2(0, e3, m(n2) ? n2 : M));
          }).promise();
        }, promise: function(e3) {
          return null != e3 ? S.extend(e3, a2) : a2;
        } }, s2 = {};
        return S.each(o2, function(e3, t2) {
          var n2 = t2[2], r2 = t2[5];
          a2[t2[1]] = n2.add, r2 && n2.add(function() {
            i3 = r2;
          }, o2[3 - e3][2].disable, o2[3 - e3][3].disable, o2[0][2].lock, o2[0][3].lock), n2.add(t2[3].fire), s2[t2[0]] = function() {
            return s2[t2[0] + "With"](this === s2 ? void 0 : this, arguments), this;
          }, s2[t2[0] + "With"] = n2.fireWith;
        }), a2.promise(s2), e2 && e2.call(s2, s2), s2;
      }, when: function(e2) {
        var n2 = arguments.length, t2 = n2, r2 = Array(t2), i3 = s.call(arguments), o2 = S.Deferred(), a2 = function(t3) {
          return function(e3) {
            r2[t3] = this, i3[t3] = 1 < arguments.length ? s.call(arguments) : e3, --n2 || o2.resolveWith(r2, i3);
          };
        };
        if (n2 <= 1 && (I(e2, o2.done(a2(t2)).resolve, o2.reject, !n2), "pending" === o2.state() || m(i3[t2] && i3[t2].then)))
          return o2.then();
        while (t2--)
          I(i3[t2], a2(t2), o2.reject);
        return o2.promise();
      } });
      var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
      S.Deferred.exceptionHook = function(e2, t2) {
        C.console && C.console.warn && e2 && W.test(e2.name) && C.console.warn("jQuery.Deferred exception: " + e2.message, e2.stack, t2);
      }, S.readyException = function(e2) {
        C.setTimeout(function() {
          throw e2;
        });
      };
      var F = S.Deferred();
      function B() {
        E.removeEventListener("DOMContentLoaded", B), C.removeEventListener("load", B), S.ready();
      }
      S.fn.ready = function(e2) {
        return F.then(e2)["catch"](function(e3) {
          S.readyException(e3);
        }), this;
      }, S.extend({ isReady: false, readyWait: 1, ready: function(e2) {
        (true === e2 ? --S.readyWait : S.isReady) || (S.isReady = true) !== e2 && 0 < --S.readyWait || F.resolveWith(E, [S]);
      } }), S.ready.then = F.then, "complete" === E.readyState || "loading" !== E.readyState && !E.documentElement.doScroll ? C.setTimeout(S.ready) : (E.addEventListener("DOMContentLoaded", B), C.addEventListener("load", B));
      var $2 = function(e2, t2, n2, r2, i3, o2, a2) {
        var s2 = 0, u2 = e2.length, l2 = null == n2;
        if ("object" === w(n2))
          for (s2 in i3 = true, n2)
            $2(e2, t2, s2, n2[s2], true, o2, a2);
        else if (void 0 !== r2 && (i3 = true, m(r2) || (a2 = true), l2 && (a2 ? (t2.call(e2, r2), t2 = null) : (l2 = t2, t2 = function(e3, t3, n3) {
          return l2.call(S(e3), n3);
        })), t2))
          for (; s2 < u2; s2++)
            t2(e2[s2], n2, a2 ? r2 : r2.call(e2[s2], s2, t2(e2[s2], n2)));
        return i3 ? e2 : l2 ? t2.call(e2) : u2 ? t2(e2[0], n2) : o2;
      }, _ = /^-ms-/, z = /-([a-z])/g;
      function U(e2, t2) {
        return t2.toUpperCase();
      }
      function X(e2) {
        return e2.replace(_, "ms-").replace(z, U);
      }
      var V = function(e2) {
        return 1 === e2.nodeType || 9 === e2.nodeType || !+e2.nodeType;
      };
      function G() {
        this.expando = S.expando + G.uid++;
      }
      G.uid = 1, G.prototype = { cache: function(e2) {
        var t2 = e2[this.expando];
        return t2 || (t2 = /* @__PURE__ */ Object.create(null), V(e2) && (e2.nodeType ? e2[this.expando] = t2 : Object.defineProperty(e2, this.expando, { value: t2, configurable: true }))), t2;
      }, set: function(e2, t2, n2) {
        var r2, i3 = this.cache(e2);
        if ("string" == typeof t2)
          i3[X(t2)] = n2;
        else
          for (r2 in t2)
            i3[X(r2)] = t2[r2];
        return i3;
      }, get: function(e2, t2) {
        return void 0 === t2 ? this.cache(e2) : e2[this.expando] && e2[this.expando][X(t2)];
      }, access: function(e2, t2, n2) {
        return void 0 === t2 || t2 && "string" == typeof t2 && void 0 === n2 ? this.get(e2, t2) : (this.set(e2, t2, n2), void 0 !== n2 ? n2 : t2);
      }, remove: function(e2, t2) {
        var n2, r2 = e2[this.expando];
        if (void 0 !== r2) {
          if (void 0 !== t2) {
            n2 = (t2 = Array.isArray(t2) ? t2.map(X) : (t2 = X(t2)) in r2 ? [t2] : t2.match(P) || []).length;
            while (n2--)
              delete r2[t2[n2]];
          }
          (void 0 === t2 || S.isEmptyObject(r2)) && (e2.nodeType ? e2[this.expando] = void 0 : delete e2[this.expando]);
        }
      }, hasData: function(e2) {
        var t2 = e2[this.expando];
        return void 0 !== t2 && !S.isEmptyObject(t2);
      } };
      var Y = new G(), Q = new G(), J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, K = /[A-Z]/g;
      function Z(e2, t2, n2) {
        var r2, i3;
        if (void 0 === n2 && 1 === e2.nodeType)
          if (r2 = "data-" + t2.replace(K, "-$&").toLowerCase(), "string" == typeof (n2 = e2.getAttribute(r2))) {
            try {
              n2 = "true" === (i3 = n2) || "false" !== i3 && ("null" === i3 ? null : i3 === +i3 + "" ? +i3 : J.test(i3) ? JSON.parse(i3) : i3);
            } catch (e3) {
            }
            Q.set(e2, t2, n2);
          } else
            n2 = void 0;
        return n2;
      }
      S.extend({ hasData: function(e2) {
        return Q.hasData(e2) || Y.hasData(e2);
      }, data: function(e2, t2, n2) {
        return Q.access(e2, t2, n2);
      }, removeData: function(e2, t2) {
        Q.remove(e2, t2);
      }, _data: function(e2, t2, n2) {
        return Y.access(e2, t2, n2);
      }, _removeData: function(e2, t2) {
        Y.remove(e2, t2);
      } }), S.fn.extend({ data: function(n2, e2) {
        var t2, r2, i3, o2 = this[0], a2 = o2 && o2.attributes;
        if (void 0 === n2) {
          if (this.length && (i3 = Q.get(o2), 1 === o2.nodeType && !Y.get(o2, "hasDataAttrs"))) {
            t2 = a2.length;
            while (t2--)
              a2[t2] && 0 === (r2 = a2[t2].name).indexOf("data-") && (r2 = X(r2.slice(5)), Z(o2, r2, i3[r2]));
            Y.set(o2, "hasDataAttrs", true);
          }
          return i3;
        }
        return "object" == typeof n2 ? this.each(function() {
          Q.set(this, n2);
        }) : $2(this, function(e3) {
          var t3;
          if (o2 && void 0 === e3)
            return void 0 !== (t3 = Q.get(o2, n2)) ? t3 : void 0 !== (t3 = Z(o2, n2)) ? t3 : void 0;
          this.each(function() {
            Q.set(this, n2, e3);
          });
        }, null, e2, 1 < arguments.length, null, true);
      }, removeData: function(e2) {
        return this.each(function() {
          Q.remove(this, e2);
        });
      } }), S.extend({ queue: function(e2, t2, n2) {
        var r2;
        if (e2)
          return t2 = (t2 || "fx") + "queue", r2 = Y.get(e2, t2), n2 && (!r2 || Array.isArray(n2) ? r2 = Y.access(e2, t2, S.makeArray(n2)) : r2.push(n2)), r2 || [];
      }, dequeue: function(e2, t2) {
        t2 = t2 || "fx";
        var n2 = S.queue(e2, t2), r2 = n2.length, i3 = n2.shift(), o2 = S._queueHooks(e2, t2);
        "inprogress" === i3 && (i3 = n2.shift(), r2--), i3 && ("fx" === t2 && n2.unshift("inprogress"), delete o2.stop, i3.call(e2, function() {
          S.dequeue(e2, t2);
        }, o2)), !r2 && o2 && o2.empty.fire();
      }, _queueHooks: function(e2, t2) {
        var n2 = t2 + "queueHooks";
        return Y.get(e2, n2) || Y.access(e2, n2, { empty: S.Callbacks("once memory").add(function() {
          Y.remove(e2, [t2 + "queue", n2]);
        }) });
      } }), S.fn.extend({ queue: function(t2, n2) {
        var e2 = 2;
        return "string" != typeof t2 && (n2 = t2, t2 = "fx", e2--), arguments.length < e2 ? S.queue(this[0], t2) : void 0 === n2 ? this : this.each(function() {
          var e3 = S.queue(this, t2, n2);
          S._queueHooks(this, t2), "fx" === t2 && "inprogress" !== e3[0] && S.dequeue(this, t2);
        });
      }, dequeue: function(e2) {
        return this.each(function() {
          S.dequeue(this, e2);
        });
      }, clearQueue: function(e2) {
        return this.queue(e2 || "fx", []);
      }, promise: function(e2, t2) {
        var n2, r2 = 1, i3 = S.Deferred(), o2 = this, a2 = this.length, s2 = function() {
          --r2 || i3.resolveWith(o2, [o2]);
        };
        "string" != typeof e2 && (t2 = e2, e2 = void 0), e2 = e2 || "fx";
        while (a2--)
          (n2 = Y.get(o2[a2], e2 + "queueHooks")) && n2.empty && (r2++, n2.empty.add(s2));
        return s2(), i3.promise(t2);
      } });
      var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"), ne = ["Top", "Right", "Bottom", "Left"], re2 = E.documentElement, ie = function(e2) {
        return S.contains(e2.ownerDocument, e2);
      }, oe = { composed: true };
      re2.getRootNode && (ie = function(e2) {
        return S.contains(e2.ownerDocument, e2) || e2.getRootNode(oe) === e2.ownerDocument;
      });
      var ae = function(e2, t2) {
        return "none" === (e2 = t2 || e2).style.display || "" === e2.style.display && ie(e2) && "none" === S.css(e2, "display");
      };
      function se(e2, t2, n2, r2) {
        var i3, o2, a2 = 20, s2 = r2 ? function() {
          return r2.cur();
        } : function() {
          return S.css(e2, t2, "");
        }, u2 = s2(), l2 = n2 && n2[3] || (S.cssNumber[t2] ? "" : "px"), c2 = e2.nodeType && (S.cssNumber[t2] || "px" !== l2 && +u2) && te.exec(S.css(e2, t2));
        if (c2 && c2[3] !== l2) {
          u2 /= 2, l2 = l2 || c2[3], c2 = +u2 || 1;
          while (a2--)
            S.style(e2, t2, c2 + l2), (1 - o2) * (1 - (o2 = s2() / u2 || 0.5)) <= 0 && (a2 = 0), c2 /= o2;
          c2 *= 2, S.style(e2, t2, c2 + l2), n2 = n2 || [];
        }
        return n2 && (c2 = +c2 || +u2 || 0, i3 = n2[1] ? c2 + (n2[1] + 1) * n2[2] : +n2[2], r2 && (r2.unit = l2, r2.start = c2, r2.end = i3)), i3;
      }
      var ue = {};
      function le(e2, t2) {
        for (var n2, r2, i3, o2, a2, s2, u2, l2 = [], c2 = 0, f2 = e2.length; c2 < f2; c2++)
          (r2 = e2[c2]).style && (n2 = r2.style.display, t2 ? ("none" === n2 && (l2[c2] = Y.get(r2, "display") || null, l2[c2] || (r2.style.display = "")), "" === r2.style.display && ae(r2) && (l2[c2] = (u2 = a2 = o2 = void 0, a2 = (i3 = r2).ownerDocument, s2 = i3.nodeName, (u2 = ue[s2]) || (o2 = a2.body.appendChild(a2.createElement(s2)), u2 = S.css(o2, "display"), o2.parentNode.removeChild(o2), "none" === u2 && (u2 = "block"), ue[s2] = u2)))) : "none" !== n2 && (l2[c2] = "none", Y.set(r2, "display", n2)));
        for (c2 = 0; c2 < f2; c2++)
          null != l2[c2] && (e2[c2].style.display = l2[c2]);
        return e2;
      }
      S.fn.extend({ show: function() {
        return le(this, true);
      }, hide: function() {
        return le(this);
      }, toggle: function(e2) {
        return "boolean" == typeof e2 ? e2 ? this.show() : this.hide() : this.each(function() {
          ae(this) ? S(this).show() : S(this).hide();
        });
      } });
      var ce, fe, pe = /^(?:checkbox|radio)$/i, de = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i, he = /^$|^module$|\/(?:java|ecma)script/i;
      ce = E.createDocumentFragment().appendChild(E.createElement("div")), (fe = E.createElement("input")).setAttribute("type", "radio"), fe.setAttribute("checked", "checked"), fe.setAttribute("name", "t"), ce.appendChild(fe), y.checkClone = ce.cloneNode(true).cloneNode(true).lastChild.checked, ce.innerHTML = "<textarea>x</textarea>", y.noCloneChecked = !!ce.cloneNode(true).lastChild.defaultValue, ce.innerHTML = "<option></option>", y.option = !!ce.lastChild;
      var ge = { thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };
      function ve(e2, t2) {
        var n2;
        return n2 = "undefined" != typeof e2.getElementsByTagName ? e2.getElementsByTagName(t2 || "*") : "undefined" != typeof e2.querySelectorAll ? e2.querySelectorAll(t2 || "*") : [], void 0 === t2 || t2 && A(e2, t2) ? S.merge([e2], n2) : n2;
      }
      function ye(e2, t2) {
        for (var n2 = 0, r2 = e2.length; n2 < r2; n2++)
          Y.set(e2[n2], "globalEval", !t2 || Y.get(t2[n2], "globalEval"));
      }
      ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead, ge.th = ge.td, y.option || (ge.optgroup = ge.option = [1, "<select multiple='multiple'>", "</select>"]);
      var me = /<|&#?\w+;/;
      function xe(e2, t2, n2, r2, i3) {
        for (var o2, a2, s2, u2, l2, c2, f2 = t2.createDocumentFragment(), p2 = [], d2 = 0, h2 = e2.length; d2 < h2; d2++)
          if ((o2 = e2[d2]) || 0 === o2)
            if ("object" === w(o2))
              S.merge(p2, o2.nodeType ? [o2] : o2);
            else if (me.test(o2)) {
              a2 = a2 || f2.appendChild(t2.createElement("div")), s2 = (de.exec(o2) || ["", ""])[1].toLowerCase(), u2 = ge[s2] || ge._default, a2.innerHTML = u2[1] + S.htmlPrefilter(o2) + u2[2], c2 = u2[0];
              while (c2--)
                a2 = a2.lastChild;
              S.merge(p2, a2.childNodes), (a2 = f2.firstChild).textContent = "";
            } else
              p2.push(t2.createTextNode(o2));
        f2.textContent = "", d2 = 0;
        while (o2 = p2[d2++])
          if (r2 && -1 < S.inArray(o2, r2))
            i3 && i3.push(o2);
          else if (l2 = ie(o2), a2 = ve(f2.appendChild(o2), "script"), l2 && ye(a2), n2) {
            c2 = 0;
            while (o2 = a2[c2++])
              he.test(o2.type || "") && n2.push(o2);
          }
        return f2;
      }
      var be = /^key/, we = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, Te = /^([^.]*)(?:\.(.+)|)/;
      function Ce() {
        return true;
      }
      function Ee() {
        return false;
      }
      function Se(e2, t2) {
        return e2 === function() {
          try {
            return E.activeElement;
          } catch (e3) {
          }
        }() == ("focus" === t2);
      }
      function ke(e2, t2, n2, r2, i3, o2) {
        var a2, s2;
        if ("object" == typeof t2) {
          for (s2 in "string" != typeof n2 && (r2 = r2 || n2, n2 = void 0), t2)
            ke(e2, s2, n2, r2, t2[s2], o2);
          return e2;
        }
        if (null == r2 && null == i3 ? (i3 = n2, r2 = n2 = void 0) : null == i3 && ("string" == typeof n2 ? (i3 = r2, r2 = void 0) : (i3 = r2, r2 = n2, n2 = void 0)), false === i3)
          i3 = Ee;
        else if (!i3)
          return e2;
        return 1 === o2 && (a2 = i3, (i3 = function(e3) {
          return S().off(e3), a2.apply(this, arguments);
        }).guid = a2.guid || (a2.guid = S.guid++)), e2.each(function() {
          S.event.add(this, t2, i3, r2, n2);
        });
      }
      function Ae(e2, i3, o2) {
        o2 ? (Y.set(e2, i3, false), S.event.add(e2, i3, { namespace: false, handler: function(e3) {
          var t2, n2, r2 = Y.get(this, i3);
          if (1 & e3.isTrigger && this[i3]) {
            if (r2.length)
              (S.event.special[i3] || {}).delegateType && e3.stopPropagation();
            else if (r2 = s.call(arguments), Y.set(this, i3, r2), t2 = o2(this, i3), this[i3](), r2 !== (n2 = Y.get(this, i3)) || t2 ? Y.set(this, i3, false) : n2 = {}, r2 !== n2)
              return e3.stopImmediatePropagation(), e3.preventDefault(), n2.value;
          } else
            r2.length && (Y.set(this, i3, { value: S.event.trigger(S.extend(r2[0], S.Event.prototype), r2.slice(1), this) }), e3.stopImmediatePropagation());
        } })) : void 0 === Y.get(e2, i3) && S.event.add(e2, i3, Ce);
      }
      S.event = { global: {}, add: function(t2, e2, n2, r2, i3) {
        var o2, a2, s2, u2, l2, c2, f2, p2, d2, h2, g2, v2 = Y.get(t2);
        if (V(t2)) {
          n2.handler && (n2 = (o2 = n2).handler, i3 = o2.selector), i3 && S.find.matchesSelector(re2, i3), n2.guid || (n2.guid = S.guid++), (u2 = v2.events) || (u2 = v2.events = /* @__PURE__ */ Object.create(null)), (a2 = v2.handle) || (a2 = v2.handle = function(e3) {
            return "undefined" != typeof S && S.event.triggered !== e3.type ? S.event.dispatch.apply(t2, arguments) : void 0;
          }), l2 = (e2 = (e2 || "").match(P) || [""]).length;
          while (l2--)
            d2 = g2 = (s2 = Te.exec(e2[l2]) || [])[1], h2 = (s2[2] || "").split(".").sort(), d2 && (f2 = S.event.special[d2] || {}, d2 = (i3 ? f2.delegateType : f2.bindType) || d2, f2 = S.event.special[d2] || {}, c2 = S.extend({ type: d2, origType: g2, data: r2, handler: n2, guid: n2.guid, selector: i3, needsContext: i3 && S.expr.match.needsContext.test(i3), namespace: h2.join(".") }, o2), (p2 = u2[d2]) || ((p2 = u2[d2] = []).delegateCount = 0, f2.setup && false !== f2.setup.call(t2, r2, h2, a2) || t2.addEventListener && t2.addEventListener(d2, a2)), f2.add && (f2.add.call(t2, c2), c2.handler.guid || (c2.handler.guid = n2.guid)), i3 ? p2.splice(p2.delegateCount++, 0, c2) : p2.push(c2), S.event.global[d2] = true);
        }
      }, remove: function(e2, t2, n2, r2, i3) {
        var o2, a2, s2, u2, l2, c2, f2, p2, d2, h2, g2, v2 = Y.hasData(e2) && Y.get(e2);
        if (v2 && (u2 = v2.events)) {
          l2 = (t2 = (t2 || "").match(P) || [""]).length;
          while (l2--)
            if (d2 = g2 = (s2 = Te.exec(t2[l2]) || [])[1], h2 = (s2[2] || "").split(".").sort(), d2) {
              f2 = S.event.special[d2] || {}, p2 = u2[d2 = (r2 ? f2.delegateType : f2.bindType) || d2] || [], s2 = s2[2] && new RegExp("(^|\\.)" + h2.join("\\.(?:.*\\.|)") + "(\\.|$)"), a2 = o2 = p2.length;
              while (o2--)
                c2 = p2[o2], !i3 && g2 !== c2.origType || n2 && n2.guid !== c2.guid || s2 && !s2.test(c2.namespace) || r2 && r2 !== c2.selector && ("**" !== r2 || !c2.selector) || (p2.splice(o2, 1), c2.selector && p2.delegateCount--, f2.remove && f2.remove.call(e2, c2));
              a2 && !p2.length && (f2.teardown && false !== f2.teardown.call(e2, h2, v2.handle) || S.removeEvent(e2, d2, v2.handle), delete u2[d2]);
            } else
              for (d2 in u2)
                S.event.remove(e2, d2 + t2[l2], n2, r2, true);
          S.isEmptyObject(u2) && Y.remove(e2, "handle events");
        }
      }, dispatch: function(e2) {
        var t2, n2, r2, i3, o2, a2, s2 = new Array(arguments.length), u2 = S.event.fix(e2), l2 = (Y.get(this, "events") || /* @__PURE__ */ Object.create(null))[u2.type] || [], c2 = S.event.special[u2.type] || {};
        for (s2[0] = u2, t2 = 1; t2 < arguments.length; t2++)
          s2[t2] = arguments[t2];
        if (u2.delegateTarget = this, !c2.preDispatch || false !== c2.preDispatch.call(this, u2)) {
          a2 = S.event.handlers.call(this, u2, l2), t2 = 0;
          while ((i3 = a2[t2++]) && !u2.isPropagationStopped()) {
            u2.currentTarget = i3.elem, n2 = 0;
            while ((o2 = i3.handlers[n2++]) && !u2.isImmediatePropagationStopped())
              u2.rnamespace && false !== o2.namespace && !u2.rnamespace.test(o2.namespace) || (u2.handleObj = o2, u2.data = o2.data, void 0 !== (r2 = ((S.event.special[o2.origType] || {}).handle || o2.handler).apply(i3.elem, s2)) && false === (u2.result = r2) && (u2.preventDefault(), u2.stopPropagation()));
          }
          return c2.postDispatch && c2.postDispatch.call(this, u2), u2.result;
        }
      }, handlers: function(e2, t2) {
        var n2, r2, i3, o2, a2, s2 = [], u2 = t2.delegateCount, l2 = e2.target;
        if (u2 && l2.nodeType && !("click" === e2.type && 1 <= e2.button)) {
          for (; l2 !== this; l2 = l2.parentNode || this)
            if (1 === l2.nodeType && ("click" !== e2.type || true !== l2.disabled)) {
              for (o2 = [], a2 = {}, n2 = 0; n2 < u2; n2++)
                void 0 === a2[i3 = (r2 = t2[n2]).selector + " "] && (a2[i3] = r2.needsContext ? -1 < S(i3, this).index(l2) : S.find(i3, this, null, [l2]).length), a2[i3] && o2.push(r2);
              o2.length && s2.push({ elem: l2, handlers: o2 });
            }
        }
        return l2 = this, u2 < t2.length && s2.push({ elem: l2, handlers: t2.slice(u2) }), s2;
      }, addProp: function(t2, e2) {
        Object.defineProperty(S.Event.prototype, t2, { enumerable: true, configurable: true, get: m(e2) ? function() {
          if (this.originalEvent)
            return e2(this.originalEvent);
        } : function() {
          if (this.originalEvent)
            return this.originalEvent[t2];
        }, set: function(e3) {
          Object.defineProperty(this, t2, { enumerable: true, configurable: true, writable: true, value: e3 });
        } });
      }, fix: function(e2) {
        return e2[S.expando] ? e2 : new S.Event(e2);
      }, special: { load: { noBubble: true }, click: { setup: function(e2) {
        var t2 = this || e2;
        return pe.test(t2.type) && t2.click && A(t2, "input") && Ae(t2, "click", Ce), false;
      }, trigger: function(e2) {
        var t2 = this || e2;
        return pe.test(t2.type) && t2.click && A(t2, "input") && Ae(t2, "click"), true;
      }, _default: function(e2) {
        var t2 = e2.target;
        return pe.test(t2.type) && t2.click && A(t2, "input") && Y.get(t2, "click") || A(t2, "a");
      } }, beforeunload: { postDispatch: function(e2) {
        void 0 !== e2.result && e2.originalEvent && (e2.originalEvent.returnValue = e2.result);
      } } } }, S.removeEvent = function(e2, t2, n2) {
        e2.removeEventListener && e2.removeEventListener(t2, n2);
      }, S.Event = function(e2, t2) {
        if (!(this instanceof S.Event))
          return new S.Event(e2, t2);
        e2 && e2.type ? (this.originalEvent = e2, this.type = e2.type, this.isDefaultPrevented = e2.defaultPrevented || void 0 === e2.defaultPrevented && false === e2.returnValue ? Ce : Ee, this.target = e2.target && 3 === e2.target.nodeType ? e2.target.parentNode : e2.target, this.currentTarget = e2.currentTarget, this.relatedTarget = e2.relatedTarget) : this.type = e2, t2 && S.extend(this, t2), this.timeStamp = e2 && e2.timeStamp || Date.now(), this[S.expando] = true;
      }, S.Event.prototype = { constructor: S.Event, isDefaultPrevented: Ee, isPropagationStopped: Ee, isImmediatePropagationStopped: Ee, isSimulated: false, preventDefault: function() {
        var e2 = this.originalEvent;
        this.isDefaultPrevented = Ce, e2 && !this.isSimulated && e2.preventDefault();
      }, stopPropagation: function() {
        var e2 = this.originalEvent;
        this.isPropagationStopped = Ce, e2 && !this.isSimulated && e2.stopPropagation();
      }, stopImmediatePropagation: function() {
        var e2 = this.originalEvent;
        this.isImmediatePropagationStopped = Ce, e2 && !this.isSimulated && e2.stopImmediatePropagation(), this.stopPropagation();
      } }, S.each({ altKey: true, bubbles: true, cancelable: true, changedTouches: true, ctrlKey: true, detail: true, eventPhase: true, metaKey: true, pageX: true, pageY: true, shiftKey: true, view: true, "char": true, code: true, charCode: true, key: true, keyCode: true, button: true, buttons: true, clientX: true, clientY: true, offsetX: true, offsetY: true, pointerId: true, pointerType: true, screenX: true, screenY: true, targetTouches: true, toElement: true, touches: true, which: function(e2) {
        var t2 = e2.button;
        return null == e2.which && be.test(e2.type) ? null != e2.charCode ? e2.charCode : e2.keyCode : !e2.which && void 0 !== t2 && we.test(e2.type) ? 1 & t2 ? 1 : 2 & t2 ? 3 : 4 & t2 ? 2 : 0 : e2.which;
      } }, S.event.addProp), S.each({ focus: "focusin", blur: "focusout" }, function(e2, t2) {
        S.event.special[e2] = { setup: function() {
          return Ae(this, e2, Se), false;
        }, trigger: function() {
          return Ae(this, e2), true;
        }, delegateType: t2 };
      }), S.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function(e2, i3) {
        S.event.special[e2] = { delegateType: i3, bindType: i3, handle: function(e3) {
          var t2, n2 = e3.relatedTarget, r2 = e3.handleObj;
          return n2 && (n2 === this || S.contains(this, n2)) || (e3.type = r2.origType, t2 = r2.handler.apply(this, arguments), e3.type = i3), t2;
        } };
      }), S.fn.extend({ on: function(e2, t2, n2, r2) {
        return ke(this, e2, t2, n2, r2);
      }, one: function(e2, t2, n2, r2) {
        return ke(this, e2, t2, n2, r2, 1);
      }, off: function(e2, t2, n2) {
        var r2, i3;
        if (e2 && e2.preventDefault && e2.handleObj)
          return r2 = e2.handleObj, S(e2.delegateTarget).off(r2.namespace ? r2.origType + "." + r2.namespace : r2.origType, r2.selector, r2.handler), this;
        if ("object" == typeof e2) {
          for (i3 in e2)
            this.off(i3, t2, e2[i3]);
          return this;
        }
        return false !== t2 && "function" != typeof t2 || (n2 = t2, t2 = void 0), false === n2 && (n2 = Ee), this.each(function() {
          S.event.remove(this, e2, n2, t2);
        });
      } });
      var Ne = /<script|<style|<link/i, De = /checked\s*(?:[^=]|=\s*.checked.)/i, je = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
      function qe(e2, t2) {
        return A(e2, "table") && A(11 !== t2.nodeType ? t2 : t2.firstChild, "tr") && S(e2).children("tbody")[0] || e2;
      }
      function Le(e2) {
        return e2.type = (null !== e2.getAttribute("type")) + "/" + e2.type, e2;
      }
      function He(e2) {
        return "true/" === (e2.type || "").slice(0, 5) ? e2.type = e2.type.slice(5) : e2.removeAttribute("type"), e2;
      }
      function Oe(e2, t2) {
        var n2, r2, i3, o2, a2, s2;
        if (1 === t2.nodeType) {
          if (Y.hasData(e2) && (s2 = Y.get(e2).events))
            for (i3 in Y.remove(t2, "handle events"), s2)
              for (n2 = 0, r2 = s2[i3].length; n2 < r2; n2++)
                S.event.add(t2, i3, s2[i3][n2]);
          Q.hasData(e2) && (o2 = Q.access(e2), a2 = S.extend({}, o2), Q.set(t2, a2));
        }
      }
      function Pe(n2, r2, i3, o2) {
        r2 = g(r2);
        var e2, t2, a2, s2, u2, l2, c2 = 0, f2 = n2.length, p2 = f2 - 1, d2 = r2[0], h2 = m(d2);
        if (h2 || 1 < f2 && "string" == typeof d2 && !y.checkClone && De.test(d2))
          return n2.each(function(e3) {
            var t3 = n2.eq(e3);
            h2 && (r2[0] = d2.call(this, e3, t3.html())), Pe(t3, r2, i3, o2);
          });
        if (f2 && (t2 = (e2 = xe(r2, n2[0].ownerDocument, false, n2, o2)).firstChild, 1 === e2.childNodes.length && (e2 = t2), t2 || o2)) {
          for (s2 = (a2 = S.map(ve(e2, "script"), Le)).length; c2 < f2; c2++)
            u2 = e2, c2 !== p2 && (u2 = S.clone(u2, true, true), s2 && S.merge(a2, ve(u2, "script"))), i3.call(n2[c2], u2, c2);
          if (s2)
            for (l2 = a2[a2.length - 1].ownerDocument, S.map(a2, He), c2 = 0; c2 < s2; c2++)
              u2 = a2[c2], he.test(u2.type || "") && !Y.access(u2, "globalEval") && S.contains(l2, u2) && (u2.src && "module" !== (u2.type || "").toLowerCase() ? S._evalUrl && !u2.noModule && S._evalUrl(u2.src, { nonce: u2.nonce || u2.getAttribute("nonce") }, l2) : b(u2.textContent.replace(je, ""), u2, l2));
        }
        return n2;
      }
      function Re(e2, t2, n2) {
        for (var r2, i3 = t2 ? S.filter(t2, e2) : e2, o2 = 0; null != (r2 = i3[o2]); o2++)
          n2 || 1 !== r2.nodeType || S.cleanData(ve(r2)), r2.parentNode && (n2 && ie(r2) && ye(ve(r2, "script")), r2.parentNode.removeChild(r2));
        return e2;
      }
      S.extend({ htmlPrefilter: function(e2) {
        return e2;
      }, clone: function(e2, t2, n2) {
        var r2, i3, o2, a2, s2, u2, l2, c2 = e2.cloneNode(true), f2 = ie(e2);
        if (!(y.noCloneChecked || 1 !== e2.nodeType && 11 !== e2.nodeType || S.isXMLDoc(e2)))
          for (a2 = ve(c2), r2 = 0, i3 = (o2 = ve(e2)).length; r2 < i3; r2++)
            s2 = o2[r2], u2 = a2[r2], void 0, "input" === (l2 = u2.nodeName.toLowerCase()) && pe.test(s2.type) ? u2.checked = s2.checked : "input" !== l2 && "textarea" !== l2 || (u2.defaultValue = s2.defaultValue);
        if (t2)
          if (n2)
            for (o2 = o2 || ve(e2), a2 = a2 || ve(c2), r2 = 0, i3 = o2.length; r2 < i3; r2++)
              Oe(o2[r2], a2[r2]);
          else
            Oe(e2, c2);
        return 0 < (a2 = ve(c2, "script")).length && ye(a2, !f2 && ve(e2, "script")), c2;
      }, cleanData: function(e2) {
        for (var t2, n2, r2, i3 = S.event.special, o2 = 0; void 0 !== (n2 = e2[o2]); o2++)
          if (V(n2)) {
            if (t2 = n2[Y.expando]) {
              if (t2.events)
                for (r2 in t2.events)
                  i3[r2] ? S.event.remove(n2, r2) : S.removeEvent(n2, r2, t2.handle);
              n2[Y.expando] = void 0;
            }
            n2[Q.expando] && (n2[Q.expando] = void 0);
          }
      } }), S.fn.extend({ detach: function(e2) {
        return Re(this, e2, true);
      }, remove: function(e2) {
        return Re(this, e2);
      }, text: function(e2) {
        return $2(this, function(e3) {
          return void 0 === e3 ? S.text(this) : this.empty().each(function() {
            1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e3);
          });
        }, null, e2, arguments.length);
      }, append: function() {
        return Pe(this, arguments, function(e2) {
          1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || qe(this, e2).appendChild(e2);
        });
      }, prepend: function() {
        return Pe(this, arguments, function(e2) {
          if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
            var t2 = qe(this, e2);
            t2.insertBefore(e2, t2.firstChild);
          }
        });
      }, before: function() {
        return Pe(this, arguments, function(e2) {
          this.parentNode && this.parentNode.insertBefore(e2, this);
        });
      }, after: function() {
        return Pe(this, arguments, function(e2) {
          this.parentNode && this.parentNode.insertBefore(e2, this.nextSibling);
        });
      }, empty: function() {
        for (var e2, t2 = 0; null != (e2 = this[t2]); t2++)
          1 === e2.nodeType && (S.cleanData(ve(e2, false)), e2.textContent = "");
        return this;
      }, clone: function(e2, t2) {
        return e2 = null != e2 && e2, t2 = null == t2 ? e2 : t2, this.map(function() {
          return S.clone(this, e2, t2);
        });
      }, html: function(e2) {
        return $2(this, function(e3) {
          var t2 = this[0] || {}, n2 = 0, r2 = this.length;
          if (void 0 === e3 && 1 === t2.nodeType)
            return t2.innerHTML;
          if ("string" == typeof e3 && !Ne.test(e3) && !ge[(de.exec(e3) || ["", ""])[1].toLowerCase()]) {
            e3 = S.htmlPrefilter(e3);
            try {
              for (; n2 < r2; n2++)
                1 === (t2 = this[n2] || {}).nodeType && (S.cleanData(ve(t2, false)), t2.innerHTML = e3);
              t2 = 0;
            } catch (e4) {
            }
          }
          t2 && this.empty().append(e3);
        }, null, e2, arguments.length);
      }, replaceWith: function() {
        var n2 = [];
        return Pe(this, arguments, function(e2) {
          var t2 = this.parentNode;
          S.inArray(this, n2) < 0 && (S.cleanData(ve(this)), t2 && t2.replaceChild(e2, this));
        }, n2);
      } }), S.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function(e2, a2) {
        S.fn[e2] = function(e3) {
          for (var t2, n2 = [], r2 = S(e3), i3 = r2.length - 1, o2 = 0; o2 <= i3; o2++)
            t2 = o2 === i3 ? this : this.clone(true), S(r2[o2])[a2](t2), u.apply(n2, t2.get());
          return this.pushStack(n2);
        };
      });
      var Me = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"), Ie = function(e2) {
        var t2 = e2.ownerDocument.defaultView;
        return t2 && t2.opener || (t2 = C), t2.getComputedStyle(e2);
      }, We = function(e2, t2, n2) {
        var r2, i3, o2 = {};
        for (i3 in t2)
          o2[i3] = e2.style[i3], e2.style[i3] = t2[i3];
        for (i3 in r2 = n2.call(e2), t2)
          e2.style[i3] = o2[i3];
        return r2;
      }, Fe = new RegExp(ne.join("|"), "i");
      function Be(e2, t2, n2) {
        var r2, i3, o2, a2, s2 = e2.style;
        return (n2 = n2 || Ie(e2)) && ("" !== (a2 = n2.getPropertyValue(t2) || n2[t2]) || ie(e2) || (a2 = S.style(e2, t2)), !y.pixelBoxStyles() && Me.test(a2) && Fe.test(t2) && (r2 = s2.width, i3 = s2.minWidth, o2 = s2.maxWidth, s2.minWidth = s2.maxWidth = s2.width = a2, a2 = n2.width, s2.width = r2, s2.minWidth = i3, s2.maxWidth = o2)), void 0 !== a2 ? a2 + "" : a2;
      }
      function $e(e2, t2) {
        return { get: function() {
          if (!e2())
            return (this.get = t2).apply(this, arguments);
          delete this.get;
        } };
      }
      !function() {
        function e2() {
          if (l2) {
            u2.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", l2.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", re2.appendChild(u2).appendChild(l2);
            var e3 = C.getComputedStyle(l2);
            n2 = "1%" !== e3.top, s2 = 12 === t2(e3.marginLeft), l2.style.right = "60%", o2 = 36 === t2(e3.right), r2 = 36 === t2(e3.width), l2.style.position = "absolute", i3 = 12 === t2(l2.offsetWidth / 3), re2.removeChild(u2), l2 = null;
          }
        }
        function t2(e3) {
          return Math.round(parseFloat(e3));
        }
        var n2, r2, i3, o2, a2, s2, u2 = E.createElement("div"), l2 = E.createElement("div");
        l2.style && (l2.style.backgroundClip = "content-box", l2.cloneNode(true).style.backgroundClip = "", y.clearCloneStyle = "content-box" === l2.style.backgroundClip, S.extend(y, { boxSizingReliable: function() {
          return e2(), r2;
        }, pixelBoxStyles: function() {
          return e2(), o2;
        }, pixelPosition: function() {
          return e2(), n2;
        }, reliableMarginLeft: function() {
          return e2(), s2;
        }, scrollboxSize: function() {
          return e2(), i3;
        }, reliableTrDimensions: function() {
          var e3, t3, n3, r3;
          return null == a2 && (e3 = E.createElement("table"), t3 = E.createElement("tr"), n3 = E.createElement("div"), e3.style.cssText = "position:absolute;left:-11111px", t3.style.height = "1px", n3.style.height = "9px", re2.appendChild(e3).appendChild(t3).appendChild(n3), r3 = C.getComputedStyle(t3), a2 = 3 < parseInt(r3.height), re2.removeChild(e3)), a2;
        } }));
      }();
      var _e = ["Webkit", "Moz", "ms"], ze = E.createElement("div").style, Ue = {};
      function Xe(e2) {
        var t2 = S.cssProps[e2] || Ue[e2];
        return t2 || (e2 in ze ? e2 : Ue[e2] = function(e3) {
          var t3 = e3[0].toUpperCase() + e3.slice(1), n2 = _e.length;
          while (n2--)
            if ((e3 = _e[n2] + t3) in ze)
              return e3;
        }(e2) || e2);
      }
      var Ve = /^(none|table(?!-c[ea]).+)/, Ge = /^--/, Ye = { position: "absolute", visibility: "hidden", display: "block" }, Qe = { letterSpacing: "0", fontWeight: "400" };
      function Je(e2, t2, n2) {
        var r2 = te.exec(t2);
        return r2 ? Math.max(0, r2[2] - (n2 || 0)) + (r2[3] || "px") : t2;
      }
      function Ke(e2, t2, n2, r2, i3, o2) {
        var a2 = "width" === t2 ? 1 : 0, s2 = 0, u2 = 0;
        if (n2 === (r2 ? "border" : "content"))
          return 0;
        for (; a2 < 4; a2 += 2)
          "margin" === n2 && (u2 += S.css(e2, n2 + ne[a2], true, i3)), r2 ? ("content" === n2 && (u2 -= S.css(e2, "padding" + ne[a2], true, i3)), "margin" !== n2 && (u2 -= S.css(e2, "border" + ne[a2] + "Width", true, i3))) : (u2 += S.css(e2, "padding" + ne[a2], true, i3), "padding" !== n2 ? u2 += S.css(e2, "border" + ne[a2] + "Width", true, i3) : s2 += S.css(e2, "border" + ne[a2] + "Width", true, i3));
        return !r2 && 0 <= o2 && (u2 += Math.max(0, Math.ceil(e2["offset" + t2[0].toUpperCase() + t2.slice(1)] - o2 - u2 - s2 - 0.5)) || 0), u2;
      }
      function Ze(e2, t2, n2) {
        var r2 = Ie(e2), i3 = (!y.boxSizingReliable() || n2) && "border-box" === S.css(e2, "boxSizing", false, r2), o2 = i3, a2 = Be(e2, t2, r2), s2 = "offset" + t2[0].toUpperCase() + t2.slice(1);
        if (Me.test(a2)) {
          if (!n2)
            return a2;
          a2 = "auto";
        }
        return (!y.boxSizingReliable() && i3 || !y.reliableTrDimensions() && A(e2, "tr") || "auto" === a2 || !parseFloat(a2) && "inline" === S.css(e2, "display", false, r2)) && e2.getClientRects().length && (i3 = "border-box" === S.css(e2, "boxSizing", false, r2), (o2 = s2 in e2) && (a2 = e2[s2])), (a2 = parseFloat(a2) || 0) + Ke(e2, t2, n2 || (i3 ? "border" : "content"), o2, r2, a2) + "px";
      }
      function et(e2, t2, n2, r2, i3) {
        return new et.prototype.init(e2, t2, n2, r2, i3);
      }
      S.extend({ cssHooks: { opacity: { get: function(e2, t2) {
        if (t2) {
          var n2 = Be(e2, "opacity");
          return "" === n2 ? "1" : n2;
        }
      } } }, cssNumber: { animationIterationCount: true, columnCount: true, fillOpacity: true, flexGrow: true, flexShrink: true, fontWeight: true, gridArea: true, gridColumn: true, gridColumnEnd: true, gridColumnStart: true, gridRow: true, gridRowEnd: true, gridRowStart: true, lineHeight: true, opacity: true, order: true, orphans: true, widows: true, zIndex: true, zoom: true }, cssProps: {}, style: function(e2, t2, n2, r2) {
        if (e2 && 3 !== e2.nodeType && 8 !== e2.nodeType && e2.style) {
          var i3, o2, a2, s2 = X(t2), u2 = Ge.test(t2), l2 = e2.style;
          if (u2 || (t2 = Xe(s2)), a2 = S.cssHooks[t2] || S.cssHooks[s2], void 0 === n2)
            return a2 && "get" in a2 && void 0 !== (i3 = a2.get(e2, false, r2)) ? i3 : l2[t2];
          "string" === (o2 = typeof n2) && (i3 = te.exec(n2)) && i3[1] && (n2 = se(e2, t2, i3), o2 = "number"), null != n2 && n2 == n2 && ("number" !== o2 || u2 || (n2 += i3 && i3[3] || (S.cssNumber[s2] ? "" : "px")), y.clearCloneStyle || "" !== n2 || 0 !== t2.indexOf("background") || (l2[t2] = "inherit"), a2 && "set" in a2 && void 0 === (n2 = a2.set(e2, n2, r2)) || (u2 ? l2.setProperty(t2, n2) : l2[t2] = n2));
        }
      }, css: function(e2, t2, n2, r2) {
        var i3, o2, a2, s2 = X(t2);
        return Ge.test(t2) || (t2 = Xe(s2)), (a2 = S.cssHooks[t2] || S.cssHooks[s2]) && "get" in a2 && (i3 = a2.get(e2, true, n2)), void 0 === i3 && (i3 = Be(e2, t2, r2)), "normal" === i3 && t2 in Qe && (i3 = Qe[t2]), "" === n2 || n2 ? (o2 = parseFloat(i3), true === n2 || isFinite(o2) ? o2 || 0 : i3) : i3;
      } }), S.each(["height", "width"], function(e2, u2) {
        S.cssHooks[u2] = { get: function(e3, t2, n2) {
          if (t2)
            return !Ve.test(S.css(e3, "display")) || e3.getClientRects().length && e3.getBoundingClientRect().width ? Ze(e3, u2, n2) : We(e3, Ye, function() {
              return Ze(e3, u2, n2);
            });
        }, set: function(e3, t2, n2) {
          var r2, i3 = Ie(e3), o2 = !y.scrollboxSize() && "absolute" === i3.position, a2 = (o2 || n2) && "border-box" === S.css(e3, "boxSizing", false, i3), s2 = n2 ? Ke(e3, u2, n2, a2, i3) : 0;
          return a2 && o2 && (s2 -= Math.ceil(e3["offset" + u2[0].toUpperCase() + u2.slice(1)] - parseFloat(i3[u2]) - Ke(e3, u2, "border", false, i3) - 0.5)), s2 && (r2 = te.exec(t2)) && "px" !== (r2[3] || "px") && (e3.style[u2] = t2, t2 = S.css(e3, u2)), Je(0, t2, s2);
        } };
      }), S.cssHooks.marginLeft = $e(y.reliableMarginLeft, function(e2, t2) {
        if (t2)
          return (parseFloat(Be(e2, "marginLeft")) || e2.getBoundingClientRect().left - We(e2, { marginLeft: 0 }, function() {
            return e2.getBoundingClientRect().left;
          })) + "px";
      }), S.each({ margin: "", padding: "", border: "Width" }, function(i3, o2) {
        S.cssHooks[i3 + o2] = { expand: function(e2) {
          for (var t2 = 0, n2 = {}, r2 = "string" == typeof e2 ? e2.split(" ") : [e2]; t2 < 4; t2++)
            n2[i3 + ne[t2] + o2] = r2[t2] || r2[t2 - 2] || r2[0];
          return n2;
        } }, "margin" !== i3 && (S.cssHooks[i3 + o2].set = Je);
      }), S.fn.extend({ css: function(e2, t2) {
        return $2(this, function(e3, t3, n2) {
          var r2, i3, o2 = {}, a2 = 0;
          if (Array.isArray(t3)) {
            for (r2 = Ie(e3), i3 = t3.length; a2 < i3; a2++)
              o2[t3[a2]] = S.css(e3, t3[a2], false, r2);
            return o2;
          }
          return void 0 !== n2 ? S.style(e3, t3, n2) : S.css(e3, t3);
        }, e2, t2, 1 < arguments.length);
      } }), ((S.Tween = et).prototype = { constructor: et, init: function(e2, t2, n2, r2, i3, o2) {
        this.elem = e2, this.prop = n2, this.easing = i3 || S.easing._default, this.options = t2, this.start = this.now = this.cur(), this.end = r2, this.unit = o2 || (S.cssNumber[n2] ? "" : "px");
      }, cur: function() {
        var e2 = et.propHooks[this.prop];
        return e2 && e2.get ? e2.get(this) : et.propHooks._default.get(this);
      }, run: function(e2) {
        var t2, n2 = et.propHooks[this.prop];
        return this.options.duration ? this.pos = t2 = S.easing[this.easing](e2, this.options.duration * e2, 0, 1, this.options.duration) : this.pos = t2 = e2, this.now = (this.end - this.start) * t2 + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n2 && n2.set ? n2.set(this) : et.propHooks._default.set(this), this;
      } }).init.prototype = et.prototype, (et.propHooks = { _default: { get: function(e2) {
        var t2;
        return 1 !== e2.elem.nodeType || null != e2.elem[e2.prop] && null == e2.elem.style[e2.prop] ? e2.elem[e2.prop] : (t2 = S.css(e2.elem, e2.prop, "")) && "auto" !== t2 ? t2 : 0;
      }, set: function(e2) {
        S.fx.step[e2.prop] ? S.fx.step[e2.prop](e2) : 1 !== e2.elem.nodeType || !S.cssHooks[e2.prop] && null == e2.elem.style[Xe(e2.prop)] ? e2.elem[e2.prop] = e2.now : S.style(e2.elem, e2.prop, e2.now + e2.unit);
      } } }).scrollTop = et.propHooks.scrollLeft = { set: function(e2) {
        e2.elem.nodeType && e2.elem.parentNode && (e2.elem[e2.prop] = e2.now);
      } }, S.easing = { linear: function(e2) {
        return e2;
      }, swing: function(e2) {
        return 0.5 - Math.cos(e2 * Math.PI) / 2;
      }, _default: "swing" }, S.fx = et.prototype.init, S.fx.step = {};
      var tt, nt, rt, it, ot = /^(?:toggle|show|hide)$/, at = /queueHooks$/;
      function st() {
        nt && (false === E.hidden && C.requestAnimationFrame ? C.requestAnimationFrame(st) : C.setTimeout(st, S.fx.interval), S.fx.tick());
      }
      function ut() {
        return C.setTimeout(function() {
          tt = void 0;
        }), tt = Date.now();
      }
      function lt(e2, t2) {
        var n2, r2 = 0, i3 = { height: e2 };
        for (t2 = t2 ? 1 : 0; r2 < 4; r2 += 2 - t2)
          i3["margin" + (n2 = ne[r2])] = i3["padding" + n2] = e2;
        return t2 && (i3.opacity = i3.width = e2), i3;
      }
      function ct(e2, t2, n2) {
        for (var r2, i3 = (ft.tweeners[t2] || []).concat(ft.tweeners["*"]), o2 = 0, a2 = i3.length; o2 < a2; o2++)
          if (r2 = i3[o2].call(n2, t2, e2))
            return r2;
      }
      function ft(o2, e2, t2) {
        var n2, a2, r2 = 0, i3 = ft.prefilters.length, s2 = S.Deferred().always(function() {
          delete u2.elem;
        }), u2 = function() {
          if (a2)
            return false;
          for (var e3 = tt || ut(), t3 = Math.max(0, l2.startTime + l2.duration - e3), n3 = 1 - (t3 / l2.duration || 0), r3 = 0, i4 = l2.tweens.length; r3 < i4; r3++)
            l2.tweens[r3].run(n3);
          return s2.notifyWith(o2, [l2, n3, t3]), n3 < 1 && i4 ? t3 : (i4 || s2.notifyWith(o2, [l2, 1, 0]), s2.resolveWith(o2, [l2]), false);
        }, l2 = s2.promise({ elem: o2, props: S.extend({}, e2), opts: S.extend(true, { specialEasing: {}, easing: S.easing._default }, t2), originalProperties: e2, originalOptions: t2, startTime: tt || ut(), duration: t2.duration, tweens: [], createTween: function(e3, t3) {
          var n3 = S.Tween(o2, l2.opts, e3, t3, l2.opts.specialEasing[e3] || l2.opts.easing);
          return l2.tweens.push(n3), n3;
        }, stop: function(e3) {
          var t3 = 0, n3 = e3 ? l2.tweens.length : 0;
          if (a2)
            return this;
          for (a2 = true; t3 < n3; t3++)
            l2.tweens[t3].run(1);
          return e3 ? (s2.notifyWith(o2, [l2, 1, 0]), s2.resolveWith(o2, [l2, e3])) : s2.rejectWith(o2, [l2, e3]), this;
        } }), c2 = l2.props;
        for (!function(e3, t3) {
          var n3, r3, i4, o3, a3;
          for (n3 in e3)
            if (i4 = t3[r3 = X(n3)], o3 = e3[n3], Array.isArray(o3) && (i4 = o3[1], o3 = e3[n3] = o3[0]), n3 !== r3 && (e3[r3] = o3, delete e3[n3]), (a3 = S.cssHooks[r3]) && "expand" in a3)
              for (n3 in o3 = a3.expand(o3), delete e3[r3], o3)
                n3 in e3 || (e3[n3] = o3[n3], t3[n3] = i4);
            else
              t3[r3] = i4;
        }(c2, l2.opts.specialEasing); r2 < i3; r2++)
          if (n2 = ft.prefilters[r2].call(l2, o2, c2, l2.opts))
            return m(n2.stop) && (S._queueHooks(l2.elem, l2.opts.queue).stop = n2.stop.bind(n2)), n2;
        return S.map(c2, ct, l2), m(l2.opts.start) && l2.opts.start.call(o2, l2), l2.progress(l2.opts.progress).done(l2.opts.done, l2.opts.complete).fail(l2.opts.fail).always(l2.opts.always), S.fx.timer(S.extend(u2, { elem: o2, anim: l2, queue: l2.opts.queue })), l2;
      }
      S.Animation = S.extend(ft, { tweeners: { "*": [function(e2, t2) {
        var n2 = this.createTween(e2, t2);
        return se(n2.elem, e2, te.exec(t2), n2), n2;
      }] }, tweener: function(e2, t2) {
        m(e2) ? (t2 = e2, e2 = ["*"]) : e2 = e2.match(P);
        for (var n2, r2 = 0, i3 = e2.length; r2 < i3; r2++)
          n2 = e2[r2], ft.tweeners[n2] = ft.tweeners[n2] || [], ft.tweeners[n2].unshift(t2);
      }, prefilters: [function(e2, t2, n2) {
        var r2, i3, o2, a2, s2, u2, l2, c2, f2 = "width" in t2 || "height" in t2, p2 = this, d2 = {}, h2 = e2.style, g2 = e2.nodeType && ae(e2), v2 = Y.get(e2, "fxshow");
        for (r2 in n2.queue || (null == (a2 = S._queueHooks(e2, "fx")).unqueued && (a2.unqueued = 0, s2 = a2.empty.fire, a2.empty.fire = function() {
          a2.unqueued || s2();
        }), a2.unqueued++, p2.always(function() {
          p2.always(function() {
            a2.unqueued--, S.queue(e2, "fx").length || a2.empty.fire();
          });
        })), t2)
          if (i3 = t2[r2], ot.test(i3)) {
            if (delete t2[r2], o2 = o2 || "toggle" === i3, i3 === (g2 ? "hide" : "show")) {
              if ("show" !== i3 || !v2 || void 0 === v2[r2])
                continue;
              g2 = true;
            }
            d2[r2] = v2 && v2[r2] || S.style(e2, r2);
          }
        if ((u2 = !S.isEmptyObject(t2)) || !S.isEmptyObject(d2))
          for (r2 in f2 && 1 === e2.nodeType && (n2.overflow = [h2.overflow, h2.overflowX, h2.overflowY], null == (l2 = v2 && v2.display) && (l2 = Y.get(e2, "display")), "none" === (c2 = S.css(e2, "display")) && (l2 ? c2 = l2 : (le([e2], true), l2 = e2.style.display || l2, c2 = S.css(e2, "display"), le([e2]))), ("inline" === c2 || "inline-block" === c2 && null != l2) && "none" === S.css(e2, "float") && (u2 || (p2.done(function() {
            h2.display = l2;
          }), null == l2 && (c2 = h2.display, l2 = "none" === c2 ? "" : c2)), h2.display = "inline-block")), n2.overflow && (h2.overflow = "hidden", p2.always(function() {
            h2.overflow = n2.overflow[0], h2.overflowX = n2.overflow[1], h2.overflowY = n2.overflow[2];
          })), u2 = false, d2)
            u2 || (v2 ? "hidden" in v2 && (g2 = v2.hidden) : v2 = Y.access(e2, "fxshow", { display: l2 }), o2 && (v2.hidden = !g2), g2 && le([e2], true), p2.done(function() {
              for (r2 in g2 || le([e2]), Y.remove(e2, "fxshow"), d2)
                S.style(e2, r2, d2[r2]);
            })), u2 = ct(g2 ? v2[r2] : 0, r2, p2), r2 in v2 || (v2[r2] = u2.start, g2 && (u2.end = u2.start, u2.start = 0));
      }], prefilter: function(e2, t2) {
        t2 ? ft.prefilters.unshift(e2) : ft.prefilters.push(e2);
      } }), S.speed = function(e2, t2, n2) {
        var r2 = e2 && "object" == typeof e2 ? S.extend({}, e2) : { complete: n2 || !n2 && t2 || m(e2) && e2, duration: e2, easing: n2 && t2 || t2 && !m(t2) && t2 };
        return S.fx.off ? r2.duration = 0 : "number" != typeof r2.duration && (r2.duration in S.fx.speeds ? r2.duration = S.fx.speeds[r2.duration] : r2.duration = S.fx.speeds._default), null != r2.queue && true !== r2.queue || (r2.queue = "fx"), r2.old = r2.complete, r2.complete = function() {
          m(r2.old) && r2.old.call(this), r2.queue && S.dequeue(this, r2.queue);
        }, r2;
      }, S.fn.extend({ fadeTo: function(e2, t2, n2, r2) {
        return this.filter(ae).css("opacity", 0).show().end().animate({ opacity: t2 }, e2, n2, r2);
      }, animate: function(t2, e2, n2, r2) {
        var i3 = S.isEmptyObject(t2), o2 = S.speed(e2, n2, r2), a2 = function() {
          var e3 = ft(this, S.extend({}, t2), o2);
          (i3 || Y.get(this, "finish")) && e3.stop(true);
        };
        return a2.finish = a2, i3 || false === o2.queue ? this.each(a2) : this.queue(o2.queue, a2);
      }, stop: function(i3, e2, o2) {
        var a2 = function(e3) {
          var t2 = e3.stop;
          delete e3.stop, t2(o2);
        };
        return "string" != typeof i3 && (o2 = e2, e2 = i3, i3 = void 0), e2 && this.queue(i3 || "fx", []), this.each(function() {
          var e3 = true, t2 = null != i3 && i3 + "queueHooks", n2 = S.timers, r2 = Y.get(this);
          if (t2)
            r2[t2] && r2[t2].stop && a2(r2[t2]);
          else
            for (t2 in r2)
              r2[t2] && r2[t2].stop && at.test(t2) && a2(r2[t2]);
          for (t2 = n2.length; t2--; )
            n2[t2].elem !== this || null != i3 && n2[t2].queue !== i3 || (n2[t2].anim.stop(o2), e3 = false, n2.splice(t2, 1));
          !e3 && o2 || S.dequeue(this, i3);
        });
      }, finish: function(a2) {
        return false !== a2 && (a2 = a2 || "fx"), this.each(function() {
          var e2, t2 = Y.get(this), n2 = t2[a2 + "queue"], r2 = t2[a2 + "queueHooks"], i3 = S.timers, o2 = n2 ? n2.length : 0;
          for (t2.finish = true, S.queue(this, a2, []), r2 && r2.stop && r2.stop.call(this, true), e2 = i3.length; e2--; )
            i3[e2].elem === this && i3[e2].queue === a2 && (i3[e2].anim.stop(true), i3.splice(e2, 1));
          for (e2 = 0; e2 < o2; e2++)
            n2[e2] && n2[e2].finish && n2[e2].finish.call(this);
          delete t2.finish;
        });
      } }), S.each(["toggle", "show", "hide"], function(e2, r2) {
        var i3 = S.fn[r2];
        S.fn[r2] = function(e3, t2, n2) {
          return null == e3 || "boolean" == typeof e3 ? i3.apply(this, arguments) : this.animate(lt(r2, true), e3, t2, n2);
        };
      }), S.each({ slideDown: lt("show"), slideUp: lt("hide"), slideToggle: lt("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function(e2, r2) {
        S.fn[e2] = function(e3, t2, n2) {
          return this.animate(r2, e3, t2, n2);
        };
      }), S.timers = [], S.fx.tick = function() {
        var e2, t2 = 0, n2 = S.timers;
        for (tt = Date.now(); t2 < n2.length; t2++)
          (e2 = n2[t2])() || n2[t2] !== e2 || n2.splice(t2--, 1);
        n2.length || S.fx.stop(), tt = void 0;
      }, S.fx.timer = function(e2) {
        S.timers.push(e2), S.fx.start();
      }, S.fx.interval = 13, S.fx.start = function() {
        nt || (nt = true, st());
      }, S.fx.stop = function() {
        nt = null;
      }, S.fx.speeds = { slow: 600, fast: 200, _default: 400 }, S.fn.delay = function(r2, e2) {
        return r2 = S.fx && S.fx.speeds[r2] || r2, e2 = e2 || "fx", this.queue(e2, function(e3, t2) {
          var n2 = C.setTimeout(e3, r2);
          t2.stop = function() {
            C.clearTimeout(n2);
          };
        });
      }, rt = E.createElement("input"), it = E.createElement("select").appendChild(E.createElement("option")), rt.type = "checkbox", y.checkOn = "" !== rt.value, y.optSelected = it.selected, (rt = E.createElement("input")).value = "t", rt.type = "radio", y.radioValue = "t" === rt.value;
      var pt, dt = S.expr.attrHandle;
      S.fn.extend({ attr: function(e2, t2) {
        return $2(this, S.attr, e2, t2, 1 < arguments.length);
      }, removeAttr: function(e2) {
        return this.each(function() {
          S.removeAttr(this, e2);
        });
      } }), S.extend({ attr: function(e2, t2, n2) {
        var r2, i3, o2 = e2.nodeType;
        if (3 !== o2 && 8 !== o2 && 2 !== o2)
          return "undefined" == typeof e2.getAttribute ? S.prop(e2, t2, n2) : (1 === o2 && S.isXMLDoc(e2) || (i3 = S.attrHooks[t2.toLowerCase()] || (S.expr.match.bool.test(t2) ? pt : void 0)), void 0 !== n2 ? null === n2 ? void S.removeAttr(e2, t2) : i3 && "set" in i3 && void 0 !== (r2 = i3.set(e2, n2, t2)) ? r2 : (e2.setAttribute(t2, n2 + ""), n2) : i3 && "get" in i3 && null !== (r2 = i3.get(e2, t2)) ? r2 : null == (r2 = S.find.attr(e2, t2)) ? void 0 : r2);
      }, attrHooks: { type: { set: function(e2, t2) {
        if (!y.radioValue && "radio" === t2 && A(e2, "input")) {
          var n2 = e2.value;
          return e2.setAttribute("type", t2), n2 && (e2.value = n2), t2;
        }
      } } }, removeAttr: function(e2, t2) {
        var n2, r2 = 0, i3 = t2 && t2.match(P);
        if (i3 && 1 === e2.nodeType)
          while (n2 = i3[r2++])
            e2.removeAttribute(n2);
      } }), pt = { set: function(e2, t2, n2) {
        return false === t2 ? S.removeAttr(e2, n2) : e2.setAttribute(n2, n2), n2;
      } }, S.each(S.expr.match.bool.source.match(/\w+/g), function(e2, t2) {
        var a2 = dt[t2] || S.find.attr;
        dt[t2] = function(e3, t3, n2) {
          var r2, i3, o2 = t3.toLowerCase();
          return n2 || (i3 = dt[o2], dt[o2] = r2, r2 = null != a2(e3, t3, n2) ? o2 : null, dt[o2] = i3), r2;
        };
      });
      var ht = /^(?:input|select|textarea|button)$/i, gt = /^(?:a|area)$/i;
      function vt(e2) {
        return (e2.match(P) || []).join(" ");
      }
      function yt(e2) {
        return e2.getAttribute && e2.getAttribute("class") || "";
      }
      function mt(e2) {
        return Array.isArray(e2) ? e2 : "string" == typeof e2 && e2.match(P) || [];
      }
      S.fn.extend({ prop: function(e2, t2) {
        return $2(this, S.prop, e2, t2, 1 < arguments.length);
      }, removeProp: function(e2) {
        return this.each(function() {
          delete this[S.propFix[e2] || e2];
        });
      } }), S.extend({ prop: function(e2, t2, n2) {
        var r2, i3, o2 = e2.nodeType;
        if (3 !== o2 && 8 !== o2 && 2 !== o2)
          return 1 === o2 && S.isXMLDoc(e2) || (t2 = S.propFix[t2] || t2, i3 = S.propHooks[t2]), void 0 !== n2 ? i3 && "set" in i3 && void 0 !== (r2 = i3.set(e2, n2, t2)) ? r2 : e2[t2] = n2 : i3 && "get" in i3 && null !== (r2 = i3.get(e2, t2)) ? r2 : e2[t2];
      }, propHooks: { tabIndex: { get: function(e2) {
        var t2 = S.find.attr(e2, "tabindex");
        return t2 ? parseInt(t2, 10) : ht.test(e2.nodeName) || gt.test(e2.nodeName) && e2.href ? 0 : -1;
      } } }, propFix: { "for": "htmlFor", "class": "className" } }), y.optSelected || (S.propHooks.selected = { get: function(e2) {
        var t2 = e2.parentNode;
        return t2 && t2.parentNode && t2.parentNode.selectedIndex, null;
      }, set: function(e2) {
        var t2 = e2.parentNode;
        t2 && (t2.selectedIndex, t2.parentNode && t2.parentNode.selectedIndex);
      } }), S.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        S.propFix[this.toLowerCase()] = this;
      }), S.fn.extend({ addClass: function(t2) {
        var e2, n2, r2, i3, o2, a2, s2, u2 = 0;
        if (m(t2))
          return this.each(function(e3) {
            S(this).addClass(t2.call(this, e3, yt(this)));
          });
        if ((e2 = mt(t2)).length) {
          while (n2 = this[u2++])
            if (i3 = yt(n2), r2 = 1 === n2.nodeType && " " + vt(i3) + " ") {
              a2 = 0;
              while (o2 = e2[a2++])
                r2.indexOf(" " + o2 + " ") < 0 && (r2 += o2 + " ");
              i3 !== (s2 = vt(r2)) && n2.setAttribute("class", s2);
            }
        }
        return this;
      }, removeClass: function(t2) {
        var e2, n2, r2, i3, o2, a2, s2, u2 = 0;
        if (m(t2))
          return this.each(function(e3) {
            S(this).removeClass(t2.call(this, e3, yt(this)));
          });
        if (!arguments.length)
          return this.attr("class", "");
        if ((e2 = mt(t2)).length) {
          while (n2 = this[u2++])
            if (i3 = yt(n2), r2 = 1 === n2.nodeType && " " + vt(i3) + " ") {
              a2 = 0;
              while (o2 = e2[a2++])
                while (-1 < r2.indexOf(" " + o2 + " "))
                  r2 = r2.replace(" " + o2 + " ", " ");
              i3 !== (s2 = vt(r2)) && n2.setAttribute("class", s2);
            }
        }
        return this;
      }, toggleClass: function(i3, t2) {
        var o2 = typeof i3, a2 = "string" === o2 || Array.isArray(i3);
        return "boolean" == typeof t2 && a2 ? t2 ? this.addClass(i3) : this.removeClass(i3) : m(i3) ? this.each(function(e2) {
          S(this).toggleClass(i3.call(this, e2, yt(this), t2), t2);
        }) : this.each(function() {
          var e2, t3, n2, r2;
          if (a2) {
            t3 = 0, n2 = S(this), r2 = mt(i3);
            while (e2 = r2[t3++])
              n2.hasClass(e2) ? n2.removeClass(e2) : n2.addClass(e2);
          } else
            void 0 !== i3 && "boolean" !== o2 || ((e2 = yt(this)) && Y.set(this, "__className__", e2), this.setAttribute && this.setAttribute("class", e2 || false === i3 ? "" : Y.get(this, "__className__") || ""));
        });
      }, hasClass: function(e2) {
        var t2, n2, r2 = 0;
        t2 = " " + e2 + " ";
        while (n2 = this[r2++])
          if (1 === n2.nodeType && -1 < (" " + vt(yt(n2)) + " ").indexOf(t2))
            return true;
        return false;
      } });
      var xt = /\r/g;
      S.fn.extend({ val: function(n2) {
        var r2, e2, i3, t2 = this[0];
        return arguments.length ? (i3 = m(n2), this.each(function(e3) {
          var t3;
          1 === this.nodeType && (null == (t3 = i3 ? n2.call(this, e3, S(this).val()) : n2) ? t3 = "" : "number" == typeof t3 ? t3 += "" : Array.isArray(t3) && (t3 = S.map(t3, function(e4) {
            return null == e4 ? "" : e4 + "";
          })), (r2 = S.valHooks[this.type] || S.valHooks[this.nodeName.toLowerCase()]) && "set" in r2 && void 0 !== r2.set(this, t3, "value") || (this.value = t3));
        })) : t2 ? (r2 = S.valHooks[t2.type] || S.valHooks[t2.nodeName.toLowerCase()]) && "get" in r2 && void 0 !== (e2 = r2.get(t2, "value")) ? e2 : "string" == typeof (e2 = t2.value) ? e2.replace(xt, "") : null == e2 ? "" : e2 : void 0;
      } }), S.extend({ valHooks: { option: { get: function(e2) {
        var t2 = S.find.attr(e2, "value");
        return null != t2 ? t2 : vt(S.text(e2));
      } }, select: { get: function(e2) {
        var t2, n2, r2, i3 = e2.options, o2 = e2.selectedIndex, a2 = "select-one" === e2.type, s2 = a2 ? null : [], u2 = a2 ? o2 + 1 : i3.length;
        for (r2 = o2 < 0 ? u2 : a2 ? o2 : 0; r2 < u2; r2++)
          if (((n2 = i3[r2]).selected || r2 === o2) && !n2.disabled && (!n2.parentNode.disabled || !A(n2.parentNode, "optgroup"))) {
            if (t2 = S(n2).val(), a2)
              return t2;
            s2.push(t2);
          }
        return s2;
      }, set: function(e2, t2) {
        var n2, r2, i3 = e2.options, o2 = S.makeArray(t2), a2 = i3.length;
        while (a2--)
          ((r2 = i3[a2]).selected = -1 < S.inArray(S.valHooks.option.get(r2), o2)) && (n2 = true);
        return n2 || (e2.selectedIndex = -1), o2;
      } } } }), S.each(["radio", "checkbox"], function() {
        S.valHooks[this] = { set: function(e2, t2) {
          if (Array.isArray(t2))
            return e2.checked = -1 < S.inArray(S(e2).val(), t2);
        } }, y.checkOn || (S.valHooks[this].get = function(e2) {
          return null === e2.getAttribute("value") ? "on" : e2.value;
        });
      }), y.focusin = "onfocusin" in C;
      var bt = /^(?:focusinfocus|focusoutblur)$/, wt = function(e2) {
        e2.stopPropagation();
      };
      S.extend(S.event, { trigger: function(e2, t2, n2, r2) {
        var i3, o2, a2, s2, u2, l2, c2, f2, p2 = [n2 || E], d2 = v.call(e2, "type") ? e2.type : e2, h2 = v.call(e2, "namespace") ? e2.namespace.split(".") : [];
        if (o2 = f2 = a2 = n2 = n2 || E, 3 !== n2.nodeType && 8 !== n2.nodeType && !bt.test(d2 + S.event.triggered) && (-1 < d2.indexOf(".") && (d2 = (h2 = d2.split(".")).shift(), h2.sort()), u2 = d2.indexOf(":") < 0 && "on" + d2, (e2 = e2[S.expando] ? e2 : new S.Event(d2, "object" == typeof e2 && e2)).isTrigger = r2 ? 2 : 3, e2.namespace = h2.join("."), e2.rnamespace = e2.namespace ? new RegExp("(^|\\.)" + h2.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e2.result = void 0, e2.target || (e2.target = n2), t2 = null == t2 ? [e2] : S.makeArray(t2, [e2]), c2 = S.event.special[d2] || {}, r2 || !c2.trigger || false !== c2.trigger.apply(n2, t2))) {
          if (!r2 && !c2.noBubble && !x(n2)) {
            for (s2 = c2.delegateType || d2, bt.test(s2 + d2) || (o2 = o2.parentNode); o2; o2 = o2.parentNode)
              p2.push(o2), a2 = o2;
            a2 === (n2.ownerDocument || E) && p2.push(a2.defaultView || a2.parentWindow || C);
          }
          i3 = 0;
          while ((o2 = p2[i3++]) && !e2.isPropagationStopped())
            f2 = o2, e2.type = 1 < i3 ? s2 : c2.bindType || d2, (l2 = (Y.get(o2, "events") || /* @__PURE__ */ Object.create(null))[e2.type] && Y.get(o2, "handle")) && l2.apply(o2, t2), (l2 = u2 && o2[u2]) && l2.apply && V(o2) && (e2.result = l2.apply(o2, t2), false === e2.result && e2.preventDefault());
          return e2.type = d2, r2 || e2.isDefaultPrevented() || c2._default && false !== c2._default.apply(p2.pop(), t2) || !V(n2) || u2 && m(n2[d2]) && !x(n2) && ((a2 = n2[u2]) && (n2[u2] = null), S.event.triggered = d2, e2.isPropagationStopped() && f2.addEventListener(d2, wt), n2[d2](), e2.isPropagationStopped() && f2.removeEventListener(d2, wt), S.event.triggered = void 0, a2 && (n2[u2] = a2)), e2.result;
        }
      }, simulate: function(e2, t2, n2) {
        var r2 = S.extend(new S.Event(), n2, { type: e2, isSimulated: true });
        S.event.trigger(r2, null, t2);
      } }), S.fn.extend({ trigger: function(e2, t2) {
        return this.each(function() {
          S.event.trigger(e2, t2, this);
        });
      }, triggerHandler: function(e2, t2) {
        var n2 = this[0];
        if (n2)
          return S.event.trigger(e2, t2, n2, true);
      } }), y.focusin || S.each({ focus: "focusin", blur: "focusout" }, function(n2, r2) {
        var i3 = function(e2) {
          S.event.simulate(r2, e2.target, S.event.fix(e2));
        };
        S.event.special[r2] = { setup: function() {
          var e2 = this.ownerDocument || this.document || this, t2 = Y.access(e2, r2);
          t2 || e2.addEventListener(n2, i3, true), Y.access(e2, r2, (t2 || 0) + 1);
        }, teardown: function() {
          var e2 = this.ownerDocument || this.document || this, t2 = Y.access(e2, r2) - 1;
          t2 ? Y.access(e2, r2, t2) : (e2.removeEventListener(n2, i3, true), Y.remove(e2, r2));
        } };
      });
      var Tt = C.location, Ct = { guid: Date.now() }, Et = /\?/;
      S.parseXML = function(e2) {
        var t2;
        if (!e2 || "string" != typeof e2)
          return null;
        try {
          t2 = new C.DOMParser().parseFromString(e2, "text/xml");
        } catch (e3) {
          t2 = void 0;
        }
        return t2 && !t2.getElementsByTagName("parsererror").length || S.error("Invalid XML: " + e2), t2;
      };
      var St = /\[\]$/, kt = /\r?\n/g, At = /^(?:submit|button|image|reset|file)$/i, Nt = /^(?:input|select|textarea|keygen)/i;
      function Dt(n2, e2, r2, i3) {
        var t2;
        if (Array.isArray(e2))
          S.each(e2, function(e3, t3) {
            r2 || St.test(n2) ? i3(n2, t3) : Dt(n2 + "[" + ("object" == typeof t3 && null != t3 ? e3 : "") + "]", t3, r2, i3);
          });
        else if (r2 || "object" !== w(e2))
          i3(n2, e2);
        else
          for (t2 in e2)
            Dt(n2 + "[" + t2 + "]", e2[t2], r2, i3);
      }
      S.param = function(e2, t2) {
        var n2, r2 = [], i3 = function(e3, t3) {
          var n3 = m(t3) ? t3() : t3;
          r2[r2.length] = encodeURIComponent(e3) + "=" + encodeURIComponent(null == n3 ? "" : n3);
        };
        if (null == e2)
          return "";
        if (Array.isArray(e2) || e2.jquery && !S.isPlainObject(e2))
          S.each(e2, function() {
            i3(this.name, this.value);
          });
        else
          for (n2 in e2)
            Dt(n2, e2[n2], t2, i3);
        return r2.join("&");
      }, S.fn.extend({ serialize: function() {
        return S.param(this.serializeArray());
      }, serializeArray: function() {
        return this.map(function() {
          var e2 = S.prop(this, "elements");
          return e2 ? S.makeArray(e2) : this;
        }).filter(function() {
          var e2 = this.type;
          return this.name && !S(this).is(":disabled") && Nt.test(this.nodeName) && !At.test(e2) && (this.checked || !pe.test(e2));
        }).map(function(e2, t2) {
          var n2 = S(this).val();
          return null == n2 ? null : Array.isArray(n2) ? S.map(n2, function(e3) {
            return { name: t2.name, value: e3.replace(kt, "\r\n") };
          }) : { name: t2.name, value: n2.replace(kt, "\r\n") };
        }).get();
      } });
      var jt = /%20/g, qt = /#.*$/, Lt = /([?&])_=[^&]*/, Ht = /^(.*?):[ \t]*([^\r\n]*)$/gm, Ot = /^(?:GET|HEAD)$/, Pt = /^\/\//, Rt = {}, Mt = {}, It = "*/".concat("*"), Wt = E.createElement("a");
      function Ft(o2) {
        return function(e2, t2) {
          "string" != typeof e2 && (t2 = e2, e2 = "*");
          var n2, r2 = 0, i3 = e2.toLowerCase().match(P) || [];
          if (m(t2))
            while (n2 = i3[r2++])
              "+" === n2[0] ? (n2 = n2.slice(1) || "*", (o2[n2] = o2[n2] || []).unshift(t2)) : (o2[n2] = o2[n2] || []).push(t2);
        };
      }
      function Bt(t2, i3, o2, a2) {
        var s2 = {}, u2 = t2 === Mt;
        function l2(e2) {
          var r2;
          return s2[e2] = true, S.each(t2[e2] || [], function(e3, t3) {
            var n2 = t3(i3, o2, a2);
            return "string" != typeof n2 || u2 || s2[n2] ? u2 ? !(r2 = n2) : void 0 : (i3.dataTypes.unshift(n2), l2(n2), false);
          }), r2;
        }
        return l2(i3.dataTypes[0]) || !s2["*"] && l2("*");
      }
      function $t(e2, t2) {
        var n2, r2, i3 = S.ajaxSettings.flatOptions || {};
        for (n2 in t2)
          void 0 !== t2[n2] && ((i3[n2] ? e2 : r2 || (r2 = {}))[n2] = t2[n2]);
        return r2 && S.extend(true, e2, r2), e2;
      }
      Wt.href = Tt.href, S.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: Tt.href, type: "GET", isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Tt.protocol), global: true, processData: true, async: true, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": It, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": true, "text json": JSON.parse, "text xml": S.parseXML }, flatOptions: { url: true, context: true } }, ajaxSetup: function(e2, t2) {
        return t2 ? $t($t(e2, S.ajaxSettings), t2) : $t(S.ajaxSettings, e2);
      }, ajaxPrefilter: Ft(Rt), ajaxTransport: Ft(Mt), ajax: function(e2, t2) {
        "object" == typeof e2 && (t2 = e2, e2 = void 0), t2 = t2 || {};
        var c2, f2, p2, n2, d2, r2, h2, g2, i3, o2, v2 = S.ajaxSetup({}, t2), y2 = v2.context || v2, m2 = v2.context && (y2.nodeType || y2.jquery) ? S(y2) : S.event, x2 = S.Deferred(), b2 = S.Callbacks("once memory"), w2 = v2.statusCode || {}, a2 = {}, s2 = {}, u2 = "canceled", T2 = { readyState: 0, getResponseHeader: function(e3) {
          var t3;
          if (h2) {
            if (!n2) {
              n2 = {};
              while (t3 = Ht.exec(p2))
                n2[t3[1].toLowerCase() + " "] = (n2[t3[1].toLowerCase() + " "] || []).concat(t3[2]);
            }
            t3 = n2[e3.toLowerCase() + " "];
          }
          return null == t3 ? null : t3.join(", ");
        }, getAllResponseHeaders: function() {
          return h2 ? p2 : null;
        }, setRequestHeader: function(e3, t3) {
          return null == h2 && (e3 = s2[e3.toLowerCase()] = s2[e3.toLowerCase()] || e3, a2[e3] = t3), this;
        }, overrideMimeType: function(e3) {
          return null == h2 && (v2.mimeType = e3), this;
        }, statusCode: function(e3) {
          var t3;
          if (e3)
            if (h2)
              T2.always(e3[T2.status]);
            else
              for (t3 in e3)
                w2[t3] = [w2[t3], e3[t3]];
          return this;
        }, abort: function(e3) {
          var t3 = e3 || u2;
          return c2 && c2.abort(t3), l2(0, t3), this;
        } };
        if (x2.promise(T2), v2.url = ((e2 || v2.url || Tt.href) + "").replace(Pt, Tt.protocol + "//"), v2.type = t2.method || t2.type || v2.method || v2.type, v2.dataTypes = (v2.dataType || "*").toLowerCase().match(P) || [""], null == v2.crossDomain) {
          r2 = E.createElement("a");
          try {
            r2.href = v2.url, r2.href = r2.href, v2.crossDomain = Wt.protocol + "//" + Wt.host != r2.protocol + "//" + r2.host;
          } catch (e3) {
            v2.crossDomain = true;
          }
        }
        if (v2.data && v2.processData && "string" != typeof v2.data && (v2.data = S.param(v2.data, v2.traditional)), Bt(Rt, v2, t2, T2), h2)
          return T2;
        for (i3 in (g2 = S.event && v2.global) && 0 == S.active++ && S.event.trigger("ajaxStart"), v2.type = v2.type.toUpperCase(), v2.hasContent = !Ot.test(v2.type), f2 = v2.url.replace(qt, ""), v2.hasContent ? v2.data && v2.processData && 0 === (v2.contentType || "").indexOf("application/x-www-form-urlencoded") && (v2.data = v2.data.replace(jt, "+")) : (o2 = v2.url.slice(f2.length), v2.data && (v2.processData || "string" == typeof v2.data) && (f2 += (Et.test(f2) ? "&" : "?") + v2.data, delete v2.data), false === v2.cache && (f2 = f2.replace(Lt, "$1"), o2 = (Et.test(f2) ? "&" : "?") + "_=" + Ct.guid++ + o2), v2.url = f2 + o2), v2.ifModified && (S.lastModified[f2] && T2.setRequestHeader("If-Modified-Since", S.lastModified[f2]), S.etag[f2] && T2.setRequestHeader("If-None-Match", S.etag[f2])), (v2.data && v2.hasContent && false !== v2.contentType || t2.contentType) && T2.setRequestHeader("Content-Type", v2.contentType), T2.setRequestHeader("Accept", v2.dataTypes[0] && v2.accepts[v2.dataTypes[0]] ? v2.accepts[v2.dataTypes[0]] + ("*" !== v2.dataTypes[0] ? ", " + It + "; q=0.01" : "") : v2.accepts["*"]), v2.headers)
          T2.setRequestHeader(i3, v2.headers[i3]);
        if (v2.beforeSend && (false === v2.beforeSend.call(y2, T2, v2) || h2))
          return T2.abort();
        if (u2 = "abort", b2.add(v2.complete), T2.done(v2.success), T2.fail(v2.error), c2 = Bt(Mt, v2, t2, T2)) {
          if (T2.readyState = 1, g2 && m2.trigger("ajaxSend", [T2, v2]), h2)
            return T2;
          v2.async && 0 < v2.timeout && (d2 = C.setTimeout(function() {
            T2.abort("timeout");
          }, v2.timeout));
          try {
            h2 = false, c2.send(a2, l2);
          } catch (e3) {
            if (h2)
              throw e3;
            l2(-1, e3);
          }
        } else
          l2(-1, "No Transport");
        function l2(e3, t3, n3, r3) {
          var i4, o3, a3, s3, u3, l3 = t3;
          h2 || (h2 = true, d2 && C.clearTimeout(d2), c2 = void 0, p2 = r3 || "", T2.readyState = 0 < e3 ? 4 : 0, i4 = 200 <= e3 && e3 < 300 || 304 === e3, n3 && (s3 = function(e4, t4, n4) {
            var r4, i5, o4, a4, s4 = e4.contents, u4 = e4.dataTypes;
            while ("*" === u4[0])
              u4.shift(), void 0 === r4 && (r4 = e4.mimeType || t4.getResponseHeader("Content-Type"));
            if (r4) {
              for (i5 in s4)
                if (s4[i5] && s4[i5].test(r4)) {
                  u4.unshift(i5);
                  break;
                }
            }
            if (u4[0] in n4)
              o4 = u4[0];
            else {
              for (i5 in n4) {
                if (!u4[0] || e4.converters[i5 + " " + u4[0]]) {
                  o4 = i5;
                  break;
                }
                a4 || (a4 = i5);
              }
              o4 = o4 || a4;
            }
            if (o4)
              return o4 !== u4[0] && u4.unshift(o4), n4[o4];
          }(v2, T2, n3)), !i4 && -1 < S.inArray("script", v2.dataTypes) && (v2.converters["text script"] = function() {
          }), s3 = function(e4, t4, n4, r4) {
            var i5, o4, a4, s4, u4, l4 = {}, c3 = e4.dataTypes.slice();
            if (c3[1])
              for (a4 in e4.converters)
                l4[a4.toLowerCase()] = e4.converters[a4];
            o4 = c3.shift();
            while (o4)
              if (e4.responseFields[o4] && (n4[e4.responseFields[o4]] = t4), !u4 && r4 && e4.dataFilter && (t4 = e4.dataFilter(t4, e4.dataType)), u4 = o4, o4 = c3.shift()) {
                if ("*" === o4)
                  o4 = u4;
                else if ("*" !== u4 && u4 !== o4) {
                  if (!(a4 = l4[u4 + " " + o4] || l4["* " + o4])) {
                    for (i5 in l4)
                      if ((s4 = i5.split(" "))[1] === o4 && (a4 = l4[u4 + " " + s4[0]] || l4["* " + s4[0]])) {
                        true === a4 ? a4 = l4[i5] : true !== l4[i5] && (o4 = s4[0], c3.unshift(s4[1]));
                        break;
                      }
                  }
                  if (true !== a4)
                    if (a4 && e4["throws"])
                      t4 = a4(t4);
                    else
                      try {
                        t4 = a4(t4);
                      } catch (e5) {
                        return { state: "parsererror", error: a4 ? e5 : "No conversion from " + u4 + " to " + o4 };
                      }
                }
              }
            return { state: "success", data: t4 };
          }(v2, s3, T2, i4), i4 ? (v2.ifModified && ((u3 = T2.getResponseHeader("Last-Modified")) && (S.lastModified[f2] = u3), (u3 = T2.getResponseHeader("etag")) && (S.etag[f2] = u3)), 204 === e3 || "HEAD" === v2.type ? l3 = "nocontent" : 304 === e3 ? l3 = "notmodified" : (l3 = s3.state, o3 = s3.data, i4 = !(a3 = s3.error))) : (a3 = l3, !e3 && l3 || (l3 = "error", e3 < 0 && (e3 = 0))), T2.status = e3, T2.statusText = (t3 || l3) + "", i4 ? x2.resolveWith(y2, [o3, l3, T2]) : x2.rejectWith(y2, [T2, l3, a3]), T2.statusCode(w2), w2 = void 0, g2 && m2.trigger(i4 ? "ajaxSuccess" : "ajaxError", [T2, v2, i4 ? o3 : a3]), b2.fireWith(y2, [T2, l3]), g2 && (m2.trigger("ajaxComplete", [T2, v2]), --S.active || S.event.trigger("ajaxStop")));
        }
        return T2;
      }, getJSON: function(e2, t2, n2) {
        return S.get(e2, t2, n2, "json");
      }, getScript: function(e2, t2) {
        return S.get(e2, void 0, t2, "script");
      } }), S.each(["get", "post"], function(e2, i3) {
        S[i3] = function(e3, t2, n2, r2) {
          return m(t2) && (r2 = r2 || n2, n2 = t2, t2 = void 0), S.ajax(S.extend({ url: e3, type: i3, dataType: r2, data: t2, success: n2 }, S.isPlainObject(e3) && e3));
        };
      }), S.ajaxPrefilter(function(e2) {
        var t2;
        for (t2 in e2.headers)
          "content-type" === t2.toLowerCase() && (e2.contentType = e2.headers[t2] || "");
      }), S._evalUrl = function(e2, t2, n2) {
        return S.ajax({ url: e2, type: "GET", dataType: "script", cache: true, async: false, global: false, converters: { "text script": function() {
        } }, dataFilter: function(e3) {
          S.globalEval(e3, t2, n2);
        } });
      }, S.fn.extend({ wrapAll: function(e2) {
        var t2;
        return this[0] && (m(e2) && (e2 = e2.call(this[0])), t2 = S(e2, this[0].ownerDocument).eq(0).clone(true), this[0].parentNode && t2.insertBefore(this[0]), t2.map(function() {
          var e3 = this;
          while (e3.firstElementChild)
            e3 = e3.firstElementChild;
          return e3;
        }).append(this)), this;
      }, wrapInner: function(n2) {
        return m(n2) ? this.each(function(e2) {
          S(this).wrapInner(n2.call(this, e2));
        }) : this.each(function() {
          var e2 = S(this), t2 = e2.contents();
          t2.length ? t2.wrapAll(n2) : e2.append(n2);
        });
      }, wrap: function(t2) {
        var n2 = m(t2);
        return this.each(function(e2) {
          S(this).wrapAll(n2 ? t2.call(this, e2) : t2);
        });
      }, unwrap: function(e2) {
        return this.parent(e2).not("body").each(function() {
          S(this).replaceWith(this.childNodes);
        }), this;
      } }), S.expr.pseudos.hidden = function(e2) {
        return !S.expr.pseudos.visible(e2);
      }, S.expr.pseudos.visible = function(e2) {
        return !!(e2.offsetWidth || e2.offsetHeight || e2.getClientRects().length);
      }, S.ajaxSettings.xhr = function() {
        try {
          return new C.XMLHttpRequest();
        } catch (e2) {
        }
      };
      var _t = { 0: 200, 1223: 204 }, zt = S.ajaxSettings.xhr();
      y.cors = !!zt && "withCredentials" in zt, y.ajax = zt = !!zt, S.ajaxTransport(function(i3) {
        var o2, a2;
        if (y.cors || zt && !i3.crossDomain)
          return { send: function(e2, t2) {
            var n2, r2 = i3.xhr();
            if (r2.open(i3.type, i3.url, i3.async, i3.username, i3.password), i3.xhrFields)
              for (n2 in i3.xhrFields)
                r2[n2] = i3.xhrFields[n2];
            for (n2 in i3.mimeType && r2.overrideMimeType && r2.overrideMimeType(i3.mimeType), i3.crossDomain || e2["X-Requested-With"] || (e2["X-Requested-With"] = "XMLHttpRequest"), e2)
              r2.setRequestHeader(n2, e2[n2]);
            o2 = function(e3) {
              return function() {
                o2 && (o2 = a2 = r2.onload = r2.onerror = r2.onabort = r2.ontimeout = r2.onreadystatechange = null, "abort" === e3 ? r2.abort() : "error" === e3 ? "number" != typeof r2.status ? t2(0, "error") : t2(r2.status, r2.statusText) : t2(_t[r2.status] || r2.status, r2.statusText, "text" !== (r2.responseType || "text") || "string" != typeof r2.responseText ? { binary: r2.response } : { text: r2.responseText }, r2.getAllResponseHeaders()));
              };
            }, r2.onload = o2(), a2 = r2.onerror = r2.ontimeout = o2("error"), void 0 !== r2.onabort ? r2.onabort = a2 : r2.onreadystatechange = function() {
              4 === r2.readyState && C.setTimeout(function() {
                o2 && a2();
              });
            }, o2 = o2("abort");
            try {
              r2.send(i3.hasContent && i3.data || null);
            } catch (e3) {
              if (o2)
                throw e3;
            }
          }, abort: function() {
            o2 && o2();
          } };
      }), S.ajaxPrefilter(function(e2) {
        e2.crossDomain && (e2.contents.script = false);
      }), S.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /\b(?:java|ecma)script\b/ }, converters: { "text script": function(e2) {
        return S.globalEval(e2), e2;
      } } }), S.ajaxPrefilter("script", function(e2) {
        void 0 === e2.cache && (e2.cache = false), e2.crossDomain && (e2.type = "GET");
      }), S.ajaxTransport("script", function(n2) {
        var r2, i3;
        if (n2.crossDomain || n2.scriptAttrs)
          return { send: function(e2, t2) {
            r2 = S("<script>").attr(n2.scriptAttrs || {}).prop({ charset: n2.scriptCharset, src: n2.url }).on("load error", i3 = function(e3) {
              r2.remove(), i3 = null, e3 && t2("error" === e3.type ? 404 : 200, e3.type);
            }), E.head.appendChild(r2[0]);
          }, abort: function() {
            i3 && i3();
          } };
      });
      var Ut, Xt = [], Vt = /(=)\?(?=&|$)|\?\?/;
      S.ajaxSetup({ jsonp: "callback", jsonpCallback: function() {
        var e2 = Xt.pop() || S.expando + "_" + Ct.guid++;
        return this[e2] = true, e2;
      } }), S.ajaxPrefilter("json jsonp", function(e2, t2, n2) {
        var r2, i3, o2, a2 = false !== e2.jsonp && (Vt.test(e2.url) ? "url" : "string" == typeof e2.data && 0 === (e2.contentType || "").indexOf("application/x-www-form-urlencoded") && Vt.test(e2.data) && "data");
        if (a2 || "jsonp" === e2.dataTypes[0])
          return r2 = e2.jsonpCallback = m(e2.jsonpCallback) ? e2.jsonpCallback() : e2.jsonpCallback, a2 ? e2[a2] = e2[a2].replace(Vt, "$1" + r2) : false !== e2.jsonp && (e2.url += (Et.test(e2.url) ? "&" : "?") + e2.jsonp + "=" + r2), e2.converters["script json"] = function() {
            return o2 || S.error(r2 + " was not called"), o2[0];
          }, e2.dataTypes[0] = "json", i3 = C[r2], C[r2] = function() {
            o2 = arguments;
          }, n2.always(function() {
            void 0 === i3 ? S(C).removeProp(r2) : C[r2] = i3, e2[r2] && (e2.jsonpCallback = t2.jsonpCallback, Xt.push(r2)), o2 && m(i3) && i3(o2[0]), o2 = i3 = void 0;
          }), "script";
      }), y.createHTMLDocument = ((Ut = E.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Ut.childNodes.length), S.parseHTML = function(e2, t2, n2) {
        return "string" != typeof e2 ? [] : ("boolean" == typeof t2 && (n2 = t2, t2 = false), t2 || (y.createHTMLDocument ? ((r2 = (t2 = E.implementation.createHTMLDocument("")).createElement("base")).href = E.location.href, t2.head.appendChild(r2)) : t2 = E), o2 = !n2 && [], (i3 = N.exec(e2)) ? [t2.createElement(i3[1])] : (i3 = xe([e2], t2, o2), o2 && o2.length && S(o2).remove(), S.merge([], i3.childNodes)));
        var r2, i3, o2;
      }, S.fn.load = function(e2, t2, n2) {
        var r2, i3, o2, a2 = this, s2 = e2.indexOf(" ");
        return -1 < s2 && (r2 = vt(e2.slice(s2)), e2 = e2.slice(0, s2)), m(t2) ? (n2 = t2, t2 = void 0) : t2 && "object" == typeof t2 && (i3 = "POST"), 0 < a2.length && S.ajax({ url: e2, type: i3 || "GET", dataType: "html", data: t2 }).done(function(e3) {
          o2 = arguments, a2.html(r2 ? S("<div>").append(S.parseHTML(e3)).find(r2) : e3);
        }).always(n2 && function(e3, t3) {
          a2.each(function() {
            n2.apply(this, o2 || [e3.responseText, t3, e3]);
          });
        }), this;
      }, S.expr.pseudos.animated = function(t2) {
        return S.grep(S.timers, function(e2) {
          return t2 === e2.elem;
        }).length;
      }, S.offset = { setOffset: function(e2, t2, n2) {
        var r2, i3, o2, a2, s2, u2, l2 = S.css(e2, "position"), c2 = S(e2), f2 = {};
        "static" === l2 && (e2.style.position = "relative"), s2 = c2.offset(), o2 = S.css(e2, "top"), u2 = S.css(e2, "left"), ("absolute" === l2 || "fixed" === l2) && -1 < (o2 + u2).indexOf("auto") ? (a2 = (r2 = c2.position()).top, i3 = r2.left) : (a2 = parseFloat(o2) || 0, i3 = parseFloat(u2) || 0), m(t2) && (t2 = t2.call(e2, n2, S.extend({}, s2))), null != t2.top && (f2.top = t2.top - s2.top + a2), null != t2.left && (f2.left = t2.left - s2.left + i3), "using" in t2 ? t2.using.call(e2, f2) : ("number" == typeof f2.top && (f2.top += "px"), "number" == typeof f2.left && (f2.left += "px"), c2.css(f2));
      } }, S.fn.extend({ offset: function(t2) {
        if (arguments.length)
          return void 0 === t2 ? this : this.each(function(e3) {
            S.offset.setOffset(this, t2, e3);
          });
        var e2, n2, r2 = this[0];
        return r2 ? r2.getClientRects().length ? (e2 = r2.getBoundingClientRect(), n2 = r2.ownerDocument.defaultView, { top: e2.top + n2.pageYOffset, left: e2.left + n2.pageXOffset }) : { top: 0, left: 0 } : void 0;
      }, position: function() {
        if (this[0]) {
          var e2, t2, n2, r2 = this[0], i3 = { top: 0, left: 0 };
          if ("fixed" === S.css(r2, "position"))
            t2 = r2.getBoundingClientRect();
          else {
            t2 = this.offset(), n2 = r2.ownerDocument, e2 = r2.offsetParent || n2.documentElement;
            while (e2 && (e2 === n2.body || e2 === n2.documentElement) && "static" === S.css(e2, "position"))
              e2 = e2.parentNode;
            e2 && e2 !== r2 && 1 === e2.nodeType && ((i3 = S(e2).offset()).top += S.css(e2, "borderTopWidth", true), i3.left += S.css(e2, "borderLeftWidth", true));
          }
          return { top: t2.top - i3.top - S.css(r2, "marginTop", true), left: t2.left - i3.left - S.css(r2, "marginLeft", true) };
        }
      }, offsetParent: function() {
        return this.map(function() {
          var e2 = this.offsetParent;
          while (e2 && "static" === S.css(e2, "position"))
            e2 = e2.offsetParent;
          return e2 || re2;
        });
      } }), S.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(t2, i3) {
        var o2 = "pageYOffset" === i3;
        S.fn[t2] = function(e2) {
          return $2(this, function(e3, t3, n2) {
            var r2;
            if (x(e3) ? r2 = e3 : 9 === e3.nodeType && (r2 = e3.defaultView), void 0 === n2)
              return r2 ? r2[i3] : e3[t3];
            r2 ? r2.scrollTo(o2 ? r2.pageXOffset : n2, o2 ? n2 : r2.pageYOffset) : e3[t3] = n2;
          }, t2, e2, arguments.length);
        };
      }), S.each(["top", "left"], function(e2, n2) {
        S.cssHooks[n2] = $e(y.pixelPosition, function(e3, t2) {
          if (t2)
            return t2 = Be(e3, n2), Me.test(t2) ? S(e3).position()[n2] + "px" : t2;
        });
      }), S.each({ Height: "height", Width: "width" }, function(a2, s2) {
        S.each({ padding: "inner" + a2, content: s2, "": "outer" + a2 }, function(r2, o2) {
          S.fn[o2] = function(e2, t2) {
            var n2 = arguments.length && (r2 || "boolean" != typeof e2), i3 = r2 || (true === e2 || true === t2 ? "margin" : "border");
            return $2(this, function(e3, t3, n3) {
              var r3;
              return x(e3) ? 0 === o2.indexOf("outer") ? e3["inner" + a2] : e3.document.documentElement["client" + a2] : 9 === e3.nodeType ? (r3 = e3.documentElement, Math.max(e3.body["scroll" + a2], r3["scroll" + a2], e3.body["offset" + a2], r3["offset" + a2], r3["client" + a2])) : void 0 === n3 ? S.css(e3, t3, i3) : S.style(e3, t3, n3, i3);
            }, s2, n2 ? e2 : void 0, n2);
          };
        });
      }), S.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e2, t2) {
        S.fn[t2] = function(e3) {
          return this.on(t2, e3);
        };
      }), S.fn.extend({ bind: function(e2, t2, n2) {
        return this.on(e2, null, t2, n2);
      }, unbind: function(e2, t2) {
        return this.off(e2, null, t2);
      }, delegate: function(e2, t2, n2, r2) {
        return this.on(t2, e2, n2, r2);
      }, undelegate: function(e2, t2, n2) {
        return 1 === arguments.length ? this.off(e2, "**") : this.off(t2, e2 || "**", n2);
      }, hover: function(e2, t2) {
        return this.mouseenter(e2).mouseleave(t2 || e2);
      } }), S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e2, n2) {
        S.fn[n2] = function(e3, t2) {
          return 0 < arguments.length ? this.on(n2, null, e3, t2) : this.trigger(n2);
        };
      });
      var Gt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
      S.proxy = function(e2, t2) {
        var n2, r2, i3;
        if ("string" == typeof t2 && (n2 = e2[t2], t2 = e2, e2 = n2), m(e2))
          return r2 = s.call(arguments, 2), (i3 = function() {
            return e2.apply(t2 || this, r2.concat(s.call(arguments)));
          }).guid = e2.guid = e2.guid || S.guid++, i3;
      }, S.holdReady = function(e2) {
        e2 ? S.readyWait++ : S.ready(true);
      }, S.isArray = Array.isArray, S.parseJSON = JSON.parse, S.nodeName = A, S.isFunction = m, S.isWindow = x, S.camelCase = X, S.type = w, S.now = Date.now, S.isNumeric = function(e2) {
        var t2 = S.type(e2);
        return ("number" === t2 || "string" === t2) && !isNaN(e2 - parseFloat(e2));
      }, S.trim = function(e2) {
        return null == e2 ? "" : (e2 + "").replace(Gt, "");
      }, "function" == typeof define && define.amd && define("jquery", [], function() {
        return S;
      });
      var Yt = C.jQuery, Qt = C.$;
      return S.noConflict = function(e2) {
        return C.$ === S && (C.$ = Qt), e2 && C.jQuery === S && (C.jQuery = Yt), S;
      }, "undefined" == typeof e && (C.jQuery = C.$ = S), S;
    });
  }
});

// node_modules/@dj256/tuiomanager/node_modules/uuid/lib/rng-browser.js
var require_rng_browser = __commonJS({
  "node_modules/@dj256/tuiomanager/node_modules/uuid/lib/rng-browser.js"(exports, module) {
    var getRandomValues = typeof crypto != "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != "undefined" && typeof window.msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);
    if (getRandomValues) {
      rnds8 = new Uint8Array(16);
      module.exports = function whatwgRNG() {
        getRandomValues(rnds8);
        return rnds8;
      };
    } else {
      rnds = new Array(16);
      module.exports = function mathRNG() {
        for (var i2 = 0, r; i2 < 16; i2++) {
          if ((i2 & 3) === 0)
            r = Math.random() * 4294967296;
          rnds[i2] = r >>> ((i2 & 3) << 3) & 255;
        }
        return rnds;
      };
    }
    var rnds8;
    var rnds;
  }
});

// node_modules/@dj256/tuiomanager/node_modules/uuid/lib/bytesToUuid.js
var require_bytesToUuid = __commonJS({
  "node_modules/@dj256/tuiomanager/node_modules/uuid/lib/bytesToUuid.js"(exports, module) {
    var byteToHex = [];
    for (i2 = 0; i2 < 256; ++i2) {
      byteToHex[i2] = (i2 + 256).toString(16).substr(1);
    }
    var i2;
    function bytesToUuid(buf, offset) {
      var i3 = offset || 0;
      var bth = byteToHex;
      return [
        bth[buf[i3++]],
        bth[buf[i3++]],
        bth[buf[i3++]],
        bth[buf[i3++]],
        "-",
        bth[buf[i3++]],
        bth[buf[i3++]],
        "-",
        bth[buf[i3++]],
        bth[buf[i3++]],
        "-",
        bth[buf[i3++]],
        bth[buf[i3++]],
        "-",
        bth[buf[i3++]],
        bth[buf[i3++]],
        bth[buf[i3++]],
        bth[buf[i3++]],
        bth[buf[i3++]],
        bth[buf[i3++]]
      ].join("");
    }
    module.exports = bytesToUuid;
  }
});

// node_modules/@dj256/tuiomanager/node_modules/uuid/v4.js
var require_v4 = __commonJS({
  "node_modules/@dj256/tuiomanager/node_modules/uuid/v4.js"(exports, module) {
    var rng = require_rng_browser();
    var bytesToUuid = require_bytesToUuid();
    function v4(options, buf, offset) {
      var i2 = buf && offset || 0;
      if (typeof options == "string") {
        buf = options === "binary" ? new Array(16) : null;
        options = null;
      }
      options = options || {};
      var rnds = options.random || (options.rng || rng)();
      rnds[6] = rnds[6] & 15 | 64;
      rnds[8] = rnds[8] & 63 | 128;
      if (buf) {
        for (var ii = 0; ii < 16; ++ii) {
          buf[i2 + ii] = rnds[ii];
        }
      }
      return buf || bytesToUuid(rnds);
    }
    module.exports = v4;
  }
});

// node_modules/engine.io-parser/build/esm/commons.js
var PACKET_TYPES = /* @__PURE__ */ Object.create(null);
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
var PACKET_TYPES_REVERSE = /* @__PURE__ */ Object.create(null);
Object.keys(PACKET_TYPES).forEach((key) => {
  PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
var ERROR_PACKET = { type: "error", data: "parser error" };

// node_modules/engine.io-parser/build/esm/encodePacket.browser.js
var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
var withNativeArrayBuffer = typeof ArrayBuffer === "function";
var isView = (obj) => {
  return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
};
var encodePacket = ({ type, data }, supportsBinary, callback) => {
  if (withNativeBlob && data instanceof Blob) {
    if (supportsBinary) {
      return callback(data);
    } else {
      return encodeBlobAsBase64(data, callback);
    }
  } else if (withNativeArrayBuffer && (data instanceof ArrayBuffer || isView(data))) {
    if (supportsBinary) {
      return callback(data);
    } else {
      return encodeBlobAsBase64(new Blob([data]), callback);
    }
  }
  return callback(PACKET_TYPES[type] + (data || ""));
};
var encodeBlobAsBase64 = (data, callback) => {
  const fileReader = new FileReader();
  fileReader.onload = function() {
    const content = fileReader.result.split(",")[1];
    callback("b" + (content || ""));
  };
  return fileReader.readAsDataURL(data);
};
function toArray(data) {
  if (data instanceof Uint8Array) {
    return data;
  } else if (data instanceof ArrayBuffer) {
    return new Uint8Array(data);
  } else {
    return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  }
}
var TEXT_ENCODER;
function encodePacketToBinary(packet, callback) {
  if (withNativeBlob && packet.data instanceof Blob) {
    return packet.data.arrayBuffer().then(toArray).then(callback);
  } else if (withNativeArrayBuffer && (packet.data instanceof ArrayBuffer || isView(packet.data))) {
    return callback(toArray(packet.data));
  }
  encodePacket(packet, false, (encoded) => {
    if (!TEXT_ENCODER) {
      TEXT_ENCODER = new TextEncoder();
    }
    callback(TEXT_ENCODER.encode(encoded));
  });
}

// node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
for (let i2 = 0; i2 < chars.length; i2++) {
  lookup[chars.charCodeAt(i2)] = i2;
}
var decode = (base64) => {
  let bufferLength = base64.length * 0.75, len = base64.length, i2, p = 0, encoded1, encoded2, encoded3, encoded4;
  if (base64[base64.length - 1] === "=") {
    bufferLength--;
    if (base64[base64.length - 2] === "=") {
      bufferLength--;
    }
  }
  const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
  for (i2 = 0; i2 < len; i2 += 4) {
    encoded1 = lookup[base64.charCodeAt(i2)];
    encoded2 = lookup[base64.charCodeAt(i2 + 1)];
    encoded3 = lookup[base64.charCodeAt(i2 + 2)];
    encoded4 = lookup[base64.charCodeAt(i2 + 3)];
    bytes[p++] = encoded1 << 2 | encoded2 >> 4;
    bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
    bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
  }
  return arraybuffer;
};

// node_modules/engine.io-parser/build/esm/decodePacket.browser.js
var withNativeArrayBuffer2 = typeof ArrayBuffer === "function";
var decodePacket = (encodedPacket, binaryType) => {
  if (typeof encodedPacket !== "string") {
    return {
      type: "message",
      data: mapBinary(encodedPacket, binaryType)
    };
  }
  const type = encodedPacket.charAt(0);
  if (type === "b") {
    return {
      type: "message",
      data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
    };
  }
  const packetType = PACKET_TYPES_REVERSE[type];
  if (!packetType) {
    return ERROR_PACKET;
  }
  return encodedPacket.length > 1 ? {
    type: PACKET_TYPES_REVERSE[type],
    data: encodedPacket.substring(1)
  } : {
    type: PACKET_TYPES_REVERSE[type]
  };
};
var decodeBase64Packet = (data, binaryType) => {
  if (withNativeArrayBuffer2) {
    const decoded = decode(data);
    return mapBinary(decoded, binaryType);
  } else {
    return { base64: true, data };
  }
};
var mapBinary = (data, binaryType) => {
  switch (binaryType) {
    case "blob":
      if (data instanceof Blob) {
        return data;
      } else {
        return new Blob([data]);
      }
    case "arraybuffer":
    default:
      if (data instanceof ArrayBuffer) {
        return data;
      } else {
        return data.buffer;
      }
  }
};

// node_modules/engine.io-parser/build/esm/index.js
var SEPARATOR = String.fromCharCode(30);
var encodePayload = (packets, callback) => {
  const length2 = packets.length;
  const encodedPackets = new Array(length2);
  let count = 0;
  packets.forEach((packet, i2) => {
    encodePacket(packet, false, (encodedPacket) => {
      encodedPackets[i2] = encodedPacket;
      if (++count === length2) {
        callback(encodedPackets.join(SEPARATOR));
      }
    });
  });
};
var decodePayload = (encodedPayload, binaryType) => {
  const encodedPackets = encodedPayload.split(SEPARATOR);
  const packets = [];
  for (let i2 = 0; i2 < encodedPackets.length; i2++) {
    const decodedPacket = decodePacket(encodedPackets[i2], binaryType);
    packets.push(decodedPacket);
    if (decodedPacket.type === "error") {
      break;
    }
  }
  return packets;
};
function createPacketEncoderStream() {
  return new TransformStream({
    transform(packet, controller) {
      encodePacketToBinary(packet, (encodedPacket) => {
        const payloadLength = encodedPacket.length;
        let header;
        if (payloadLength < 126) {
          header = new Uint8Array(1);
          new DataView(header.buffer).setUint8(0, payloadLength);
        } else if (payloadLength < 65536) {
          header = new Uint8Array(3);
          const view = new DataView(header.buffer);
          view.setUint8(0, 126);
          view.setUint16(1, payloadLength);
        } else {
          header = new Uint8Array(9);
          const view = new DataView(header.buffer);
          view.setUint8(0, 127);
          view.setBigUint64(1, BigInt(payloadLength));
        }
        if (packet.data && typeof packet.data !== "string") {
          header[0] |= 128;
        }
        controller.enqueue(header);
        controller.enqueue(encodedPacket);
      });
    }
  });
}
var TEXT_DECODER;
function totalLength(chunks) {
  return chunks.reduce((acc, chunk) => acc + chunk.length, 0);
}
function concatChunks(chunks, size) {
  if (chunks[0].length === size) {
    return chunks.shift();
  }
  const buffer = new Uint8Array(size);
  let j = 0;
  for (let i2 = 0; i2 < size; i2++) {
    buffer[i2] = chunks[0][j++];
    if (j === chunks[0].length) {
      chunks.shift();
      j = 0;
    }
  }
  if (chunks.length && j < chunks[0].length) {
    chunks[0] = chunks[0].slice(j);
  }
  return buffer;
}
function createPacketDecoderStream(maxPayload, binaryType) {
  if (!TEXT_DECODER) {
    TEXT_DECODER = new TextDecoder();
  }
  const chunks = [];
  let state = 0;
  let expectedLength = -1;
  let isBinary2 = false;
  return new TransformStream({
    transform(chunk, controller) {
      chunks.push(chunk);
      while (true) {
        if (state === 0) {
          if (totalLength(chunks) < 1) {
            break;
          }
          const header = concatChunks(chunks, 1);
          isBinary2 = (header[0] & 128) === 128;
          expectedLength = header[0] & 127;
          if (expectedLength < 126) {
            state = 3;
          } else if (expectedLength === 126) {
            state = 1;
          } else {
            state = 2;
          }
        } else if (state === 1) {
          if (totalLength(chunks) < 2) {
            break;
          }
          const headerArray = concatChunks(chunks, 2);
          expectedLength = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length).getUint16(0);
          state = 3;
        } else if (state === 2) {
          if (totalLength(chunks) < 8) {
            break;
          }
          const headerArray = concatChunks(chunks, 8);
          const view = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length);
          const n = view.getUint32(0);
          if (n > Math.pow(2, 53 - 32) - 1) {
            controller.enqueue(ERROR_PACKET);
            break;
          }
          expectedLength = n * Math.pow(2, 32) + view.getUint32(4);
          state = 3;
        } else {
          if (totalLength(chunks) < expectedLength) {
            break;
          }
          const data = concatChunks(chunks, expectedLength);
          controller.enqueue(decodePacket(isBinary2 ? data : TEXT_DECODER.decode(data), binaryType));
          state = 0;
        }
        if (expectedLength === 0 || expectedLength > maxPayload) {
          controller.enqueue(ERROR_PACKET);
          break;
        }
      }
    }
  });
}
var protocol = 4;

// node_modules/@socket.io/component-emitter/index.mjs
function Emitter(obj) {
  if (obj)
    return mixin(obj);
}
function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}
Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
  this._callbacks = this._callbacks || {};
  (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
  return this;
};
Emitter.prototype.once = function(event, fn) {
  function on2() {
    this.off(event, on2);
    fn.apply(this, arguments);
  }
  on2.fn = fn;
  this.on(event, on2);
  return this;
};
Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
  this._callbacks = this._callbacks || {};
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }
  var callbacks = this._callbacks["$" + event];
  if (!callbacks)
    return this;
  if (1 == arguments.length) {
    delete this._callbacks["$" + event];
    return this;
  }
  var cb;
  for (var i2 = 0; i2 < callbacks.length; i2++) {
    cb = callbacks[i2];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i2, 1);
      break;
    }
  }
  if (callbacks.length === 0) {
    delete this._callbacks["$" + event];
  }
  return this;
};
Emitter.prototype.emit = function(event) {
  this._callbacks = this._callbacks || {};
  var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
  for (var i2 = 1; i2 < arguments.length; i2++) {
    args[i2 - 1] = arguments[i2];
  }
  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i2 = 0, len = callbacks.length; i2 < len; ++i2) {
      callbacks[i2].apply(this, args);
    }
  }
  return this;
};
Emitter.prototype.emitReserved = Emitter.prototype.emit;
Emitter.prototype.listeners = function(event) {
  this._callbacks = this._callbacks || {};
  return this._callbacks["$" + event] || [];
};
Emitter.prototype.hasListeners = function(event) {
  return !!this.listeners(event).length;
};

// node_modules/engine.io-client/build/esm/globalThis.browser.js
var globalThisShim = (() => {
  if (typeof self !== "undefined") {
    return self;
  } else if (typeof window !== "undefined") {
    return window;
  } else {
    return Function("return this")();
  }
})();

// node_modules/engine.io-client/build/esm/util.js
function pick(obj, ...attr) {
  return attr.reduce((acc, k) => {
    if (obj.hasOwnProperty(k)) {
      acc[k] = obj[k];
    }
    return acc;
  }, {});
}
var NATIVE_SET_TIMEOUT = globalThisShim.setTimeout;
var NATIVE_CLEAR_TIMEOUT = globalThisShim.clearTimeout;
function installTimerFunctions(obj, opts) {
  if (opts.useNativeTimers) {
    obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim);
    obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim);
  } else {
    obj.setTimeoutFn = globalThisShim.setTimeout.bind(globalThisShim);
    obj.clearTimeoutFn = globalThisShim.clearTimeout.bind(globalThisShim);
  }
}
var BASE64_OVERHEAD = 1.33;
function byteLength(obj) {
  if (typeof obj === "string") {
    return utf8Length(obj);
  }
  return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
}
function utf8Length(str) {
  let c = 0, length2 = 0;
  for (let i2 = 0, l = str.length; i2 < l; i2++) {
    c = str.charCodeAt(i2);
    if (c < 128) {
      length2 += 1;
    } else if (c < 2048) {
      length2 += 2;
    } else if (c < 55296 || c >= 57344) {
      length2 += 3;
    } else {
      i2++;
      length2 += 4;
    }
  }
  return length2;
}

// node_modules/engine.io-client/build/esm/contrib/parseqs.js
function encode(obj) {
  let str = "";
  for (let i2 in obj) {
    if (obj.hasOwnProperty(i2)) {
      if (str.length)
        str += "&";
      str += encodeURIComponent(i2) + "=" + encodeURIComponent(obj[i2]);
    }
  }
  return str;
}
function decode2(qs) {
  let qry = {};
  let pairs = qs.split("&");
  for (let i2 = 0, l = pairs.length; i2 < l; i2++) {
    let pair = pairs[i2].split("=");
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
}

// node_modules/engine.io-client/build/esm/transport.js
var TransportError = class extends Error {
  constructor(reason, description, context) {
    super(reason);
    this.description = description;
    this.context = context;
    this.type = "TransportError";
  }
};
var Transport = class extends Emitter {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(opts) {
    super();
    this.writable = false;
    installTimerFunctions(this, opts);
    this.opts = opts;
    this.query = opts.query;
    this.socket = opts.socket;
  }
  /**
   * Emits an error.
   *
   * @param {String} reason
   * @param description
   * @param context - the error context
   * @return {Transport} for chaining
   * @protected
   */
  onError(reason, description, context) {
    super.emitReserved("error", new TransportError(reason, description, context));
    return this;
  }
  /**
   * Opens the transport.
   */
  open() {
    this.readyState = "opening";
    this.doOpen();
    return this;
  }
  /**
   * Closes the transport.
   */
  close() {
    if (this.readyState === "opening" || this.readyState === "open") {
      this.doClose();
      this.onClose();
    }
    return this;
  }
  /**
   * Sends multiple packets.
   *
   * @param {Array} packets
   */
  send(packets) {
    if (this.readyState === "open") {
      this.write(packets);
    } else {
    }
  }
  /**
   * Called upon open
   *
   * @protected
   */
  onOpen() {
    this.readyState = "open";
    this.writable = true;
    super.emitReserved("open");
  }
  /**
   * Called with data.
   *
   * @param {String} data
   * @protected
   */
  onData(data) {
    const packet = decodePacket(data, this.socket.binaryType);
    this.onPacket(packet);
  }
  /**
   * Called with a decoded packet.
   *
   * @protected
   */
  onPacket(packet) {
    super.emitReserved("packet", packet);
  }
  /**
   * Called upon close.
   *
   * @protected
   */
  onClose(details) {
    this.readyState = "closed";
    super.emitReserved("close", details);
  }
  /**
   * Pauses the transport, in order not to lose packets during an upgrade.
   *
   * @param onPause
   */
  pause(onPause) {
  }
  createUri(schema, query = {}) {
    return schema + "://" + this._hostname() + this._port() + this.opts.path + this._query(query);
  }
  _hostname() {
    const hostname = this.opts.hostname;
    return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
  }
  _port() {
    if (this.opts.port && (this.opts.secure && Number(this.opts.port !== 443) || !this.opts.secure && Number(this.opts.port) !== 80)) {
      return ":" + this.opts.port;
    } else {
      return "";
    }
  }
  _query(query) {
    const encodedQuery = encode(query);
    return encodedQuery.length ? "?" + encodedQuery : "";
  }
};

// node_modules/engine.io-client/build/esm/contrib/yeast.js
var alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split("");
var length = 64;
var map = {};
var seed = 0;
var i = 0;
var prev;
function encode2(num) {
  let encoded = "";
  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);
  return encoded;
}
function yeast() {
  const now = encode2(+/* @__PURE__ */ new Date());
  if (now !== prev)
    return seed = 0, prev = now;
  return now + "." + encode2(seed++);
}
for (; i < length; i++)
  map[alphabet[i]] = i;

// node_modules/engine.io-client/build/esm/contrib/has-cors.js
var value = false;
try {
  value = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
} catch (err) {
}
var hasCORS = value;

// node_modules/engine.io-client/build/esm/transports/xmlhttprequest.browser.js
function XHR(opts) {
  const xdomain = opts.xdomain;
  try {
    if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) {
  }
  if (!xdomain) {
    try {
      return new globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch (e) {
    }
  }
}
function createCookieJar() {
}

// node_modules/engine.io-client/build/esm/transports/polling.js
function empty() {
}
var hasXHR2 = function() {
  const xhr = new XHR({
    xdomain: false
  });
  return null != xhr.responseType;
}();
var Polling = class extends Transport {
  /**
   * XHR Polling constructor.
   *
   * @param {Object} opts
   * @package
   */
  constructor(opts) {
    super(opts);
    this.polling = false;
    if (typeof location !== "undefined") {
      const isSSL = "https:" === location.protocol;
      let port = location.port;
      if (!port) {
        port = isSSL ? "443" : "80";
      }
      this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
    }
    const forceBase64 = opts && opts.forceBase64;
    this.supportsBinary = hasXHR2 && !forceBase64;
    if (this.opts.withCredentials) {
      this.cookieJar = createCookieJar();
    }
  }
  get name() {
    return "polling";
  }
  /**
   * Opens the socket (triggers polling). We write a PING message to determine
   * when the transport is open.
   *
   * @protected
   */
  doOpen() {
    this.poll();
  }
  /**
   * Pauses polling.
   *
   * @param {Function} onPause - callback upon buffers are flushed and transport is paused
   * @package
   */
  pause(onPause) {
    this.readyState = "pausing";
    const pause = () => {
      this.readyState = "paused";
      onPause();
    };
    if (this.polling || !this.writable) {
      let total = 0;
      if (this.polling) {
        total++;
        this.once("pollComplete", function() {
          --total || pause();
        });
      }
      if (!this.writable) {
        total++;
        this.once("drain", function() {
          --total || pause();
        });
      }
    } else {
      pause();
    }
  }
  /**
   * Starts polling cycle.
   *
   * @private
   */
  poll() {
    this.polling = true;
    this.doPoll();
    this.emitReserved("poll");
  }
  /**
   * Overloads onData to detect payloads.
   *
   * @protected
   */
  onData(data) {
    const callback = (packet) => {
      if ("opening" === this.readyState && packet.type === "open") {
        this.onOpen();
      }
      if ("close" === packet.type) {
        this.onClose({ description: "transport closed by the server" });
        return false;
      }
      this.onPacket(packet);
    };
    decodePayload(data, this.socket.binaryType).forEach(callback);
    if ("closed" !== this.readyState) {
      this.polling = false;
      this.emitReserved("pollComplete");
      if ("open" === this.readyState) {
        this.poll();
      } else {
      }
    }
  }
  /**
   * For polling, send a close packet.
   *
   * @protected
   */
  doClose() {
    const close = () => {
      this.write([{ type: "close" }]);
    };
    if ("open" === this.readyState) {
      close();
    } else {
      this.once("open", close);
    }
  }
  /**
   * Writes a packets payload.
   *
   * @param {Array} packets - data packets
   * @protected
   */
  write(packets) {
    this.writable = false;
    encodePayload(packets, (data) => {
      this.doWrite(data, () => {
        this.writable = true;
        this.emitReserved("drain");
      });
    });
  }
  /**
   * Generates uri for connection.
   *
   * @private
   */
  uri() {
    const schema = this.opts.secure ? "https" : "http";
    const query = this.query || {};
    if (false !== this.opts.timestampRequests) {
      query[this.opts.timestampParam] = yeast();
    }
    if (!this.supportsBinary && !query.sid) {
      query.b64 = 1;
    }
    return this.createUri(schema, query);
  }
  /**
   * Creates a request.
   *
   * @param {String} method
   * @private
   */
  request(opts = {}) {
    Object.assign(opts, { xd: this.xd, cookieJar: this.cookieJar }, this.opts);
    return new Request(this.uri(), opts);
  }
  /**
   * Sends data.
   *
   * @param {String} data to send.
   * @param {Function} called upon flush.
   * @private
   */
  doWrite(data, fn) {
    const req = this.request({
      method: "POST",
      data
    });
    req.on("success", fn);
    req.on("error", (xhrStatus, context) => {
      this.onError("xhr post error", xhrStatus, context);
    });
  }
  /**
   * Starts a poll cycle.
   *
   * @private
   */
  doPoll() {
    const req = this.request();
    req.on("data", this.onData.bind(this));
    req.on("error", (xhrStatus, context) => {
      this.onError("xhr poll error", xhrStatus, context);
    });
    this.pollXhr = req;
  }
};
var Request = class _Request extends Emitter {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @package
   */
  constructor(uri, opts) {
    super();
    installTimerFunctions(this, opts);
    this.opts = opts;
    this.method = opts.method || "GET";
    this.uri = uri;
    this.data = void 0 !== opts.data ? opts.data : null;
    this.create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @private
   */
  create() {
    var _a;
    const opts = pick(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
    opts.xdomain = !!this.opts.xd;
    const xhr = this.xhr = new XHR(opts);
    try {
      xhr.open(this.method, this.uri, true);
      try {
        if (this.opts.extraHeaders) {
          xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
          for (let i2 in this.opts.extraHeaders) {
            if (this.opts.extraHeaders.hasOwnProperty(i2)) {
              xhr.setRequestHeader(i2, this.opts.extraHeaders[i2]);
            }
          }
        }
      } catch (e) {
      }
      if ("POST" === this.method) {
        try {
          xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch (e) {
        }
      }
      try {
        xhr.setRequestHeader("Accept", "*/*");
      } catch (e) {
      }
      (_a = this.opts.cookieJar) === null || _a === void 0 ? void 0 : _a.addCookies(xhr);
      if ("withCredentials" in xhr) {
        xhr.withCredentials = this.opts.withCredentials;
      }
      if (this.opts.requestTimeout) {
        xhr.timeout = this.opts.requestTimeout;
      }
      xhr.onreadystatechange = () => {
        var _a2;
        if (xhr.readyState === 3) {
          (_a2 = this.opts.cookieJar) === null || _a2 === void 0 ? void 0 : _a2.parseCookies(xhr);
        }
        if (4 !== xhr.readyState)
          return;
        if (200 === xhr.status || 1223 === xhr.status) {
          this.onLoad();
        } else {
          this.setTimeoutFn(() => {
            this.onError(typeof xhr.status === "number" ? xhr.status : 0);
          }, 0);
        }
      };
      xhr.send(this.data);
    } catch (e) {
      this.setTimeoutFn(() => {
        this.onError(e);
      }, 0);
      return;
    }
    if (typeof document !== "undefined") {
      this.index = _Request.requestsCount++;
      _Request.requests[this.index] = this;
    }
  }
  /**
   * Called upon error.
   *
   * @private
   */
  onError(err) {
    this.emitReserved("error", err, this.xhr);
    this.cleanup(true);
  }
  /**
   * Cleans up house.
   *
   * @private
   */
  cleanup(fromError) {
    if ("undefined" === typeof this.xhr || null === this.xhr) {
      return;
    }
    this.xhr.onreadystatechange = empty;
    if (fromError) {
      try {
        this.xhr.abort();
      } catch (e) {
      }
    }
    if (typeof document !== "undefined") {
      delete _Request.requests[this.index];
    }
    this.xhr = null;
  }
  /**
   * Called upon load.
   *
   * @private
   */
  onLoad() {
    const data = this.xhr.responseText;
    if (data !== null) {
      this.emitReserved("data", data);
      this.emitReserved("success");
      this.cleanup();
    }
  }
  /**
   * Aborts the request.
   *
   * @package
   */
  abort() {
    this.cleanup();
  }
};
Request.requestsCount = 0;
Request.requests = {};
if (typeof document !== "undefined") {
  if (typeof attachEvent === "function") {
    attachEvent("onunload", unloadHandler);
  } else if (typeof addEventListener === "function") {
    const terminationEvent = "onpagehide" in globalThisShim ? "pagehide" : "unload";
    addEventListener(terminationEvent, unloadHandler, false);
  }
}
function unloadHandler() {
  for (let i2 in Request.requests) {
    if (Request.requests.hasOwnProperty(i2)) {
      Request.requests[i2].abort();
    }
  }
}

// node_modules/engine.io-client/build/esm/transports/websocket-constructor.browser.js
var nextTick = (() => {
  const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
  if (isPromiseAvailable) {
    return (cb) => Promise.resolve().then(cb);
  } else {
    return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
  }
})();
var WebSocket = globalThisShim.WebSocket || globalThisShim.MozWebSocket;
var usingBrowserWebSocket = true;
var defaultBinaryType = "arraybuffer";

// node_modules/engine.io-client/build/esm/transports/websocket.js
var isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
var WS = class extends Transport {
  /**
   * WebSocket transport constructor.
   *
   * @param {Object} opts - connection options
   * @protected
   */
  constructor(opts) {
    super(opts);
    this.supportsBinary = !opts.forceBase64;
  }
  get name() {
    return "websocket";
  }
  doOpen() {
    if (!this.check()) {
      return;
    }
    const uri = this.uri();
    const protocols = this.opts.protocols;
    const opts = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
    if (this.opts.extraHeaders) {
      opts.headers = this.opts.extraHeaders;
    }
    try {
      this.ws = usingBrowserWebSocket && !isReactNative ? protocols ? new WebSocket(uri, protocols) : new WebSocket(uri) : new WebSocket(uri, protocols, opts);
    } catch (err) {
      return this.emitReserved("error", err);
    }
    this.ws.binaryType = this.socket.binaryType;
    this.addEventListeners();
  }
  /**
   * Adds event listeners to the socket
   *
   * @private
   */
  addEventListeners() {
    this.ws.onopen = () => {
      if (this.opts.autoUnref) {
        this.ws._socket.unref();
      }
      this.onOpen();
    };
    this.ws.onclose = (closeEvent) => this.onClose({
      description: "websocket connection closed",
      context: closeEvent
    });
    this.ws.onmessage = (ev) => this.onData(ev.data);
    this.ws.onerror = (e) => this.onError("websocket error", e);
  }
  write(packets) {
    this.writable = false;
    for (let i2 = 0; i2 < packets.length; i2++) {
      const packet = packets[i2];
      const lastPacket = i2 === packets.length - 1;
      encodePacket(packet, this.supportsBinary, (data) => {
        const opts = {};
        if (!usingBrowserWebSocket) {
          if (packet.options) {
            opts.compress = packet.options.compress;
          }
          if (this.opts.perMessageDeflate) {
            const len = (
              // @ts-ignore
              "string" === typeof data ? Buffer.byteLength(data) : data.length
            );
            if (len < this.opts.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
        }
        try {
          if (usingBrowserWebSocket) {
            this.ws.send(data);
          } else {
            this.ws.send(data, opts);
          }
        } catch (e) {
        }
        if (lastPacket) {
          nextTick(() => {
            this.writable = true;
            this.emitReserved("drain");
          }, this.setTimeoutFn);
        }
      });
    }
  }
  doClose() {
    if (typeof this.ws !== "undefined") {
      this.ws.close();
      this.ws = null;
    }
  }
  /**
   * Generates uri for connection.
   *
   * @private
   */
  uri() {
    const schema = this.opts.secure ? "wss" : "ws";
    const query = this.query || {};
    if (this.opts.timestampRequests) {
      query[this.opts.timestampParam] = yeast();
    }
    if (!this.supportsBinary) {
      query.b64 = 1;
    }
    return this.createUri(schema, query);
  }
  /**
   * Feature detection for WebSocket.
   *
   * @return {Boolean} whether this transport is available.
   * @private
   */
  check() {
    return !!WebSocket;
  }
};

// node_modules/engine.io-client/build/esm/transports/webtransport.js
var WT = class extends Transport {
  get name() {
    return "webtransport";
  }
  doOpen() {
    if (typeof WebTransport !== "function") {
      return;
    }
    this.transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
    this.transport.closed.then(() => {
      this.onClose();
    }).catch((err) => {
      this.onError("webtransport error", err);
    });
    this.transport.ready.then(() => {
      this.transport.createBidirectionalStream().then((stream) => {
        const decoderStream = createPacketDecoderStream(Number.MAX_SAFE_INTEGER, this.socket.binaryType);
        const reader = stream.readable.pipeThrough(decoderStream).getReader();
        const encoderStream = createPacketEncoderStream();
        encoderStream.readable.pipeTo(stream.writable);
        this.writer = encoderStream.writable.getWriter();
        const read = () => {
          reader.read().then(({ done, value: value2 }) => {
            if (done) {
              return;
            }
            this.onPacket(value2);
            read();
          }).catch((err) => {
          });
        };
        read();
        const packet = { type: "open" };
        if (this.query.sid) {
          packet.data = `{"sid":"${this.query.sid}"}`;
        }
        this.writer.write(packet).then(() => this.onOpen());
      });
    });
  }
  write(packets) {
    this.writable = false;
    for (let i2 = 0; i2 < packets.length; i2++) {
      const packet = packets[i2];
      const lastPacket = i2 === packets.length - 1;
      this.writer.write(packet).then(() => {
        if (lastPacket) {
          nextTick(() => {
            this.writable = true;
            this.emitReserved("drain");
          }, this.setTimeoutFn);
        }
      });
    }
  }
  doClose() {
    var _a;
    (_a = this.transport) === null || _a === void 0 ? void 0 : _a.close();
  }
};

// node_modules/engine.io-client/build/esm/transports/index.js
var transports = {
  websocket: WS,
  webtransport: WT,
  polling: Polling
};

// node_modules/engine.io-client/build/esm/contrib/parseuri.js
var re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
var parts = [
  "source",
  "protocol",
  "authority",
  "userInfo",
  "user",
  "password",
  "host",
  "port",
  "relative",
  "path",
  "directory",
  "file",
  "query",
  "anchor"
];
function parse(str) {
  if (str.length > 2e3) {
    throw "URI too long";
  }
  const src = str, b = str.indexOf("["), e = str.indexOf("]");
  if (b != -1 && e != -1) {
    str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length);
  }
  let m = re.exec(str || ""), uri = {}, i2 = 14;
  while (i2--) {
    uri[parts[i2]] = m[i2] || "";
  }
  if (b != -1 && e != -1) {
    uri.source = src;
    uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
    uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
    uri.ipv6uri = true;
  }
  uri.pathNames = pathNames(uri, uri["path"]);
  uri.queryKey = queryKey(uri, uri["query"]);
  return uri;
}
function pathNames(obj, path) {
  const regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
  if (path.slice(0, 1) == "/" || path.length === 0) {
    names.splice(0, 1);
  }
  if (path.slice(-1) == "/") {
    names.splice(names.length - 1, 1);
  }
  return names;
}
function queryKey(uri, query) {
  const data = {};
  query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
    if ($1) {
      data[$1] = $2;
    }
  });
  return data;
}

// node_modules/engine.io-client/build/esm/socket.js
var Socket = class _Socket extends Emitter {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(uri, opts = {}) {
    super();
    this.binaryType = defaultBinaryType;
    this.writeBuffer = [];
    if (uri && "object" === typeof uri) {
      opts = uri;
      uri = null;
    }
    if (uri) {
      uri = parse(uri);
      opts.hostname = uri.host;
      opts.secure = uri.protocol === "https" || uri.protocol === "wss";
      opts.port = uri.port;
      if (uri.query)
        opts.query = uri.query;
    } else if (opts.host) {
      opts.hostname = parse(opts.host).host;
    }
    installTimerFunctions(this, opts);
    this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
    if (opts.hostname && !opts.port) {
      opts.port = this.secure ? "443" : "80";
    }
    this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
    this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
    this.transports = opts.transports || [
      "polling",
      "websocket",
      "webtransport"
    ];
    this.writeBuffer = [];
    this.prevBufferLen = 0;
    this.opts = Object.assign({
      path: "/engine.io",
      agent: false,
      withCredentials: false,
      upgrade: true,
      timestampParam: "t",
      rememberUpgrade: false,
      addTrailingSlash: true,
      rejectUnauthorized: true,
      perMessageDeflate: {
        threshold: 1024
      },
      transportOptions: {},
      closeOnBeforeunload: false
    }, opts);
    this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : "");
    if (typeof this.opts.query === "string") {
      this.opts.query = decode2(this.opts.query);
    }
    this.id = null;
    this.upgrades = null;
    this.pingInterval = null;
    this.pingTimeout = null;
    this.pingTimeoutTimer = null;
    if (typeof addEventListener === "function") {
      if (this.opts.closeOnBeforeunload) {
        this.beforeunloadEventListener = () => {
          if (this.transport) {
            this.transport.removeAllListeners();
            this.transport.close();
          }
        };
        addEventListener("beforeunload", this.beforeunloadEventListener, false);
      }
      if (this.hostname !== "localhost") {
        this.offlineEventListener = () => {
          this.onClose("transport close", {
            description: "network connection lost"
          });
        };
        addEventListener("offline", this.offlineEventListener, false);
      }
    }
    this.open();
  }
  /**
   * Creates transport of the given type.
   *
   * @param {String} name - transport name
   * @return {Transport}
   * @private
   */
  createTransport(name) {
    const query = Object.assign({}, this.opts.query);
    query.EIO = protocol;
    query.transport = name;
    if (this.id)
      query.sid = this.id;
    const opts = Object.assign({}, this.opts, {
      query,
      socket: this,
      hostname: this.hostname,
      secure: this.secure,
      port: this.port
    }, this.opts.transportOptions[name]);
    return new transports[name](opts);
  }
  /**
   * Initializes transport to use and starts probe.
   *
   * @private
   */
  open() {
    let transport;
    if (this.opts.rememberUpgrade && _Socket.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
      transport = "websocket";
    } else if (0 === this.transports.length) {
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    } else {
      transport = this.transports[0];
    }
    this.readyState = "opening";
    try {
      transport = this.createTransport(transport);
    } catch (e) {
      this.transports.shift();
      this.open();
      return;
    }
    transport.open();
    this.setTransport(transport);
  }
  /**
   * Sets the current transport. Disables the existing one (if any).
   *
   * @private
   */
  setTransport(transport) {
    if (this.transport) {
      this.transport.removeAllListeners();
    }
    this.transport = transport;
    transport.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", (reason) => this.onClose("transport close", reason));
  }
  /**
   * Probes a transport.
   *
   * @param {String} name - transport name
   * @private
   */
  probe(name) {
    let transport = this.createTransport(name);
    let failed = false;
    _Socket.priorWebsocketSuccess = false;
    const onTransportOpen = () => {
      if (failed)
        return;
      transport.send([{ type: "ping", data: "probe" }]);
      transport.once("packet", (msg) => {
        if (failed)
          return;
        if ("pong" === msg.type && "probe" === msg.data) {
          this.upgrading = true;
          this.emitReserved("upgrading", transport);
          if (!transport)
            return;
          _Socket.priorWebsocketSuccess = "websocket" === transport.name;
          this.transport.pause(() => {
            if (failed)
              return;
            if ("closed" === this.readyState)
              return;
            cleanup();
            this.setTransport(transport);
            transport.send([{ type: "upgrade" }]);
            this.emitReserved("upgrade", transport);
            transport = null;
            this.upgrading = false;
            this.flush();
          });
        } else {
          const err = new Error("probe error");
          err.transport = transport.name;
          this.emitReserved("upgradeError", err);
        }
      });
    };
    function freezeTransport() {
      if (failed)
        return;
      failed = true;
      cleanup();
      transport.close();
      transport = null;
    }
    const onerror = (err) => {
      const error = new Error("probe error: " + err);
      error.transport = transport.name;
      freezeTransport();
      this.emitReserved("upgradeError", error);
    };
    function onTransportClose() {
      onerror("transport closed");
    }
    function onclose() {
      onerror("socket closed");
    }
    function onupgrade(to) {
      if (transport && to.name !== transport.name) {
        freezeTransport();
      }
    }
    const cleanup = () => {
      transport.removeListener("open", onTransportOpen);
      transport.removeListener("error", onerror);
      transport.removeListener("close", onTransportClose);
      this.off("close", onclose);
      this.off("upgrading", onupgrade);
    };
    transport.once("open", onTransportOpen);
    transport.once("error", onerror);
    transport.once("close", onTransportClose);
    this.once("close", onclose);
    this.once("upgrading", onupgrade);
    if (this.upgrades.indexOf("webtransport") !== -1 && name !== "webtransport") {
      this.setTimeoutFn(() => {
        if (!failed) {
          transport.open();
        }
      }, 200);
    } else {
      transport.open();
    }
  }
  /**
   * Called when connection is deemed open.
   *
   * @private
   */
  onOpen() {
    this.readyState = "open";
    _Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
    this.emitReserved("open");
    this.flush();
    if ("open" === this.readyState && this.opts.upgrade) {
      let i2 = 0;
      const l = this.upgrades.length;
      for (; i2 < l; i2++) {
        this.probe(this.upgrades[i2]);
      }
    }
  }
  /**
   * Handles a packet.
   *
   * @private
   */
  onPacket(packet) {
    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
      this.emitReserved("packet", packet);
      this.emitReserved("heartbeat");
      this.resetPingTimeout();
      switch (packet.type) {
        case "open":
          this.onHandshake(JSON.parse(packet.data));
          break;
        case "ping":
          this.sendPacket("pong");
          this.emitReserved("ping");
          this.emitReserved("pong");
          break;
        case "error":
          const err = new Error("server error");
          err.code = packet.data;
          this.onError(err);
          break;
        case "message":
          this.emitReserved("data", packet.data);
          this.emitReserved("message", packet.data);
          break;
      }
    } else {
    }
  }
  /**
   * Called upon handshake completion.
   *
   * @param {Object} data - handshake obj
   * @private
   */
  onHandshake(data) {
    this.emitReserved("handshake", data);
    this.id = data.sid;
    this.transport.query.sid = data.sid;
    this.upgrades = this.filterUpgrades(data.upgrades);
    this.pingInterval = data.pingInterval;
    this.pingTimeout = data.pingTimeout;
    this.maxPayload = data.maxPayload;
    this.onOpen();
    if ("closed" === this.readyState)
      return;
    this.resetPingTimeout();
  }
  /**
   * Sets and resets ping timeout timer based on server pings.
   *
   * @private
   */
  resetPingTimeout() {
    this.clearTimeoutFn(this.pingTimeoutTimer);
    this.pingTimeoutTimer = this.setTimeoutFn(() => {
      this.onClose("ping timeout");
    }, this.pingInterval + this.pingTimeout);
    if (this.opts.autoUnref) {
      this.pingTimeoutTimer.unref();
    }
  }
  /**
   * Called on `drain` event
   *
   * @private
   */
  onDrain() {
    this.writeBuffer.splice(0, this.prevBufferLen);
    this.prevBufferLen = 0;
    if (0 === this.writeBuffer.length) {
      this.emitReserved("drain");
    } else {
      this.flush();
    }
  }
  /**
   * Flush write buffers.
   *
   * @private
   */
  flush() {
    if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
      const packets = this.getWritablePackets();
      this.transport.send(packets);
      this.prevBufferLen = packets.length;
      this.emitReserved("flush");
    }
  }
  /**
   * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
   * long-polling)
   *
   * @private
   */
  getWritablePackets() {
    const shouldCheckPayloadSize = this.maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1;
    if (!shouldCheckPayloadSize) {
      return this.writeBuffer;
    }
    let payloadSize = 1;
    for (let i2 = 0; i2 < this.writeBuffer.length; i2++) {
      const data = this.writeBuffer[i2].data;
      if (data) {
        payloadSize += byteLength(data);
      }
      if (i2 > 0 && payloadSize > this.maxPayload) {
        return this.writeBuffer.slice(0, i2);
      }
      payloadSize += 2;
    }
    return this.writeBuffer;
  }
  /**
   * Sends a message.
   *
   * @param {String} msg - message.
   * @param {Object} options.
   * @param {Function} callback function.
   * @return {Socket} for chaining.
   */
  write(msg, options, fn) {
    this.sendPacket("message", msg, options, fn);
    return this;
  }
  send(msg, options, fn) {
    this.sendPacket("message", msg, options, fn);
    return this;
  }
  /**
   * Sends a packet.
   *
   * @param {String} type: packet type.
   * @param {String} data.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @private
   */
  sendPacket(type, data, options, fn) {
    if ("function" === typeof data) {
      fn = data;
      data = void 0;
    }
    if ("function" === typeof options) {
      fn = options;
      options = null;
    }
    if ("closing" === this.readyState || "closed" === this.readyState) {
      return;
    }
    options = options || {};
    options.compress = false !== options.compress;
    const packet = {
      type,
      data,
      options
    };
    this.emitReserved("packetCreate", packet);
    this.writeBuffer.push(packet);
    if (fn)
      this.once("flush", fn);
    this.flush();
  }
  /**
   * Closes the connection.
   */
  close() {
    const close = () => {
      this.onClose("forced close");
      this.transport.close();
    };
    const cleanupAndClose = () => {
      this.off("upgrade", cleanupAndClose);
      this.off("upgradeError", cleanupAndClose);
      close();
    };
    const waitForUpgrade = () => {
      this.once("upgrade", cleanupAndClose);
      this.once("upgradeError", cleanupAndClose);
    };
    if ("opening" === this.readyState || "open" === this.readyState) {
      this.readyState = "closing";
      if (this.writeBuffer.length) {
        this.once("drain", () => {
          if (this.upgrading) {
            waitForUpgrade();
          } else {
            close();
          }
        });
      } else if (this.upgrading) {
        waitForUpgrade();
      } else {
        close();
      }
    }
    return this;
  }
  /**
   * Called upon transport error
   *
   * @private
   */
  onError(err) {
    _Socket.priorWebsocketSuccess = false;
    this.emitReserved("error", err);
    this.onClose("transport error", err);
  }
  /**
   * Called upon transport close.
   *
   * @private
   */
  onClose(reason, description) {
    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
      this.clearTimeoutFn(this.pingTimeoutTimer);
      this.transport.removeAllListeners("close");
      this.transport.close();
      this.transport.removeAllListeners();
      if (typeof removeEventListener === "function") {
        removeEventListener("beforeunload", this.beforeunloadEventListener, false);
        removeEventListener("offline", this.offlineEventListener, false);
      }
      this.readyState = "closed";
      this.id = null;
      this.emitReserved("close", reason, description);
      this.writeBuffer = [];
      this.prevBufferLen = 0;
    }
  }
  /**
   * Filters upgrades, returning only those matching client transports.
   *
   * @param {Array} upgrades - server upgrades
   * @private
   */
  filterUpgrades(upgrades) {
    const filteredUpgrades = [];
    let i2 = 0;
    const j = upgrades.length;
    for (; i2 < j; i2++) {
      if (~this.transports.indexOf(upgrades[i2]))
        filteredUpgrades.push(upgrades[i2]);
    }
    return filteredUpgrades;
  }
};
Socket.protocol = protocol;

// node_modules/engine.io-client/build/esm/index.js
var protocol2 = Socket.protocol;

// node_modules/socket.io-client/build/esm/url.js
function url(uri, path = "", loc) {
  let obj = uri;
  loc = loc || typeof location !== "undefined" && location;
  if (null == uri)
    uri = loc.protocol + "//" + loc.host;
  if (typeof uri === "string") {
    if ("/" === uri.charAt(0)) {
      if ("/" === uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }
    if (!/^(https?|wss?):\/\//.test(uri)) {
      if ("undefined" !== typeof loc) {
        uri = loc.protocol + "//" + uri;
      } else {
        uri = "https://" + uri;
      }
    }
    obj = parse(uri);
  }
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = "80";
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = "443";
    }
  }
  obj.path = obj.path || "/";
  const ipv6 = obj.host.indexOf(":") !== -1;
  const host = ipv6 ? "[" + obj.host + "]" : obj.host;
  obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
  obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
  return obj;
}

// node_modules/socket.io-parser/build/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  Decoder: () => Decoder,
  Encoder: () => Encoder,
  PacketType: () => PacketType,
  protocol: () => protocol3
});

// node_modules/socket.io-parser/build/esm/is-binary.js
var withNativeArrayBuffer3 = typeof ArrayBuffer === "function";
var isView2 = (obj) => {
  return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
};
var toString = Object.prototype.toString;
var withNativeBlob2 = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
function isBinary(obj) {
  return withNativeArrayBuffer3 && (obj instanceof ArrayBuffer || isView2(obj)) || withNativeBlob2 && obj instanceof Blob || withNativeFile && obj instanceof File;
}
function hasBinary(obj, toJSON) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  if (Array.isArray(obj)) {
    for (let i2 = 0, l = obj.length; i2 < l; i2++) {
      if (hasBinary(obj[i2])) {
        return true;
      }
    }
    return false;
  }
  if (isBinary(obj)) {
    return true;
  }
  if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
    return hasBinary(obj.toJSON(), true);
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
      return true;
    }
  }
  return false;
}

// node_modules/socket.io-parser/build/esm/binary.js
function deconstructPacket(packet) {
  const buffers = [];
  const packetData = packet.data;
  const pack = packet;
  pack.data = _deconstructPacket(packetData, buffers);
  pack.attachments = buffers.length;
  return { packet: pack, buffers };
}
function _deconstructPacket(data, buffers) {
  if (!data)
    return data;
  if (isBinary(data)) {
    const placeholder = { _placeholder: true, num: buffers.length };
    buffers.push(data);
    return placeholder;
  } else if (Array.isArray(data)) {
    const newData = new Array(data.length);
    for (let i2 = 0; i2 < data.length; i2++) {
      newData[i2] = _deconstructPacket(data[i2], buffers);
    }
    return newData;
  } else if (typeof data === "object" && !(data instanceof Date)) {
    const newData = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        newData[key] = _deconstructPacket(data[key], buffers);
      }
    }
    return newData;
  }
  return data;
}
function reconstructPacket(packet, buffers) {
  packet.data = _reconstructPacket(packet.data, buffers);
  delete packet.attachments;
  return packet;
}
function _reconstructPacket(data, buffers) {
  if (!data)
    return data;
  if (data && data._placeholder === true) {
    const isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
    if (isIndexValid) {
      return buffers[data.num];
    } else {
      throw new Error("illegal attachments");
    }
  } else if (Array.isArray(data)) {
    for (let i2 = 0; i2 < data.length; i2++) {
      data[i2] = _reconstructPacket(data[i2], buffers);
    }
  } else if (typeof data === "object") {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        data[key] = _reconstructPacket(data[key], buffers);
      }
    }
  }
  return data;
}

// node_modules/socket.io-parser/build/esm/index.js
var RESERVED_EVENTS = [
  "connect",
  "connect_error",
  "disconnect",
  "disconnecting",
  "newListener",
  "removeListener"
  // used by the Node.js EventEmitter
];
var protocol3 = 5;
var PacketType;
(function(PacketType2) {
  PacketType2[PacketType2["CONNECT"] = 0] = "CONNECT";
  PacketType2[PacketType2["DISCONNECT"] = 1] = "DISCONNECT";
  PacketType2[PacketType2["EVENT"] = 2] = "EVENT";
  PacketType2[PacketType2["ACK"] = 3] = "ACK";
  PacketType2[PacketType2["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
  PacketType2[PacketType2["BINARY_EVENT"] = 5] = "BINARY_EVENT";
  PacketType2[PacketType2["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType || (PacketType = {}));
var Encoder = class {
  /**
   * Encoder constructor
   *
   * @param {function} replacer - custom replacer to pass down to JSON.parse
   */
  constructor(replacer) {
    this.replacer = replacer;
  }
  /**
   * Encode a packet as a single string if non-binary, or as a
   * buffer sequence, depending on packet type.
   *
   * @param {Object} obj - packet object
   */
  encode(obj) {
    if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
      if (hasBinary(obj)) {
        return this.encodeAsBinary({
          type: obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
          nsp: obj.nsp,
          data: obj.data,
          id: obj.id
        });
      }
    }
    return [this.encodeAsString(obj)];
  }
  /**
   * Encode packet as string.
   */
  encodeAsString(obj) {
    let str = "" + obj.type;
    if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
      str += obj.attachments + "-";
    }
    if (obj.nsp && "/" !== obj.nsp) {
      str += obj.nsp + ",";
    }
    if (null != obj.id) {
      str += obj.id;
    }
    if (null != obj.data) {
      str += JSON.stringify(obj.data, this.replacer);
    }
    return str;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(obj) {
    const deconstruction = deconstructPacket(obj);
    const pack = this.encodeAsString(deconstruction.packet);
    const buffers = deconstruction.buffers;
    buffers.unshift(pack);
    return buffers;
  }
};
function isObject(value2) {
  return Object.prototype.toString.call(value2) === "[object Object]";
}
var Decoder = class _Decoder extends Emitter {
  /**
   * Decoder constructor
   *
   * @param {function} reviver - custom reviver to pass down to JSON.stringify
   */
  constructor(reviver) {
    super();
    this.reviver = reviver;
  }
  /**
   * Decodes an encoded packet string into packet JSON.
   *
   * @param {String} obj - encoded packet
   */
  add(obj) {
    let packet;
    if (typeof obj === "string") {
      if (this.reconstructor) {
        throw new Error("got plaintext data when reconstructing a packet");
      }
      packet = this.decodeString(obj);
      const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
      if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
        packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
        this.reconstructor = new BinaryReconstructor(packet);
        if (packet.attachments === 0) {
          super.emitReserved("decoded", packet);
        }
      } else {
        super.emitReserved("decoded", packet);
      }
    } else if (isBinary(obj) || obj.base64) {
      if (!this.reconstructor) {
        throw new Error("got binary data when not reconstructing a packet");
      } else {
        packet = this.reconstructor.takeBinaryData(obj);
        if (packet) {
          this.reconstructor = null;
          super.emitReserved("decoded", packet);
        }
      }
    } else {
      throw new Error("Unknown type: " + obj);
    }
  }
  /**
   * Decode a packet String (JSON data)
   *
   * @param {String} str
   * @return {Object} packet
   */
  decodeString(str) {
    let i2 = 0;
    const p = {
      type: Number(str.charAt(0))
    };
    if (PacketType[p.type] === void 0) {
      throw new Error("unknown packet type " + p.type);
    }
    if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
      const start = i2 + 1;
      while (str.charAt(++i2) !== "-" && i2 != str.length) {
      }
      const buf = str.substring(start, i2);
      if (buf != Number(buf) || str.charAt(i2) !== "-") {
        throw new Error("Illegal attachments");
      }
      p.attachments = Number(buf);
    }
    if ("/" === str.charAt(i2 + 1)) {
      const start = i2 + 1;
      while (++i2) {
        const c = str.charAt(i2);
        if ("," === c)
          break;
        if (i2 === str.length)
          break;
      }
      p.nsp = str.substring(start, i2);
    } else {
      p.nsp = "/";
    }
    const next = str.charAt(i2 + 1);
    if ("" !== next && Number(next) == next) {
      const start = i2 + 1;
      while (++i2) {
        const c = str.charAt(i2);
        if (null == c || Number(c) != c) {
          --i2;
          break;
        }
        if (i2 === str.length)
          break;
      }
      p.id = Number(str.substring(start, i2 + 1));
    }
    if (str.charAt(++i2)) {
      const payload = this.tryParse(str.substr(i2));
      if (_Decoder.isPayloadValid(p.type, payload)) {
        p.data = payload;
      } else {
        throw new Error("invalid payload");
      }
    }
    return p;
  }
  tryParse(str) {
    try {
      return JSON.parse(str, this.reviver);
    } catch (e) {
      return false;
    }
  }
  static isPayloadValid(type, payload) {
    switch (type) {
      case PacketType.CONNECT:
        return isObject(payload);
      case PacketType.DISCONNECT:
        return payload === void 0;
      case PacketType.CONNECT_ERROR:
        return typeof payload === "string" || isObject(payload);
      case PacketType.EVENT:
      case PacketType.BINARY_EVENT:
        return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS.indexOf(payload[0]) === -1);
      case PacketType.ACK:
      case PacketType.BINARY_ACK:
        return Array.isArray(payload);
    }
  }
  /**
   * Deallocates a parser's resources
   */
  destroy() {
    if (this.reconstructor) {
      this.reconstructor.finishedReconstruction();
      this.reconstructor = null;
    }
  }
};
var BinaryReconstructor = class {
  constructor(packet) {
    this.packet = packet;
    this.buffers = [];
    this.reconPack = packet;
  }
  /**
   * Method to be called when binary data received from connection
   * after a BINARY_EVENT packet.
   *
   * @param {Buffer | ArrayBuffer} binData - the raw binary data received
   * @return {null | Object} returns null if more binary data is expected or
   *   a reconstructed packet object if all buffers have been received.
   */
  takeBinaryData(binData) {
    this.buffers.push(binData);
    if (this.buffers.length === this.reconPack.attachments) {
      const packet = reconstructPacket(this.reconPack, this.buffers);
      this.finishedReconstruction();
      return packet;
    }
    return null;
  }
  /**
   * Cleans up binary packet reconstruction variables.
   */
  finishedReconstruction() {
    this.reconPack = null;
    this.buffers = [];
  }
};

// node_modules/socket.io-client/build/esm/on.js
function on(obj, ev, fn) {
  obj.on(ev, fn);
  return function subDestroy() {
    obj.off(ev, fn);
  };
}

// node_modules/socket.io-client/build/esm/socket.js
var RESERVED_EVENTS2 = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
  newListener: 1,
  removeListener: 1
});
var Socket2 = class extends Emitter {
  /**
   * `Socket` constructor.
   */
  constructor(io, nsp, opts) {
    super();
    this.connected = false;
    this.recovered = false;
    this.receiveBuffer = [];
    this.sendBuffer = [];
    this._queue = [];
    this._queueSeq = 0;
    this.ids = 0;
    this.acks = {};
    this.flags = {};
    this.io = io;
    this.nsp = nsp;
    if (opts && opts.auth) {
      this.auth = opts.auth;
    }
    this._opts = Object.assign({}, opts);
    if (this.io._autoConnect)
      this.open();
  }
  /**
   * Whether the socket is currently disconnected
   *
   * @example
   * const socket = io();
   *
   * socket.on("connect", () => {
   *   console.log(socket.disconnected); // false
   * });
   *
   * socket.on("disconnect", () => {
   *   console.log(socket.disconnected); // true
   * });
   */
  get disconnected() {
    return !this.connected;
  }
  /**
   * Subscribe to open, close and packet events
   *
   * @private
   */
  subEvents() {
    if (this.subs)
      return;
    const io = this.io;
    this.subs = [
      on(io, "open", this.onopen.bind(this)),
      on(io, "packet", this.onpacket.bind(this)),
      on(io, "error", this.onerror.bind(this)),
      on(io, "close", this.onclose.bind(this))
    ];
  }
  /**
   * Whether the Socket will try to reconnect when its Manager connects or reconnects.
   *
   * @example
   * const socket = io();
   *
   * console.log(socket.active); // true
   *
   * socket.on("disconnect", (reason) => {
   *   if (reason === "io server disconnect") {
   *     // the disconnection was initiated by the server, you need to manually reconnect
   *     console.log(socket.active); // false
   *   }
   *   // else the socket will automatically try to reconnect
   *   console.log(socket.active); // true
   * });
   */
  get active() {
    return !!this.subs;
  }
  /**
   * "Opens" the socket.
   *
   * @example
   * const socket = io({
   *   autoConnect: false
   * });
   *
   * socket.connect();
   */
  connect() {
    if (this.connected)
      return this;
    this.subEvents();
    if (!this.io["_reconnecting"])
      this.io.open();
    if ("open" === this.io._readyState)
      this.onopen();
    return this;
  }
  /**
   * Alias for {@link connect()}.
   */
  open() {
    return this.connect();
  }
  /**
   * Sends a `message` event.
   *
   * This method mimics the WebSocket.send() method.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
   *
   * @example
   * socket.send("hello");
   *
   * // this is equivalent to
   * socket.emit("message", "hello");
   *
   * @return self
   */
  send(...args) {
    args.unshift("message");
    this.emit.apply(this, args);
    return this;
  }
  /**
   * Override `emit`.
   * If the event is in `events`, it's emitted normally.
   *
   * @example
   * socket.emit("hello", "world");
   *
   * // all serializable datastructures are supported (no need to call JSON.stringify)
   * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
   *
   * // with an acknowledgement from the server
   * socket.emit("hello", "world", (val) => {
   *   // ...
   * });
   *
   * @return self
   */
  emit(ev, ...args) {
    if (RESERVED_EVENTS2.hasOwnProperty(ev)) {
      throw new Error('"' + ev.toString() + '" is a reserved event name');
    }
    args.unshift(ev);
    if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
      this._addToQueue(args);
      return this;
    }
    const packet = {
      type: PacketType.EVENT,
      data: args
    };
    packet.options = {};
    packet.options.compress = this.flags.compress !== false;
    if ("function" === typeof args[args.length - 1]) {
      const id = this.ids++;
      const ack = args.pop();
      this._registerAckCallback(id, ack);
      packet.id = id;
    }
    const isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
    const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
    if (discardPacket) {
    } else if (this.connected) {
      this.notifyOutgoingListeners(packet);
      this.packet(packet);
    } else {
      this.sendBuffer.push(packet);
    }
    this.flags = {};
    return this;
  }
  /**
   * @private
   */
  _registerAckCallback(id, ack) {
    var _a;
    const timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
    if (timeout === void 0) {
      this.acks[id] = ack;
      return;
    }
    const timer = this.io.setTimeoutFn(() => {
      delete this.acks[id];
      for (let i2 = 0; i2 < this.sendBuffer.length; i2++) {
        if (this.sendBuffer[i2].id === id) {
          this.sendBuffer.splice(i2, 1);
        }
      }
      ack.call(this, new Error("operation has timed out"));
    }, timeout);
    this.acks[id] = (...args) => {
      this.io.clearTimeoutFn(timer);
      ack.apply(this, [null, ...args]);
    };
  }
  /**
   * Emits an event and waits for an acknowledgement
   *
   * @example
   * // without timeout
   * const response = await socket.emitWithAck("hello", "world");
   *
   * // with a specific timeout
   * try {
   *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
   * } catch (err) {
   *   // the server did not acknowledge the event in the given delay
   * }
   *
   * @return a Promise that will be fulfilled when the server acknowledges the event
   */
  emitWithAck(ev, ...args) {
    const withErr = this.flags.timeout !== void 0 || this._opts.ackTimeout !== void 0;
    return new Promise((resolve, reject) => {
      args.push((arg1, arg2) => {
        if (withErr) {
          return arg1 ? reject(arg1) : resolve(arg2);
        } else {
          return resolve(arg1);
        }
      });
      this.emit(ev, ...args);
    });
  }
  /**
   * Add the packet to the queue.
   * @param args
   * @private
   */
  _addToQueue(args) {
    let ack;
    if (typeof args[args.length - 1] === "function") {
      ack = args.pop();
    }
    const packet = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: false,
      args,
      flags: Object.assign({ fromQueue: true }, this.flags)
    };
    args.push((err, ...responseArgs) => {
      if (packet !== this._queue[0]) {
        return;
      }
      const hasError = err !== null;
      if (hasError) {
        if (packet.tryCount > this._opts.retries) {
          this._queue.shift();
          if (ack) {
            ack(err);
          }
        }
      } else {
        this._queue.shift();
        if (ack) {
          ack(null, ...responseArgs);
        }
      }
      packet.pending = false;
      return this._drainQueue();
    });
    this._queue.push(packet);
    this._drainQueue();
  }
  /**
   * Send the first packet of the queue, and wait for an acknowledgement from the server.
   * @param force - whether to resend a packet that has not been acknowledged yet
   *
   * @private
   */
  _drainQueue(force = false) {
    if (!this.connected || this._queue.length === 0) {
      return;
    }
    const packet = this._queue[0];
    if (packet.pending && !force) {
      return;
    }
    packet.pending = true;
    packet.tryCount++;
    this.flags = packet.flags;
    this.emit.apply(this, packet.args);
  }
  /**
   * Sends a packet.
   *
   * @param packet
   * @private
   */
  packet(packet) {
    packet.nsp = this.nsp;
    this.io._packet(packet);
  }
  /**
   * Called upon engine `open`.
   *
   * @private
   */
  onopen() {
    if (typeof this.auth == "function") {
      this.auth((data) => {
        this._sendConnectPacket(data);
      });
    } else {
      this._sendConnectPacket(this.auth);
    }
  }
  /**
   * Sends a CONNECT packet to initiate the Socket.IO session.
   *
   * @param data
   * @private
   */
  _sendConnectPacket(data) {
    this.packet({
      type: PacketType.CONNECT,
      data: this._pid ? Object.assign({ pid: this._pid, offset: this._lastOffset }, data) : data
    });
  }
  /**
   * Called upon engine or manager `error`.
   *
   * @param err
   * @private
   */
  onerror(err) {
    if (!this.connected) {
      this.emitReserved("connect_error", err);
    }
  }
  /**
   * Called upon engine `close`.
   *
   * @param reason
   * @param description
   * @private
   */
  onclose(reason, description) {
    this.connected = false;
    delete this.id;
    this.emitReserved("disconnect", reason, description);
  }
  /**
   * Called with socket packet.
   *
   * @param packet
   * @private
   */
  onpacket(packet) {
    const sameNamespace = packet.nsp === this.nsp;
    if (!sameNamespace)
      return;
    switch (packet.type) {
      case PacketType.CONNECT:
        if (packet.data && packet.data.sid) {
          this.onconnect(packet.data.sid, packet.data.pid);
        } else {
          this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
        }
        break;
      case PacketType.EVENT:
      case PacketType.BINARY_EVENT:
        this.onevent(packet);
        break;
      case PacketType.ACK:
      case PacketType.BINARY_ACK:
        this.onack(packet);
        break;
      case PacketType.DISCONNECT:
        this.ondisconnect();
        break;
      case PacketType.CONNECT_ERROR:
        this.destroy();
        const err = new Error(packet.data.message);
        err.data = packet.data.data;
        this.emitReserved("connect_error", err);
        break;
    }
  }
  /**
   * Called upon a server event.
   *
   * @param packet
   * @private
   */
  onevent(packet) {
    const args = packet.data || [];
    if (null != packet.id) {
      args.push(this.ack(packet.id));
    }
    if (this.connected) {
      this.emitEvent(args);
    } else {
      this.receiveBuffer.push(Object.freeze(args));
    }
  }
  emitEvent(args) {
    if (this._anyListeners && this._anyListeners.length) {
      const listeners = this._anyListeners.slice();
      for (const listener of listeners) {
        listener.apply(this, args);
      }
    }
    super.emit.apply(this, args);
    if (this._pid && args.length && typeof args[args.length - 1] === "string") {
      this._lastOffset = args[args.length - 1];
    }
  }
  /**
   * Produces an ack callback to emit with an event.
   *
   * @private
   */
  ack(id) {
    const self2 = this;
    let sent = false;
    return function(...args) {
      if (sent)
        return;
      sent = true;
      self2.packet({
        type: PacketType.ACK,
        id,
        data: args
      });
    };
  }
  /**
   * Called upon a server acknowlegement.
   *
   * @param packet
   * @private
   */
  onack(packet) {
    const ack = this.acks[packet.id];
    if ("function" === typeof ack) {
      ack.apply(this, packet.data);
      delete this.acks[packet.id];
    } else {
    }
  }
  /**
   * Called upon server connect.
   *
   * @private
   */
  onconnect(id, pid) {
    this.id = id;
    this.recovered = pid && this._pid === pid;
    this._pid = pid;
    this.connected = true;
    this.emitBuffered();
    this.emitReserved("connect");
    this._drainQueue(true);
  }
  /**
   * Emit buffered events (received and emitted).
   *
   * @private
   */
  emitBuffered() {
    this.receiveBuffer.forEach((args) => this.emitEvent(args));
    this.receiveBuffer = [];
    this.sendBuffer.forEach((packet) => {
      this.notifyOutgoingListeners(packet);
      this.packet(packet);
    });
    this.sendBuffer = [];
  }
  /**
   * Called upon server disconnect.
   *
   * @private
   */
  ondisconnect() {
    this.destroy();
    this.onclose("io server disconnect");
  }
  /**
   * Called upon forced client/server side disconnections,
   * this method ensures the manager stops tracking us and
   * that reconnections don't get triggered for this.
   *
   * @private
   */
  destroy() {
    if (this.subs) {
      this.subs.forEach((subDestroy) => subDestroy());
      this.subs = void 0;
    }
    this.io["_destroy"](this);
  }
  /**
   * Disconnects the socket manually. In that case, the socket will not try to reconnect.
   *
   * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
   *
   * @example
   * const socket = io();
   *
   * socket.on("disconnect", (reason) => {
   *   // console.log(reason); prints "io client disconnect"
   * });
   *
   * socket.disconnect();
   *
   * @return self
   */
  disconnect() {
    if (this.connected) {
      this.packet({ type: PacketType.DISCONNECT });
    }
    this.destroy();
    if (this.connected) {
      this.onclose("io client disconnect");
    }
    return this;
  }
  /**
   * Alias for {@link disconnect()}.
   *
   * @return self
   */
  close() {
    return this.disconnect();
  }
  /**
   * Sets the compress flag.
   *
   * @example
   * socket.compress(false).emit("hello");
   *
   * @param compress - if `true`, compresses the sending data
   * @return self
   */
  compress(compress) {
    this.flags.compress = compress;
    return this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
   * ready to send messages.
   *
   * @example
   * socket.volatile.emit("hello"); // the server may or may not receive it
   *
   * @returns self
   */
  get volatile() {
    this.flags.volatile = true;
    return this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
   * given number of milliseconds have elapsed without an acknowledgement from the server:
   *
   * @example
   * socket.timeout(5000).emit("my-event", (err) => {
   *   if (err) {
   *     // the server did not acknowledge the event in the given delay
   *   }
   * });
   *
   * @returns self
   */
  timeout(timeout) {
    this.flags.timeout = timeout;
    return this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * @example
   * socket.onAny((event, ...args) => {
   *   console.log(`got ${event}`);
   * });
   *
   * @param listener
   */
  onAny(listener) {
    this._anyListeners = this._anyListeners || [];
    this._anyListeners.push(listener);
    return this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * @example
   * socket.prependAny((event, ...args) => {
   *   console.log(`got event ${event}`);
   * });
   *
   * @param listener
   */
  prependAny(listener) {
    this._anyListeners = this._anyListeners || [];
    this._anyListeners.unshift(listener);
    return this;
  }
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`got event ${event}`);
   * }
   *
   * socket.onAny(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAny(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAny();
   *
   * @param listener
   */
  offAny(listener) {
    if (!this._anyListeners) {
      return this;
    }
    if (listener) {
      const listeners = this._anyListeners;
      for (let i2 = 0; i2 < listeners.length; i2++) {
        if (listener === listeners[i2]) {
          listeners.splice(i2, 1);
          return this;
        }
      }
    } else {
      this._anyListeners = [];
    }
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAny() {
    return this._anyListeners || [];
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.onAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  onAnyOutgoing(listener) {
    this._anyOutgoingListeners = this._anyOutgoingListeners || [];
    this._anyOutgoingListeners.push(listener);
    return this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.prependAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  prependAnyOutgoing(listener) {
    this._anyOutgoingListeners = this._anyOutgoingListeners || [];
    this._anyOutgoingListeners.unshift(listener);
    return this;
  }
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`sent event ${event}`);
   * }
   *
   * socket.onAnyOutgoing(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAnyOutgoing(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAnyOutgoing();
   *
   * @param [listener] - the catch-all listener (optional)
   */
  offAnyOutgoing(listener) {
    if (!this._anyOutgoingListeners) {
      return this;
    }
    if (listener) {
      const listeners = this._anyOutgoingListeners;
      for (let i2 = 0; i2 < listeners.length; i2++) {
        if (listener === listeners[i2]) {
          listeners.splice(i2, 1);
          return this;
        }
      }
    } else {
      this._anyOutgoingListeners = [];
    }
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  /**
   * Notify the listeners for each packet sent
   *
   * @param packet
   *
   * @private
   */
  notifyOutgoingListeners(packet) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const listeners = this._anyOutgoingListeners.slice();
      for (const listener of listeners) {
        listener.apply(this, packet.data);
      }
    }
  }
};

// node_modules/socket.io-client/build/esm/contrib/backo2.js
function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 1e4;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}
Backoff.prototype.duration = function() {
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand = Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};
Backoff.prototype.reset = function() {
  this.attempts = 0;
};
Backoff.prototype.setMin = function(min) {
  this.ms = min;
};
Backoff.prototype.setMax = function(max) {
  this.max = max;
};
Backoff.prototype.setJitter = function(jitter) {
  this.jitter = jitter;
};

// node_modules/socket.io-client/build/esm/manager.js
var Manager = class extends Emitter {
  constructor(uri, opts) {
    var _a;
    super();
    this.nsps = {};
    this.subs = [];
    if (uri && "object" === typeof uri) {
      opts = uri;
      uri = void 0;
    }
    opts = opts || {};
    opts.path = opts.path || "/socket.io";
    this.opts = opts;
    installTimerFunctions(this, opts);
    this.reconnection(opts.reconnection !== false);
    this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
    this.reconnectionDelay(opts.reconnectionDelay || 1e3);
    this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
    this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
    this.backoff = new Backoff({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    });
    this.timeout(null == opts.timeout ? 2e4 : opts.timeout);
    this._readyState = "closed";
    this.uri = uri;
    const _parser = opts.parser || esm_exports;
    this.encoder = new _parser.Encoder();
    this.decoder = new _parser.Decoder();
    this._autoConnect = opts.autoConnect !== false;
    if (this._autoConnect)
      this.open();
  }
  reconnection(v) {
    if (!arguments.length)
      return this._reconnection;
    this._reconnection = !!v;
    return this;
  }
  reconnectionAttempts(v) {
    if (v === void 0)
      return this._reconnectionAttempts;
    this._reconnectionAttempts = v;
    return this;
  }
  reconnectionDelay(v) {
    var _a;
    if (v === void 0)
      return this._reconnectionDelay;
    this._reconnectionDelay = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
    return this;
  }
  randomizationFactor(v) {
    var _a;
    if (v === void 0)
      return this._randomizationFactor;
    this._randomizationFactor = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
    return this;
  }
  reconnectionDelayMax(v) {
    var _a;
    if (v === void 0)
      return this._reconnectionDelayMax;
    this._reconnectionDelayMax = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
    return this;
  }
  timeout(v) {
    if (!arguments.length)
      return this._timeout;
    this._timeout = v;
    return this;
  }
  /**
   * Starts trying to reconnect if reconnection is enabled and we have not
   * started reconnecting yet
   *
   * @private
   */
  maybeReconnectOnOpen() {
    if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
      this.reconnect();
    }
  }
  /**
   * Sets the current transport `socket`.
   *
   * @param {Function} fn - optional, callback
   * @return self
   * @public
   */
  open(fn) {
    if (~this._readyState.indexOf("open"))
      return this;
    this.engine = new Socket(this.uri, this.opts);
    const socket = this.engine;
    const self2 = this;
    this._readyState = "opening";
    this.skipReconnect = false;
    const openSubDestroy = on(socket, "open", function() {
      self2.onopen();
      fn && fn();
    });
    const onError = (err) => {
      this.cleanup();
      this._readyState = "closed";
      this.emitReserved("error", err);
      if (fn) {
        fn(err);
      } else {
        this.maybeReconnectOnOpen();
      }
    };
    const errorSub = on(socket, "error", onError);
    if (false !== this._timeout) {
      const timeout = this._timeout;
      const timer = this.setTimeoutFn(() => {
        openSubDestroy();
        onError(new Error("timeout"));
        socket.close();
      }, timeout);
      if (this.opts.autoUnref) {
        timer.unref();
      }
      this.subs.push(() => {
        this.clearTimeoutFn(timer);
      });
    }
    this.subs.push(openSubDestroy);
    this.subs.push(errorSub);
    return this;
  }
  /**
   * Alias for open()
   *
   * @return self
   * @public
   */
  connect(fn) {
    return this.open(fn);
  }
  /**
   * Called upon transport open.
   *
   * @private
   */
  onopen() {
    this.cleanup();
    this._readyState = "open";
    this.emitReserved("open");
    const socket = this.engine;
    this.subs.push(on(socket, "ping", this.onping.bind(this)), on(socket, "data", this.ondata.bind(this)), on(socket, "error", this.onerror.bind(this)), on(socket, "close", this.onclose.bind(this)), on(this.decoder, "decoded", this.ondecoded.bind(this)));
  }
  /**
   * Called upon a ping.
   *
   * @private
   */
  onping() {
    this.emitReserved("ping");
  }
  /**
   * Called with data.
   *
   * @private
   */
  ondata(data) {
    try {
      this.decoder.add(data);
    } catch (e) {
      this.onclose("parse error", e);
    }
  }
  /**
   * Called when parser fully decodes a packet.
   *
   * @private
   */
  ondecoded(packet) {
    nextTick(() => {
      this.emitReserved("packet", packet);
    }, this.setTimeoutFn);
  }
  /**
   * Called upon socket error.
   *
   * @private
   */
  onerror(err) {
    this.emitReserved("error", err);
  }
  /**
   * Creates a new socket for the given `nsp`.
   *
   * @return {Socket}
   * @public
   */
  socket(nsp, opts) {
    let socket = this.nsps[nsp];
    if (!socket) {
      socket = new Socket2(this, nsp, opts);
      this.nsps[nsp] = socket;
    } else if (this._autoConnect && !socket.active) {
      socket.connect();
    }
    return socket;
  }
  /**
   * Called upon a socket close.
   *
   * @param socket
   * @private
   */
  _destroy(socket) {
    const nsps = Object.keys(this.nsps);
    for (const nsp of nsps) {
      const socket2 = this.nsps[nsp];
      if (socket2.active) {
        return;
      }
    }
    this._close();
  }
  /**
   * Writes a packet.
   *
   * @param packet
   * @private
   */
  _packet(packet) {
    const encodedPackets = this.encoder.encode(packet);
    for (let i2 = 0; i2 < encodedPackets.length; i2++) {
      this.engine.write(encodedPackets[i2], packet.options);
    }
  }
  /**
   * Clean up transport subscriptions and packet buffer.
   *
   * @private
   */
  cleanup() {
    this.subs.forEach((subDestroy) => subDestroy());
    this.subs.length = 0;
    this.decoder.destroy();
  }
  /**
   * Close the current socket.
   *
   * @private
   */
  _close() {
    this.skipReconnect = true;
    this._reconnecting = false;
    this.onclose("forced close");
    if (this.engine)
      this.engine.close();
  }
  /**
   * Alias for close()
   *
   * @private
   */
  disconnect() {
    return this._close();
  }
  /**
   * Called upon engine close.
   *
   * @private
   */
  onclose(reason, description) {
    this.cleanup();
    this.backoff.reset();
    this._readyState = "closed";
    this.emitReserved("close", reason, description);
    if (this._reconnection && !this.skipReconnect) {
      this.reconnect();
    }
  }
  /**
   * Attempt a reconnection.
   *
   * @private
   */
  reconnect() {
    if (this._reconnecting || this.skipReconnect)
      return this;
    const self2 = this;
    if (this.backoff.attempts >= this._reconnectionAttempts) {
      this.backoff.reset();
      this.emitReserved("reconnect_failed");
      this._reconnecting = false;
    } else {
      const delay = this.backoff.duration();
      this._reconnecting = true;
      const timer = this.setTimeoutFn(() => {
        if (self2.skipReconnect)
          return;
        this.emitReserved("reconnect_attempt", self2.backoff.attempts);
        if (self2.skipReconnect)
          return;
        self2.open((err) => {
          if (err) {
            self2._reconnecting = false;
            self2.reconnect();
            this.emitReserved("reconnect_error", err);
          } else {
            self2.onreconnect();
          }
        });
      }, delay);
      if (this.opts.autoUnref) {
        timer.unref();
      }
      this.subs.push(() => {
        this.clearTimeoutFn(timer);
      });
    }
  }
  /**
   * Called upon successful reconnect.
   *
   * @private
   */
  onreconnect() {
    const attempt = this.backoff.attempts;
    this._reconnecting = false;
    this.backoff.reset();
    this.emitReserved("reconnect", attempt);
  }
};

// node_modules/socket.io-client/build/esm/index.js
var cache = {};
function lookup2(uri, opts) {
  if (typeof uri === "object") {
    opts = uri;
    uri = void 0;
  }
  opts = opts || {};
  const parsed = url(uri, opts.path || "/socket.io");
  const source = parsed.source;
  const id = parsed.id;
  const path = parsed.path;
  const sameNamespace = cache[id] && path in cache[id]["nsps"];
  const newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
  let io;
  if (newConnection) {
    io = new Manager(source, opts);
  } else {
    if (!cache[id]) {
      cache[id] = new Manager(source, opts);
    }
    io = cache[id];
  }
  if (parsed.query && !opts.query) {
    opts.query = parsed.queryKey;
  }
  return io.socket(parsed.path, opts);
}
Object.assign(lookup2, {
  Manager,
  Socket: Socket2,
  io: lookup2,
  connect: lookup2
});

// node_modules/@dj256/tuiomanager/src/core/TUIOObject.js
var TUIOObject = class {
  /**
   * TUIOObject constructor.
   *
   * @constructor
   * @param {string/number} id - TUIOObject's id.
   * @param {string/number} x - TUIOObject's abscissa.
   * @param {string/number} y - TUIOObject's ordinate.
   */
  constructor(id, x, y) {
    this._id = id;
    this._x = x;
    this._y = y;
    this._widgets = {};
  }
  /**
   * TUIOObject's id getter.
   *
   * @returns {string|number} TUIOObject's id.
   */
  get id() {
    return this._id;
  }
  /**
   * TUIOObject's abscissa getter.
   *
   * @returns {string|number} TUIOObject's abscissa.
   */
  get x() {
    return this._x;
  }
  /**
   * TUIOObject's ordinate getter.
   *
   * @returns {string|number} TUIOObject's ordinate.
   */
  get y() {
    return this._y;
  }
  /**
   * Add a TUIOWidget as observer of TUIOObject.
   *
   * @method addWidget
   * @param {TUIOWidget} widget - TUIOWidget instance to add as observer of TUIOObject.
   */
  addWidget(widget) {
    if (typeof this._widgets[widget.id] === "undefined") {
      if (Object.keys(this._widgets).length === 0) {
        this._widgets = {
          // ...this._widgets,
          [widget.id]: widget
        };
      } else if (this._widgets[Object.keys(this._widgets)[0]].zIndex < widget.zIndex) {
        this._widgets = {
          // ...this._widgets,
          [widget.id]: widget
        };
      }
    }
  }
  /**
   * Remove TUIOWidget in param from TUIOObject's observers.
   *
   * @method removeWidget
   * @param {TUIOWidget} widget - TUIOWidget instance to remove from TUIOObject's observers.
   */
  removeWidget(widget) {
    if (typeof this._widgets[widget.id] !== "undefined") {
      delete this._widgets[widget.id];
    }
  }
  /**
   * Notify all widgets/observers.
   *
   * @method notifyWidgets
   * @param {string} methodToCall - TUIOWidget method name to call.
   */
  notifyWidgets(methodToCall) {
    Object.keys(this._widgets).forEach((widgetId) => {
      const currentWidget = this._widgets[widgetId];
      currentWidget[methodToCall](this);
    });
  }
  /**
   * Update TUIOObject.
   *
   * @method update
   * @param {string/number} x - New TUIOObject's abscissa.
   * @param {string/number} y - New TUIOObject's ordinate.
   */
  update(x, y) {
    this._x = x;
    this._y = y;
  }
};

// node_modules/@dj256/tuiomanager/src/core/TUIOTouch.js
var TUIOTouch = class extends TUIOObject {
  /**
   * Update TUIOTouch.
   *
   * @method update
   * @param {string/number} x - New TUIOTouch's abscissa.
   * @param {string/number} y - New TUIOTouch's ordinate.
   */
  update(x, y) {
    super.update(x, y);
  }
};

// node_modules/@dj256/tuiomanager/src/core/TUIOTag.js
var TUIOTag = class extends TUIOObject {
  /**
   * TUIOTag constructor.
   *
   * @constructor
   * @param {string/number} id - TUIOTag's id.
   * @param {string/number} x - TUIOTag's abscissa.
   * @param {string/number} y - TUIOTag's ordinate.
   * @param {string/number} angle - TUIOTag's angle.
   */
  constructor(id, x, y, angle) {
    super(id, x, y);
    this._angle = angle;
  }
  /**
   * TUIOTag's angle getter.
   *
   * @returns {string|number} TUIOTag's angle.
   */
  get angle() {
    return this._angle;
  }
  /**
   * Update TUIOTag.
   *
   * @method update
   * @param {string/number} x - New TUIOTag's abscissa.
   * @param {string/number} y - New TUIOTag's ordinate.
   * @param {string/number} angle - New TUIOTag's angle.
   */
  update(x, y, angle) {
    super.update(x, y);
    this._angle = angle;
  }
};

// node_modules/@dj256/tuiomanager/src/core/constants.js
var CREATE_SOCKETIO_ACTION = "CREATE";
var UPDATE_SOCKETIO_ACTION = "UPDATE";
var DELETE_SOCKETIO_ACTION = "DELETE";
var TOUCH_SOCKETIO_TYPE = "TOUCH";
var TAG_SOCKETIO_TYPE = "TAG";

// node_modules/@dj256/tuiomanager/src/core/TUIOManager.js
var tuioManagerInstance = null;
var WINDOW_WIDTH;
var WINDOW_HEIGHT;
var updateWindowSize = (anchor) => {
  if (anchor) {
    WINDOW_WIDTH = anchor.clientWidth;
    WINDOW_HEIGHT = anchor.clientHeight;
  } else {
    WINDOW_WIDTH = window.innerWidth;
    WINDOW_HEIGHT = window.innerHeight;
  }
};
var TUIOManager = class _TUIOManager {
  /**
   * TUIOManager constructor.
   *
   * @constructor
   * @param {HTMLElement} anchor - The HTML element to use as anchor for the TUIOManager.
   */
  constructor(anchor = null) {
    if (tuioManagerInstance !== null) {
      return tuioManagerInstance;
    }
    updateWindowSize(anchor);
    window.addEventListener("resize", () => {
      updateWindowSize(anchor);
    });
    this._touches = {};
    this._tags = {};
    this._widgets = {};
    tuioManagerInstance = this;
    this._showInteractions = true;
    document.getElementsByTagName("head")[0].insertAdjacentHTML(
      "beforeend",
      `<style>
        .fadeout {
            animation: fadeout .3s forwards;
            opacity: 1;
        }

        @keyframes fadeout {
            0% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }
           </style>`
    );
    return tuioManagerInstance;
  }
  /**
   * @returns {boolean}
   */
  get showInteractions() {
    return this._showInteractions;
  }
  /**
   * @param {boolean} value
   */
  set showInteractions(value2) {
    this._showInteractions = value2;
  }
  /**
   * Init and start TUIOManager.
   *
   * @method getInstance
   * @static
   * @returns {TUIOManager} The TUIOManager instance.
   */
  static getInstance() {
    return new _TUIOManager();
  }
  /**
   * Add a TUIOWidget as observer of TUIOManager.
   *
   * @method addWidget
   * @param {TUIOWidget} widget - TUIOWidget instance to add as observer of TUIOManager.
   */
  addWidget(widget) {
    if (typeof this._widgets[widget.id] === "undefined") {
      this._widgets = {
        ...this._widgets,
        [widget.id]: widget
      };
    }
  }
  /**
   * Remove TUIOWidget in param from TUIOManager's observers.
   *
   * @method removeWidget
   * @param {TUIOWidget} widget - TUIOWidget instance to remove from TUIOManager's observers.
   */
  removeWidget(widget) {
    if (typeof this._widgets[widget.id] !== "undefined") {
      delete this._widgets[widget.id];
    }
  }
  /**
   * Notify all widgets/observers.
   *
   * @method notifyWidgets
   * @param {string} methodToCall - TUIOWidget method name to call.
   * @param {any} param - Param for method call.
   */
  notifyWidgets(methodToCall, param) {
    Object.keys(this._widgets).forEach((widgetId) => {
      const currentWidget = this._widgets[widgetId];
      currentWidget[methodToCall](param);
    });
  }
  /**
   * Init and start TUIOManager.
   *
   * @method start
   * @param {string} socketIOUrl - Socket IO Server's url. Default : 'http://localhost:9000/'
   */
  start(socketIOUrl = "http://localhost:9000/") {
    const socketIOClient = lookup2(socketIOUrl);
    socketIOClient.on(CREATE_SOCKETIO_ACTION, (data) => {
      this.handleCreate(data);
    });
    socketIOClient.on(UPDATE_SOCKETIO_ACTION, (data) => {
      this.handleUpdate(data);
    });
    socketIOClient.on(DELETE_SOCKETIO_ACTION, (data) => {
      this.handleDelete(data);
    });
  }
  /**
   * Handle CREATE Action from socket.
   *
   * @method handleCreate
   * @param {JSON} socketData - 'Create' data from TUIOClient.
   */
  handleCreate(socketData) {
    switch (socketData.type) {
      case TOUCH_SOCKETIO_TYPE: {
        this._touches[socketData.id] = new TUIOTouch(
          socketData.id,
          socketData.x * WINDOW_WIDTH,
          socketData.y * WINDOW_HEIGHT
        );
        this.notifyWidgets("_onTouchCreation", this._touches[socketData.id]);
        this._touches[socketData.id].update(
          socketData.x * WINDOW_WIDTH,
          socketData.y * WINDOW_HEIGHT
        );
        if (this._showInteractions)
          this._drawPointer(
            socketData.id,
            socketData.x * WINDOW_WIDTH,
            socketData.y * WINDOW_HEIGHT
          );
        break;
      }
      case TAG_SOCKETIO_TYPE: {
        this._tags[socketData.id] = new TUIOTag(
          socketData.id,
          socketData.x * WINDOW_WIDTH,
          socketData.y * WINDOW_HEIGHT,
          socketData.angle
        );
        this.notifyWidgets("_onTagCreation", this._tags[socketData.id]);
        this._tags[socketData.id].update(
          socketData.x * WINDOW_WIDTH,
          socketData.y * WINDOW_HEIGHT,
          socketData.angle
        );
        if (this._showInteractions)
          this._drawPointer(
            socketData.id,
            socketData.x * WINDOW_WIDTH,
            socketData.y * WINDOW_HEIGHT,
            "green"
          );
        break;
      }
      default:
        break;
    }
  }
  /**
   * Handle UPDATE Action from socket.
   *
   * @method handleUpdate
   * @param {JSON} socketData - 'Update' data from TUIOClient.
   */
  handleUpdate(socketData) {
    switch (socketData.type) {
      case TOUCH_SOCKETIO_TYPE: {
        if (typeof this._touches[socketData.id] !== "undefined") {
          this._touches[socketData.id].update(
            socketData.x * WINDOW_WIDTH,
            socketData.y * WINDOW_HEIGHT
          );
          this.notifyWidgets("_onTouchUpdate", this._touches[socketData.id]);
          if (this._showInteractions)
            this._updatePointer(
              socketData.id,
              socketData.x * WINDOW_WIDTH,
              socketData.y * WINDOW_HEIGHT
            );
        }
        break;
      }
      case TAG_SOCKETIO_TYPE: {
        if (typeof this._tags[socketData.id] !== "undefined") {
          this._tags[socketData.id].update(
            socketData.x * WINDOW_WIDTH,
            socketData.y * WINDOW_HEIGHT,
            socketData.angle
          );
          this.notifyWidgets("_onTagUpdate", this._tags[socketData.id]);
          if (this._showInteractions)
            this._updatePointer(
              socketData.id,
              socketData.x * WINDOW_WIDTH,
              socketData.y * WINDOW_HEIGHT
            );
        }
        break;
      }
      default:
        break;
    }
  }
  /**
   * Handle DELETE Action from socket.
   *
   * @method handleDelete
   * @param {JSON} socketData - 'Delete' data from TUIOClient.
   */
  handleDelete(socketData) {
    switch (socketData.type) {
      case TOUCH_SOCKETIO_TYPE: {
        if (typeof this._touches[socketData.id] !== "undefined") {
          this.notifyWidgets("_onTouchDeletion", socketData.id);
          if (this._showInteractions)
            this._removePointer(socketData.id);
          delete this._touches[socketData.id];
        }
        break;
      }
      case TAG_SOCKETIO_TYPE: {
        if (typeof this._tags[socketData.id] !== "undefined") {
          this.notifyWidgets("_onTagDeletion", socketData.id);
          if (this._showInteractions)
            this._removePointer(socketData.id);
          delete this._tags[socketData.id];
        }
        break;
      }
      default:
        break;
    }
  }
  /**
   * @param id of the Touch object
   * @param {number} x position left
   * @param {number} y position top
   * @param {string} color
   * @private
   */
  _drawPointer(id, x, y, color = "red") {
    document.getElementsByTagName("body")[0].insertAdjacentHTML(
      "beforeend",
      `<div id="${id}" style="z-index: 1000; background: ${color}; height: 25px; width: 25px; position: absolute; border-radius: 50%; left: ${x}px; top: ${y}px">div>`
    );
  }
  _updatePointer(id, x, y) {
    const elem = document.getElementById(id);
    if (elem) {
      elem.style.top = `${y}px`;
      elem.style.left = `${x}px`;
    }
  }
  _removePointer(id) {
    const elem = document.getElementById(id);
    if (elem) {
      elem.classList.add("fadeout");
      setTimeout(() => {
        elem.remove();
      }, 300);
    }
  }
};

// node_modules/@dj256/tuiomanager/src/core/TUIOWidget.js
var import_jquery = __toESM(require_jquery_min(), 1);
var import_v4 = __toESM(require_v4(), 1);
var TUIOWidget = class {
  /**
   * TUIOWidget constructor.
   *
   * @constructor
   * @param {number} x - TUIOWidget's upperleft corner abscissa.
   * @param {number} y - TUIOWidget's upperleft corner ordinate.
   * @param {number} width - TUIOWidget's width.
   * @param {number} height - TUIOWidget's height.
   */
  constructor(x, y, width, height) {
    this._id = (0, import_v4.default)();
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._touches = {};
    this._tags = {};
    this._callbacks = {
      onTouchCreation: [],
      onTagCreation: [],
      onTouchDeletion: [],
      onTagDeletion: [],
      onTouchUpdate: [],
      onTagUpdate: []
    };
    TUIOManager.getInstance().addWidget(this);
  }
  /**
   * TUIOWidget's id.
   *
   * @returns {string} TUIOWidget's id.
   */
  get id() {
    return this._id;
  }
  /**
   * TUIOWidget's DOM element.
   */
  get domElem() {
    return this._domElem;
  }
  /**
   * TUIOWidget's upperleft corner abscissa getter.
   *
   * @returns {number} TUIOWidget's upperleft corner abscissa.
   */
  get x() {
    return this._x;
  }
  /**
   * TUIOWidget's upperleft corner ordinate getter.
   *
   * @returns {number} TUIOWidget's upperleft corner ordinate.
   */
  get y() {
    return this._y;
  }
  /**
   * TUIOWidget's width.
   *
   * @returns {number} TUIOWidget's width.
   */
  get width() {
    return this._width;
  }
  /**
   * TUIOWidget's height.
   *
   * @returns {number} TUIOWidget's height.
   */
  get height() {
    return this._height;
  }
  /**
   * TUIOWidget's touches.
   *
   * @returns {Object} TUIOWidget's touches.
   */
  get touches() {
    return this._touches;
  }
  /**
   * TUIOWidget's tags.
   *
   * @returns {Object} TUIOWidget's tags.
   */
  get tags() {
    return this._tags;
  }
  /**
   * Check if TUIOWidget is touched.
   *
   * @method isTouched
   * @param {number} x - Point's abscissa to test.
   * @param {number} y - Point's ordinate to test.
   */
  isTouched(x, y) {
    return x >= this._x && x <= this._x + this._width && y >= this._y && y <= this._y + this._height;
  }
  /**
   * Called on touch creation on the widget.
   * @param {(touch: TUIOTouch) => any} callback - Callback to call on touch creation.
   */
  onTouchCreation(callback) {
    this._callbacks.onTouchCreation.push(callback);
  }
  /**
   * Call after a TUIOTouch creation.
   *
   * @protected @method _onTouchCreation
   * @param {TUIOTouch} tuioTouch - A TUIOTouch instance.
   */
  _onTouchCreation(tuioTouch) {
    if (!this.isTouched(tuioTouch.x, tuioTouch.y))
      return;
    this._touches = {
      ...this._touches,
      [tuioTouch.id]: tuioTouch
    };
    this._touches[tuioTouch.id].addWidget(this);
    this._callbacks.onTouchCreation.forEach((callback) => callback(tuioTouch));
  }
  /**
   * Called on tag creation on the widget.
   * @param {(tag: TUIOTag) => any} callback - Callback to call on tag creation.
   */
  onTagCreation(callback) {
    this._callbacks.onTagCreation.push(callback);
  }
  /**
   * Call after a TUIOTag creation.
   *
   * @protected @method _onTagCreation
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  _onTagCreation(tuioTag) {
    if (!this.isTouched(tuioTag.x, tuioTag.y))
      return;
    this._tags = {
      ...this._tags,
      [tuioTag.id]: tuioTag
    };
    this._tags[tuioTag.id].addWidget(this);
    this._callbacks.onTagCreation.forEach((callback) => callback(tuioTag));
  }
  /**
   * Called on touch deletion on the widget.
   * @param {(touchId: string) => any} callback - Callback to call on touch deletion.
   */
  onTouchDeletion(callback) {
    this._callbacks.onTouchDeletion.push(callback);
  }
  /**
   * Call after a TUIOTouch deletion.
   *
   * @protected @method _onTouchDeletion
   * @param {number/string} tuioTouchId - TUIOTouch's id to delete.
   */
  _onTouchDeletion(tuioTouchId) {
    if (typeof this._touches[tuioTouchId] !== "undefined") {
      delete this._touches[tuioTouchId];
      this._callbacks.onTouchDeletion.forEach(
        (callback) => callback(tuioTouchId)
      );
    }
  }
  /**
   * Called on tag deletion on the widget.
   * @param {(tagId: string) => any} callback - Callback to call on tag deletion.
   */
  onTagDeletion(callback) {
    this._callbacks.onTagDeletion.push(callback);
  }
  /**
   * Call after a TUIOTag deletion.
   *
   * @protected @method _onTagDeletion
   * @param {number/string} tuioTagId - TUIOTag's id to delete.
   */
  _onTagDeletion(tuioTagId) {
    if (typeof this._tags[tuioTagId] !== "undefined") {
      delete this._tags[tuioTagId];
      this._callbacks.onTagDeletion.forEach((callback) => callback(tuioTagId));
    }
  }
  /**
   * Called on touch update on the widget.
   * @param {(touch: TUIOTouch) => any} callback - Callback to call on touch update.
   */
  onTouchUpdate(callback) {
    this._callbacks.onTouchUpdate.push(callback);
  }
  /* eslint-disable no-unused-vars,class-methods-use-this */
  /**
   * Call after a TUIOTouch update.
   *
   * @protected @method _onTouchUpdate
   * @param {TUIOTouch} tuioTouch - A TUIOTouch instance.
   */
  _onTouchUpdate(tuioTouch) {
    this._callbacks.onTouchUpdate.forEach((callback) => callback(tuioTouch));
  }
  /**
   * Called on tag update on the widget.
   * @param {(tag: TUIOTag) => any} callback - Callback to call on tag update.
   */
  onTagUpdate(callback) {
    this._callbacks.onTagUpdate.push(callback);
  }
  /**
   * Call after a TUIOTag update.
   *
   * @protected @method _onTagUpdate
   * @param {TUIOTag} tuioTag - A TUIOTag instance.
   */
  _onTagUpdate(tuioTag) {
    this._callbacks.onTagUpdate.forEach((callback) => callback(tuioTag));
  }
  /**
   * Call to delete a widget
   *
   * @method deleteWidget
   */
  deleteWidget() {
    TUIOManager.getInstance().removeWidget(this);
  }
  /**
   * Call to add the widget to a DOM element
   *
   * @method addTo
   * @param {HTMLElement} element - A TUIOTag instance.
   */
  addTo(element) {
    (0, import_jquery.default)(element).append(this.domElem);
  }
  /* eslint-enable no-unused-vars,class-methods-use-this */
};

// node_modules/@dj256/tuiomanager/src/utils/Point.js
var Point = class {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }
  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  /**
   * get the distance to another Point
   *
   * @method distanceTo
   * @param {Point} p2 - A Point instance.
   */
  distanceTo(p2) {
    const a = this.x - p2.x;
    const b = this.y - p2.y;
    return Math.sqrt(a * a + b * b);
  }
  /**
   * get the angle of the vector with another Point
   *
   * @method angleWith
   * @param {Point} p2 - A Point instance.
   */
  angleWith(p2) {
    return Math.atan2(p2.y - this.y, p2.x - this.x) * (180 / Math.PI);
  }
  rotate(angleD, originX, originY) {
    const angle = angleD * Math.PI / 180;
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    this._x -= originX;
    this._y -= originY;
    const xnew = this.x * c - this.y * s;
    const ynew = this.x * s + this.y * c;
    this._x = xnew + originX;
    this._y = ynew + originY;
  }
};

export {
  TUIOObject,
  TUIOTouch,
  TUIOTag,
  TUIOManager,
  require_jquery_min,
  TUIOWidget,
  Point
};
/*! Bundled license information:

jquery/dist/jquery.min.js:
  (*! jQuery v3.5.0 | (c) JS Foundation and other contributors | jquery.org/license *)
*/
//# sourceMappingURL=chunk-7N7OB4OM.js.map
