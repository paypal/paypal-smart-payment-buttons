window["spb"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/belter/src/device.js
function getUserAgent() {
  return window.navigator.mockUserAgent || window.navigator.userAgent;
}
function isDevice(userAgent) {
  if (userAgent === void 0) {
    userAgent = getUserAgent();
  }

  if (userAgent.match(/Android|webOS|iPhone|iPad|iPod|bada|Symbian|Palm|CriOS|BlackBerry|IEMobile|WindowsMobile|Opera Mini/i)) {
    return true;
  }

  return false;
}
function isWebView() {
  var userAgent = getUserAgent();
  return /(iPhone|iPod|iPad|Macintosh).*AppleWebKit(?!.*Safari)/i.test(userAgent) || /\bwv\b/.test(userAgent) || /Android.*Version\/(\d)\.(\d)/i.test(userAgent);
}
function isStandAlone() {
  return window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches;
}
function isFacebookWebView(ua) {
  if (ua === void 0) {
    ua = getUserAgent();
  }

  return ua.indexOf('FBAN') !== -1 || ua.indexOf('FBAV') !== -1;
}
function isFirefoxIOS(ua) {
  if (ua === void 0) {
    ua = getUserAgent();
  }

  return /FxiOS/i.test(ua);
}
function isEdgeIOS(ua) {
  if (ua === void 0) {
    ua = getUserAgent();
  }

  return /EdgiOS/i.test(ua);
}
function isOperaMini(ua) {
  if (ua === void 0) {
    ua = getUserAgent();
  }

  return ua.indexOf('Opera Mini') > -1;
}
function isAndroid(ua) {
  if (ua === void 0) {
    ua = getUserAgent();
  }

  return /Android/.test(ua);
}
function isIos(ua) {
  if (ua === void 0) {
    ua = getUserAgent();
  }

  return /iPhone|iPod|iPad/.test(ua);
}
function isGoogleSearchApp(ua) {
  if (ua === void 0) {
    ua = getUserAgent();
  }

  return /\bGSA\b/.test(ua);
}
function isQQBrowser(ua) {
  if (ua === void 0) {
    ua = getUserAgent();
  }

  return /QQBrowser/.test(ua);
}
function isIosWebview(ua) {
  if (ua === void 0) {
    ua = getUserAgent();
  }

  if (isIos(ua)) {
    if (isGoogleSearchApp(ua)) {
      return true;
    }

    return /.+AppleWebKit(?!.*Safari)/.test(ua);
  }

  return false;
}
function isAndroidWebview(ua) {
  if (ua === void 0) {
    ua = getUserAgent();
  }

  if (isAndroid(ua)) {
    return /Version\/[\d.]+/.test(ua) && !isOperaMini(ua);
  }

  return false;
}
function device_isIE() {
  if (window.document.documentMode) {
    return true;
  }

  return Boolean(window.navigator && window.navigator.userAgent && /Edge|MSIE|rv:11/i.test(window.navigator.userAgent));
}
function isIECompHeader() {
  var mHttp = window.document.querySelector('meta[http-equiv="X-UA-Compatible"]');
  var mContent = window.document.querySelector('meta[content="IE=edge"]');

  if (mHttp && mContent) {
    return true;
  }

  return false;
}
function isElectron() {
  if (typeof process !== 'undefined' && process.versions && process.versions.electron) {
    return true;
  }

  return false;
}
function isIEIntranet() {
  // This status check only works for older versions of IE with document.documentMode set
  if (window.document.documentMode) {
    try {
      var status = window.status;
      window.status = 'testIntranetMode';

      if (window.status === 'testIntranetMode') {
        window.status = status;
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  }

  return false;
}
function isMacOsCna() {
  var userAgent = getUserAgent();
  return /Macintosh.*AppleWebKit(?!.*Safari)/i.test(userAgent);
}
function supportsPopups(ua) {
  if (ua === void 0) {
    ua = getUserAgent();
  }

  return !(isIosWebview(ua) || isAndroidWebview(ua) || isOperaMini(ua) || isFirefoxIOS(ua) || isEdgeIOS(ua) || isFacebookWebView(ua) || isQQBrowser(ua) || isElectron() || isMacOsCna() || isStandAlone());
}
function isChrome(ua) {
  if (ua === void 0) {
    ua = getUserAgent();
  }

  return /Chrome|Chromium|CriOS/.test(ua);
}
function isSafari(ua) {
  if (ua === void 0) {
    ua = getUserAgent();
  }

  return /Safari/.test(ua) && !isChrome(ua);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}
// CONCATENATED MODULE: ./node_modules/zalgo-promise/src/utils.js
function utils_isPromise(item) {
  try {
    if (!item) {
      return false;
    }

    if (typeof Promise !== 'undefined' && item instanceof Promise) {
      return true;
    }

    if (typeof window !== 'undefined' && typeof window.Window === 'function' && item instanceof window.Window) {
      return false;
    }

    if (typeof window !== 'undefined' && typeof window.constructor === 'function' && item instanceof window.constructor) {
      return false;
    }

    var _toString = {}.toString;

    if (_toString) {
      var name = _toString.call(item);

      if (name === '[object Window]' || name === '[object global]' || name === '[object DOMWindow]') {
        return false;
      }
    }

    if (typeof item.then === 'function') {
      return true;
    }
  } catch (err) {
    return false;
  }

  return false;
}
// CONCATENATED MODULE: ./node_modules/zalgo-promise/src/exceptions.js
var dispatchedErrors = [];
var possiblyUnhandledPromiseHandlers = [];
function dispatchPossiblyUnhandledError(err, promise) {
  if (dispatchedErrors.indexOf(err) !== -1) {
    return;
  }

  dispatchedErrors.push(err);
  setTimeout(function () {
    if (false) {}

    throw err;
  }, 1);

  for (var j = 0; j < possiblyUnhandledPromiseHandlers.length; j++) {
    // $FlowFixMe
    possiblyUnhandledPromiseHandlers[j](err, promise);
  }
}
function exceptions_onPossiblyUnhandledException(handler) {
  possiblyUnhandledPromiseHandlers.push(handler);
  return {
    cancel: function cancel() {
      possiblyUnhandledPromiseHandlers.splice(possiblyUnhandledPromiseHandlers.indexOf(handler), 1);
    }
  };
}
// CONCATENATED MODULE: ./node_modules/zalgo-promise/src/flush.js
var activeCount = 0;
var flushPromise;

function flushActive() {
  if (!activeCount && flushPromise) {
    var promise = flushPromise;
    flushPromise = null;
    promise.resolve();
  }
}

function startActive() {
  activeCount += 1;
}
function endActive() {
  activeCount -= 1;
  flushActive();
}
function awaitActive(Zalgo) {
  // eslint-disable-line no-undef
  var promise = flushPromise = flushPromise || new Zalgo();
  flushActive();
  return promise;
}
// CONCATENATED MODULE: ./node_modules/zalgo-promise/src/promise.js



var promise_ZalgoPromise =
/*#__PURE__*/
function () {
  function ZalgoPromise(handler) {
    var _this = this;

    this.resolved = void 0;
    this.rejected = void 0;
    this.errorHandled = void 0;
    this.value = void 0;
    this.error = void 0;
    this.handlers = void 0;
    this.dispatching = void 0;
    this.stack = void 0;
    this.resolved = false;
    this.rejected = false;
    this.errorHandled = false;
    this.handlers = [];

    if (handler) {
      var _result;

      var _error;

      var resolved = false;
      var rejected = false;
      var isAsync = false;
      startActive();

      try {
        handler(function (res) {
          if (isAsync) {
            _this.resolve(res);
          } else {
            resolved = true;
            _result = res;
          }
        }, function (err) {
          if (isAsync) {
            _this.reject(err);
          } else {
            rejected = true;
            _error = err;
          }
        });
      } catch (err) {
        endActive();
        this.reject(err);
        return;
      }

      endActive();
      isAsync = true;

      if (resolved) {
        // $FlowFixMe
        this.resolve(_result);
      } else if (rejected) {
        this.reject(_error);
      }
    }

    if (false) {}
  }

  var _proto = ZalgoPromise.prototype;

  _proto.resolve = function resolve(result) {
    if (this.resolved || this.rejected) {
      return this;
    }

    if (utils_isPromise(result)) {
      throw new Error('Can not resolve promise with another promise');
    }

    this.resolved = true;
    this.value = result;
    this.dispatch();
    return this;
  };

  _proto.reject = function reject(error) {
    var _this2 = this;

    if (this.resolved || this.rejected) {
      return this;
    }

    if (utils_isPromise(error)) {
      throw new Error('Can not reject promise with another promise');
    }

    if (!error) {
      // $FlowFixMe
      var _err = error && typeof error.toString === 'function' ? error.toString() : Object.prototype.toString.call(error);

      error = new Error("Expected reject to be called with Error, got " + _err);
    }

    this.rejected = true;
    this.error = error;

    if (!this.errorHandled) {
      setTimeout(function () {
        if (!_this2.errorHandled) {
          dispatchPossiblyUnhandledError(error, _this2);
        }
      }, 1);
    }

    this.dispatch();
    return this;
  };

  _proto.asyncReject = function asyncReject(error) {
    this.errorHandled = true;
    this.reject(error);
    return this;
  };

  _proto.dispatch = function dispatch() {
    var dispatching = this.dispatching,
        resolved = this.resolved,
        rejected = this.rejected,
        handlers = this.handlers;

    if (dispatching) {
      return;
    }

    if (!resolved && !rejected) {
      return;
    }

    this.dispatching = true;
    startActive();

    var chain = function chain(firstPromise, secondPromise) {
      return firstPromise.then(function (res) {
        secondPromise.resolve(res);
      }, function (err) {
        secondPromise.reject(err);
      });
    };

    for (var i = 0; i < handlers.length; i++) {
      var _handlers$i = handlers[i],
          onSuccess = _handlers$i.onSuccess,
          onError = _handlers$i.onError,
          promise = _handlers$i.promise;

      var _result2 = void 0;

      if (resolved) {
        try {
          _result2 = onSuccess ? onSuccess(this.value) : this.value;
        } catch (err) {
          promise.reject(err);
          continue;
        }
      } else if (rejected) {
        if (!onError) {
          promise.reject(this.error);
          continue;
        }

        try {
          _result2 = onError(this.error);
        } catch (err) {
          promise.reject(err);
          continue;
        }
      }

      if (_result2 instanceof ZalgoPromise && (_result2.resolved || _result2.rejected)) {
        if (_result2.resolved) {
          promise.resolve(_result2.value);
        } else {
          promise.reject(_result2.error);
        }

        _result2.errorHandled = true;
      } else if (utils_isPromise(_result2)) {
        if (_result2 instanceof ZalgoPromise && (_result2.resolved || _result2.rejected)) {
          if (_result2.resolved) {
            promise.resolve(_result2.value);
          } else {
            promise.reject(_result2.error);
          }
        } else {
          // $FlowFixMe
          chain(_result2, promise);
        }
      } else {
        promise.resolve(_result2);
      }
    }

    handlers.length = 0;
    this.dispatching = false;
    endActive();
  };

  _proto.then = function then(onSuccess, onError) {
    if (onSuccess && typeof onSuccess !== 'function' && !onSuccess.call) {
      throw new Error('Promise.then expected a function for success handler');
    }

    if (onError && typeof onError !== 'function' && !onError.call) {
      throw new Error('Promise.then expected a function for error handler');
    }

    var promise = new ZalgoPromise();
    this.handlers.push({
      promise: promise,
      onSuccess: onSuccess,
      onError: onError
    });
    this.errorHandled = true;
    this.dispatch();
    return promise;
  };

  _proto.catch = function _catch(onError) {
    return this.then(undefined, onError);
  };

  _proto.finally = function _finally(onFinally) {
    if (onFinally && typeof onFinally !== 'function' && !onFinally.call) {
      throw new Error('Promise.finally expected a function');
    }

    return this.then(function (result) {
      return ZalgoPromise.try(onFinally).then(function () {
        return result;
      });
    }, function (err) {
      return ZalgoPromise.try(onFinally).then(function () {
        throw err;
      });
    });
  };

  _proto.timeout = function timeout(time, err) {
    var _this3 = this;

    if (this.resolved || this.rejected) {
      return this;
    }

    var timeout = setTimeout(function () {
      if (_this3.resolved || _this3.rejected) {
        return;
      }

      _this3.reject(err || new Error("Promise timed out after " + time + "ms"));
    }, time);
    return this.then(function (result) {
      clearTimeout(timeout);
      return result;
    });
  } // $FlowFixMe
  ;

  _proto.toPromise = function toPromise() {
    // $FlowFixMe
    if (typeof Promise === 'undefined') {
      throw new TypeError("Could not find Promise");
    } // $FlowFixMe


    return Promise.resolve(this); // eslint-disable-line compat/compat
  };

  ZalgoPromise.resolve = function resolve(value) {
    if (value instanceof ZalgoPromise) {
      return value;
    }

    if (utils_isPromise(value)) {
      // $FlowFixMe
      return new ZalgoPromise(function (resolve, reject) {
        return value.then(resolve, reject);
      });
    }

    return new ZalgoPromise().resolve(value);
  };

  ZalgoPromise.reject = function reject(error) {
    return new ZalgoPromise().reject(error);
  };

  ZalgoPromise.asyncReject = function asyncReject(error) {
    return new ZalgoPromise().asyncReject(error);
  };

  ZalgoPromise.all = function all(promises) {
    // eslint-disable-line no-undef
    var promise = new ZalgoPromise();
    var count = promises.length;
    var results = [];

    if (!count) {
      promise.resolve(results);
      return promise;
    }

    var chain = function chain(i, firstPromise, secondPromise) {
      return firstPromise.then(function (res) {
        results[i] = res;
        count -= 1;

        if (count === 0) {
          promise.resolve(results);
        }
      }, function (err) {
        secondPromise.reject(err);
      });
    };

    for (var i = 0; i < promises.length; i++) {
      var prom = promises[i];

      if (prom instanceof ZalgoPromise) {
        if (prom.resolved) {
          results[i] = prom.value;
          count -= 1;
          continue;
        }
      } else if (!utils_isPromise(prom)) {
        results[i] = prom;
        count -= 1;
        continue;
      }

      chain(i, ZalgoPromise.resolve(prom), promise);
    }

    if (count === 0) {
      promise.resolve(results);
    }

    return promise;
  };

  ZalgoPromise.hash = function hash(promises) {
    // eslint-disable-line no-undef
    var result = {};
    return ZalgoPromise.all(Object.keys(promises).map(function (key) {
      return ZalgoPromise.resolve(promises[key]).then(function (value) {
        result[key] = value;
      });
    })).then(function () {
      return result;
    });
  };

  ZalgoPromise.map = function map(items, method) {
    // $FlowFixMe
    return ZalgoPromise.all(items.map(method));
  };

  ZalgoPromise.onPossiblyUnhandledException = function onPossiblyUnhandledException(handler) {
    return exceptions_onPossiblyUnhandledException(handler);
  };

  ZalgoPromise.try = function _try(method, context, args) {
    if (method && typeof method !== 'function' && !method.call) {
      throw new Error('Promise.try expected a function');
    }

    var result;
    startActive();

    try {
      // $FlowFixMe
      result = method.apply(context, args || []);
    } catch (err) {
      endActive();
      return ZalgoPromise.reject(err);
    }

    endActive();
    return ZalgoPromise.resolve(result);
  };

  ZalgoPromise.delay = function delay(_delay) {
    return new ZalgoPromise(function (resolve) {
      setTimeout(resolve, _delay);
    });
  };

  ZalgoPromise.isPromise = function isPromise(value) {
    if (value && value instanceof ZalgoPromise) {
      return true;
    }

    return utils_isPromise(value);
  };

  ZalgoPromise.flush = function flush() {
    return awaitActive(ZalgoPromise);
  };

  return ZalgoPromise;
}();
// CONCATENATED MODULE: ./node_modules/zalgo-promise/src/index.js

// CONCATENATED MODULE: ./node_modules/cross-domain-utils/src/util.js
function isRegex(item) {
  return Object.prototype.toString.call(item) === '[object RegExp]';
} // eslint-disable-next-line no-unused-vars

function noop() {// pass
}
// CONCATENATED MODULE: ./node_modules/cross-domain-utils/src/constants.js
var PROTOCOL = {
  MOCK: 'mock:',
  FILE: 'file:',
  ABOUT: 'about:'
};
var WILDCARD = '*';
var WINDOW_TYPE = {
  IFRAME: 'iframe',
  POPUP: 'popup'
};
// CONCATENATED MODULE: ./node_modules/cross-domain-utils/src/utils.js
/* eslint max-lines: 0 */


var IE_WIN_ACCESS_ERROR = 'Call was rejected by callee.\r\n';
function isFileProtocol(win) {
  if (win === void 0) {
    win = window;
  }

  return win.location.protocol === PROTOCOL.FILE;
}
function isAboutProtocol(win) {
  if (win === void 0) {
    win = window;
  }

  return win.location.protocol === PROTOCOL.ABOUT;
}
function utils_getParent(win) {
  if (win === void 0) {
    win = window;
  }

  if (!win) {
    return;
  }

  try {
    if (win.parent && win.parent !== win) {
      return win.parent;
    }
  } catch (err) {// pass
  }
}
function getOpener(win) {
  if (win === void 0) {
    win = window;
  }

  if (!win) {
    return;
  } // Make sure we're not actually an iframe which has had window.open() called on us


  if (utils_getParent(win)) {
    return;
  }

  try {
    return win.opener;
  } catch (err) {// pass
  }
}
function canReadFromWindow(win) {
  try {
    // $FlowFixMe
    noop(win && win.location && win.location.href);
    return true;
  } catch (err) {// pass
  }

  return false;
}
function getActualDomain(win) {
  if (win === void 0) {
    win = window;
  }

  var location = win.location;

  if (!location) {
    throw new Error("Can not read window location");
  }

  var protocol = location.protocol;

  if (!protocol) {
    throw new Error("Can not read window protocol");
  }

  if (protocol === PROTOCOL.FILE) {
    return PROTOCOL.FILE + "//";
  }

  if (protocol === PROTOCOL.ABOUT) {
    var parent = utils_getParent(win);

    if (parent && canReadFromWindow(parent)) {
      // $FlowFixMe
      return getActualDomain(parent);
    }

    return PROTOCOL.ABOUT + "//";
  }

  var host = location.host;

  if (!host) {
    throw new Error("Can not read window host");
  }

  return protocol + "//" + host;
}
function getDomain(win) {
  if (win === void 0) {
    win = window;
  }

  var domain = getActualDomain(win);

  if (domain && win.mockDomain && win.mockDomain.indexOf(PROTOCOL.MOCK) === 0) {
    return win.mockDomain;
  }

  return domain;
}
function isBlankDomain(win) {
  try {
    // $FlowFixMe
    if (!win.location.href) {
      return true;
    }

    if (win.location.href === 'about:blank') {
      return true;
    }
  } catch (err) {// pass
  }

  return false;
}
function isActuallySameDomain(win) {
  try {
    if (win === window) {
      return true;
    }
  } catch (err) {// pass
  }

  try {
    var desc = Object.getOwnPropertyDescriptor(win, 'location');

    if (desc && desc.enumerable === false) {
      return false;
    }
  } catch (err) {// pass
  }

  try {
    // $FlowFixMe
    if (isAboutProtocol(win) && canReadFromWindow(win)) {
      return true;
    }
  } catch (err) {// pass
  }

  try {
    // $FlowFixMe
    if (getActualDomain(win) === getActualDomain(window)) {
      return true;
    }
  } catch (err) {// pass
  }

  return false;
}
function isSameDomain(win) {
  if (!isActuallySameDomain(win)) {
    return false;
  }

  try {
    if (win === window) {
      return true;
    } // $FlowFixMe


    if (isAboutProtocol(win) && canReadFromWindow(win)) {
      return true;
    } // $FlowFixMe


    if (getDomain(window) === getDomain(win)) {
      return true;
    }
  } catch (err) {// pass
  }

  return false;
}
function assertSameDomain(win) {
  if (!isSameDomain(win)) {
    throw new Error("Expected window to be same domain");
  } // $FlowFixMe


  return win;
}
function getParents(win) {
  var result = [];

  try {
    while (win.parent !== win) {
      result.push(win.parent);
      win = win.parent;
    }
  } catch (err) {// pass
  }

  return result;
}
function isAncestorParent(parent, child) {
  if (!parent || !child) {
    return false;
  }

  var childParent = utils_getParent(child);

  if (childParent) {
    return childParent === parent;
  }

  if (getParents(child).indexOf(parent) !== -1) {
    return true;
  }

  return false;
}
function getFrames(win) {
  var result = [];
  var frames;

  try {
    frames = win.frames;
  } catch (err) {
    frames = win;
  }

  var len;

  try {
    len = frames.length;
  } catch (err) {// pass
  }

  if (len === 0) {
    return result;
  }

  if (len) {
    for (var i = 0; i < len; i++) {
      var frame = void 0;

      try {
        frame = frames[i];
      } catch (err) {
        continue;
      }

      result.push(frame);
    }

    return result;
  }

  for (var _i = 0; _i < 100; _i++) {
    var _frame = void 0;

    try {
      _frame = frames[_i];
    } catch (err) {
      return result;
    }

    if (!_frame) {
      return result;
    }

    result.push(_frame);
  }

  return result;
}
function getAllChildFrames(win) {
  var result = [];

  for (var _i3 = 0, _getFrames2 = getFrames(win); _i3 < _getFrames2.length; _i3++) {
    var frame = _getFrames2[_i3];
    result.push(frame);

    for (var _i5 = 0, _getAllChildFrames2 = getAllChildFrames(frame); _i5 < _getAllChildFrames2.length; _i5++) {
      var childFrame = _getAllChildFrames2[_i5];
      result.push(childFrame);
    }
  }

  return result;
}
function getTop(win) {
  if (win === void 0) {
    win = window;
  }

  try {
    if (win.top) {
      return win.top;
    }
  } catch (err) {// pass
  }

  if (utils_getParent(win) === win) {
    return win;
  }

  try {
    if (isAncestorParent(window, win) && window.top) {
      return window.top;
    }
  } catch (err) {// pass
  }

  try {
    if (isAncestorParent(win, window) && window.top) {
      return window.top;
    }
  } catch (err) {// pass
  }

  for (var _i7 = 0, _getAllChildFrames4 = getAllChildFrames(win); _i7 < _getAllChildFrames4.length; _i7++) {
    var frame = _getAllChildFrames4[_i7];

    try {
      if (frame.top) {
        return frame.top;
      }
    } catch (err) {// pass
    }

    if (utils_getParent(frame) === frame) {
      return frame;
    }
  }
}
function getNextOpener(win) {
  if (win === void 0) {
    win = window;
  }

  return getOpener(getTop(win) || win);
}
function getUltimateTop(win) {
  if (win === void 0) {
    win = window;
  }

  var opener = getNextOpener(win);

  if (opener) {
    return getUltimateTop(opener);
  }

  return top;
}
function getAllFramesInWindow(win) {
  var top = getTop(win);

  if (!top) {
    throw new Error("Can not determine top window");
  }

  return [].concat(getAllChildFrames(top), [top]);
}
function getAllWindows(win) {
  if (win === void 0) {
    win = window;
  }

  var frames = getAllFramesInWindow(win);
  var opener = getNextOpener(win);

  if (opener) {
    return [].concat(getAllWindows(opener), frames);
  } else {
    return frames;
  }
}
function isTop(win) {
  return win === getTop(win);
}
function isFrameWindowClosed(frame) {
  if (!frame.contentWindow) {
    return true;
  }

  if (!frame.parentNode) {
    return true;
  }

  var doc = frame.ownerDocument;

  if (doc && doc.documentElement && !doc.documentElement.contains(frame)) {
    return true;
  }

  return false;
}

function safeIndexOf(collection, item) {
  for (var i = 0; i < collection.length; i++) {
    try {
      if (collection[i] === item) {
        return i;
      }
    } catch (err) {// pass
    }
  }

  return -1;
}

var iframeWindows = [];
var iframeFrames = [];
function isWindowClosed(win, allowMock) {
  if (allowMock === void 0) {
    allowMock = true;
  }

  try {
    if (win === window) {
      return false;
    }
  } catch (err) {
    return true;
  }

  try {
    if (!win) {
      return true;
    }
  } catch (err) {
    return true;
  }

  try {
    if (win.closed) {
      return true;
    }
  } catch (err) {
    // I love you so much IE
    if (err && err.message === IE_WIN_ACCESS_ERROR) {
      return false;
    }

    return true;
  }

  if (allowMock && isSameDomain(win)) {
    try {
      // $FlowFixMe
      if (win.mockclosed) {
        return true;
      }
    } catch (err) {// pass
    }
  } // Mobile safari


  try {
    if (!win.parent || !win.top) {
      return true;
    }
  } catch (err) {} // pass
  // Yes, this actually happens in IE. win === win errors out when the window
  // is from an iframe, and the iframe was removed from the page.


  try {
    noop(win === win); // eslint-disable-line no-self-compare
  } catch (err) {
    return true;
  } // IE orphaned frame


  var iframeIndex = safeIndexOf(iframeWindows, win);

  if (iframeIndex !== -1) {
    var frame = iframeFrames[iframeIndex];

    if (frame && isFrameWindowClosed(frame)) {
      return true;
    }
  }

  return false;
}

function cleanIframes() {
  for (var i = 0; i < iframeWindows.length; i++) {
    var closed = false;

    try {
      closed = iframeWindows[i].closed;
    } catch (err) {// pass
    }

    if (closed) {
      iframeFrames.splice(i, 1);
      iframeWindows.splice(i, 1);
    }
  }
}

function linkFrameWindow(frame) {
  cleanIframes();

  if (frame && frame.contentWindow) {
    try {
      iframeWindows.push(frame.contentWindow);
      iframeFrames.push(frame);
    } catch (err) {// pass
    }
  }
}
function utils_getUserAgent(win) {
  win = win || window;
  return win.navigator.mockUserAgent || win.navigator.userAgent;
}
function getFrameByName(win, name) {
  var winFrames = getFrames(win);

  for (var _i9 = 0; _i9 < winFrames.length; _i9++) {
    var childFrame = winFrames[_i9];

    try {
      // $FlowFixMe
      if (isSameDomain(childFrame) && childFrame.name === name && winFrames.indexOf(childFrame) !== -1) {
        return childFrame;
      }
    } catch (err) {// pass
    }
  }

  try {
    // $FlowFixMe
    if (winFrames.indexOf(win.frames[name]) !== -1) {
      // $FlowFixMe
      return win.frames[name];
    }
  } catch (err) {// pass
  }

  try {
    if (winFrames.indexOf(win[name]) !== -1) {
      return win[name];
    }
  } catch (err) {// pass
  }
}
function findChildFrameByName(win, name) {
  var frame = getFrameByName(win, name);

  if (frame) {
    return frame;
  }

  for (var _i11 = 0, _getFrames4 = getFrames(win); _i11 < _getFrames4.length; _i11++) {
    var childFrame = _getFrames4[_i11];
    var namedFrame = findChildFrameByName(childFrame, name);

    if (namedFrame) {
      return namedFrame;
    }
  }
}
function findFrameByName(win, name) {
  var frame;
  frame = getFrameByName(win, name);

  if (frame) {
    return frame;
  }

  var top = getTop(win) || win;
  return findChildFrameByName(top, name);
}
function isParent(win, frame) {
  var frameParent = utils_getParent(frame);

  if (frameParent) {
    return frameParent === win;
  }

  for (var _i13 = 0, _getFrames6 = getFrames(win); _i13 < _getFrames6.length; _i13++) {
    var childFrame = _getFrames6[_i13];

    if (childFrame === frame) {
      return true;
    }
  }

  return false;
}
function isOpener(parent, child) {
  return parent === getOpener(child);
}
function getAncestor(win) {
  if (win === void 0) {
    win = window;
  }

  win = win || window;
  var opener = getOpener(win);

  if (opener) {
    return opener;
  }

  var parent = utils_getParent(win);

  if (parent) {
    return parent;
  }
}
function getAncestors(win) {
  var results = [];
  var ancestor = win;

  while (ancestor) {
    ancestor = getAncestor(ancestor);

    if (ancestor) {
      results.push(ancestor);
    }
  }

  return results;
}
function isAncestor(parent, child) {
  var actualParent = getAncestor(child);

  if (actualParent) {
    if (actualParent === parent) {
      return true;
    }

    return false;
  }

  if (child === parent) {
    return false;
  }

  if (getTop(child) === child) {
    return false;
  }

  for (var _i15 = 0, _getFrames8 = getFrames(parent); _i15 < _getFrames8.length; _i15++) {
    var frame = _getFrames8[_i15];

    if (frame === child) {
      return true;
    }
  }

  return false;
}
function isPopup(win) {
  if (win === void 0) {
    win = window;
  }

  return Boolean(getOpener(win));
}
function isIframe(win) {
  if (win === void 0) {
    win = window;
  }

  return Boolean(utils_getParent(win));
}
function isFullpage(win) {
  if (win === void 0) {
    win = window;
  }

  return Boolean(!isIframe(win) && !isPopup(win));
}

function anyMatch(collection1, collection2) {
  for (var _i17 = 0; _i17 < collection1.length; _i17++) {
    var item1 = collection1[_i17];

    for (var _i19 = 0; _i19 < collection2.length; _i19++) {
      var item2 = collection2[_i19];

      if (item1 === item2) {
        return true;
      }
    }
  }

  return false;
}

function getDistanceFromTop(win) {
  if (win === void 0) {
    win = window;
  }

  var distance = 0;
  var parent = win;

  while (parent) {
    parent = utils_getParent(parent);

    if (parent) {
      distance += 1;
    }
  }

  return distance;
}
function getNthParent(win, n) {
  if (n === void 0) {
    n = 1;
  }

  var parent = win;

  for (var i = 0; i < n; i++) {
    if (!parent) {
      return;
    }

    parent = utils_getParent(parent);
  }

  return parent;
}
function getNthParentFromTop(win, n) {
  if (n === void 0) {
    n = 1;
  }

  return getNthParent(win, getDistanceFromTop(win) - n);
}
function isSameTopWindow(win1, win2) {
  var top1 = getTop(win1) || win1;
  var top2 = getTop(win2) || win2;

  try {
    if (top1 && top2) {
      if (top1 === top2) {
        return true;
      }

      return false;
    }
  } catch (err) {// pass
  }

  var allFrames1 = getAllFramesInWindow(win1);
  var allFrames2 = getAllFramesInWindow(win2);

  if (anyMatch(allFrames1, allFrames2)) {
    return true;
  }

  var opener1 = getOpener(top1);
  var opener2 = getOpener(top2);

  if (opener1 && anyMatch(getAllFramesInWindow(opener1), allFrames2)) {
    return false;
  }

  if (opener2 && anyMatch(getAllFramesInWindow(opener2), allFrames1)) {
    return false;
  }

  return false;
}
function matchDomain(pattern, origin) {
  if (typeof pattern === 'string') {
    if (typeof origin === 'string') {
      return pattern === WILDCARD || origin === pattern;
    }

    if (isRegex(origin)) {
      return false;
    }

    if (Array.isArray(origin)) {
      return false;
    }
  }

  if (isRegex(pattern)) {
    if (isRegex(origin)) {
      return pattern.toString() === origin.toString();
    }

    if (Array.isArray(origin)) {
      return false;
    } // $FlowFixMe


    return Boolean(origin.match(pattern));
  }

  if (Array.isArray(pattern)) {
    if (Array.isArray(origin)) {
      return JSON.stringify(pattern) === JSON.stringify(origin);
    }

    if (isRegex(origin)) {
      return false;
    }

    return pattern.some(function (subpattern) {
      return matchDomain(subpattern, origin);
    });
  }

  return false;
}
function stringifyDomainPattern(pattern) {
  if (Array.isArray(pattern)) {
    return "(" + pattern.join(' | ') + ")";
  } else if (isRegex(pattern)) {
    return "RegExp(" + pattern.toString();
  } else {
    return pattern.toString();
  }
}
function getDomainFromUrl(url) {
  var domain;

  if (url.match(/^(https?|mock|file):\/\//)) {
    domain = url;
  } else {
    return getDomain();
  }

  domain = domain.split('/').slice(0, 3).join('/');
  return domain;
}
function onCloseWindow(win, callback, delay, maxtime) {
  if (delay === void 0) {
    delay = 1000;
  }

  if (maxtime === void 0) {
    maxtime = Infinity;
  }

  var timeout;

  var check = function check() {
    if (isWindowClosed(win)) {
      if (timeout) {
        clearTimeout(timeout);
      }

      return callback();
    }

    if (maxtime <= 0) {
      clearTimeout(timeout);
    } else {
      maxtime -= delay;
      timeout = setTimeout(check, delay);
    }
  };

  check();
  return {
    cancel: function cancel() {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  };
} // eslint-disable-next-line complexity

function isWindow(obj) {
  try {
    if (obj === window) {
      return true;
    }
  } catch (err) {
    if (err && err.message === IE_WIN_ACCESS_ERROR) {
      return true;
    }
  }

  try {
    if (Object.prototype.toString.call(obj) === '[object Window]') {
      return true;
    }
  } catch (err) {
    if (err && err.message === IE_WIN_ACCESS_ERROR) {
      return true;
    }
  }

  try {
    if (window.Window && obj instanceof window.Window) {
      return true;
    }
  } catch (err) {
    if (err && err.message === IE_WIN_ACCESS_ERROR) {
      return true;
    }
  }

  try {
    if (obj && obj.self === obj) {
      return true;
    }
  } catch (err) {
    if (err && err.message === IE_WIN_ACCESS_ERROR) {
      return true;
    }
  }

  try {
    if (obj && obj.parent === obj) {
      return true;
    }
  } catch (err) {
    if (err && err.message === IE_WIN_ACCESS_ERROR) {
      return true;
    }
  }

  try {
    if (obj && obj.top === obj) {
      return true;
    }
  } catch (err) {
    if (err && err.message === IE_WIN_ACCESS_ERROR) {
      return true;
    }
  }

  try {
    if (noop(obj === obj) === '__unlikely_value__') {
      // eslint-disable-line no-self-compare
      return false;
    }
  } catch (err) {
    return true;
  }

  try {
    if (obj && obj.__cross_domain_utils_window_check__ === '__unlikely_value__') {
      return false;
    }
  } catch (err) {
    return true;
  }

  return false;
}
function isBrowser() {
  return typeof window !== 'undefined' && typeof window.location !== 'undefined';
}
function isCurrentDomain(domain) {
  if (!isBrowser()) {
    return false;
  }

  return getDomain() === domain;
}
function isMockDomain(domain) {
  return domain.indexOf(PROTOCOL.MOCK) === 0;
}
function normalizeMockUrl(url) {
  if (!isMockDomain(getDomainFromUrl(url))) {
    return url;
  }

  if (true) {
    throw new Error("Mock urls not supported out of test mode");
  }

  return url.replace(/^mock:\/\/[^/]+/, getActualDomain(window));
}
function closeWindow(win) {
  try {
    win.close();
  } catch (err) {// pass
  }
}
function getFrameForWindow(win) {
  if (isSameDomain(win)) {
    return assertSameDomain(win).frameElement;
  }

  for (var _i21 = 0, _document$querySelect2 = document.querySelectorAll('iframe'); _i21 < _document$querySelect2.length; _i21++) {
    var frame = _document$querySelect2[_i21];

    if (frame && frame.contentWindow && frame.contentWindow === win) {
      return frame;
    }
  }
}
// CONCATENATED MODULE: ./node_modules/cross-domain-utils/src/types.js
// export something to force webpack to see this as an ES module
var TYPES = true;
// CONCATENATED MODULE: ./node_modules/cross-domain-utils/src/index.js



// CONCATENATED MODULE: ./node_modules/cross-domain-safe-weakmap/src/native.js
function hasNativeWeakMap() {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  if (typeof Object.freeze === 'undefined') {
    return false;
  }

  try {
    var testWeakMap = new WeakMap();
    var testKey = {};
    var testValue = '__testvalue__';
    Object.freeze(testKey);
    testWeakMap.set(testKey, testValue);

    if (testWeakMap.get(testKey) === testValue) {
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
}
// CONCATENATED MODULE: ./node_modules/cross-domain-safe-weakmap/src/util.js
function util_safeIndexOf(collection, item) {
  for (var i = 0; i < collection.length; i++) {
    try {
      if (collection[i] === item) {
        return i;
      }
    } catch (err) {// pass
    }
  }

  return -1;
} // eslint-disable-next-line no-unused-vars

function util_noop() {// pass
}
// CONCATENATED MODULE: ./node_modules/cross-domain-safe-weakmap/src/weakmap.js



var weakmap_CrossDomainSafeWeakMap =
/*#__PURE__*/
function () {
  function CrossDomainSafeWeakMap() {
    this.name = void 0;
    this.weakmap = void 0;
    this.keys = void 0;
    this.values = void 0;
    // eslint-disable-next-line no-bitwise
    this.name = "__weakmap_" + (Math.random() * 1e9 >>> 0) + "__";

    if (hasNativeWeakMap()) {
      try {
        this.weakmap = new WeakMap();
      } catch (err) {// pass
      }
    }

    this.keys = [];
    this.values = [];
  }

  var _proto = CrossDomainSafeWeakMap.prototype;

  _proto._cleanupClosedWindows = function _cleanupClosedWindows() {
    var weakmap = this.weakmap;
    var keys = this.keys;

    for (var i = 0; i < keys.length; i++) {
      var value = keys[i];

      if (isWindow(value) && isWindowClosed(value)) {
        if (weakmap) {
          try {
            weakmap.delete(value);
          } catch (err) {// pass
          }
        }

        keys.splice(i, 1);
        this.values.splice(i, 1);
        i -= 1;
      }
    }
  };

  _proto.isSafeToReadWrite = function isSafeToReadWrite(key) {
    if (isWindow(key)) {
      return false;
    }

    try {
      util_noop(key && key.self);
      util_noop(key && key[this.name]);
    } catch (err) {
      return false;
    }

    return true;
  };

  _proto.set = function set(key, value) {
    if (!key) {
      throw new Error("WeakMap expected key");
    }

    var weakmap = this.weakmap;

    if (weakmap) {
      try {
        weakmap.set(key, value);
      } catch (err) {
        delete this.weakmap;
      }
    }

    if (this.isSafeToReadWrite(key)) {
      try {
        var name = this.name;
        var entry = key[name];

        if (entry && entry[0] === key) {
          entry[1] = value;
        } else {
          Object.defineProperty(key, name, {
            value: [key, value],
            writable: true
          });
        }

        return;
      } catch (err) {// pass
      }
    }

    this._cleanupClosedWindows();

    var keys = this.keys;
    var values = this.values;
    var index = util_safeIndexOf(keys, key);

    if (index === -1) {
      keys.push(key);
      values.push(value);
    } else {
      values[index] = value;
    }
  };

  _proto.get = function get(key) {
    if (!key) {
      throw new Error("WeakMap expected key");
    }

    var weakmap = this.weakmap;

    if (weakmap) {
      try {
        if (weakmap.has(key)) {
          return weakmap.get(key);
        }
      } catch (err) {
        delete this.weakmap;
      }
    }

    if (this.isSafeToReadWrite(key)) {
      try {
        var entry = key[this.name];

        if (entry && entry[0] === key) {
          return entry[1];
        }

        return;
      } catch (err) {// pass
      }
    }

    this._cleanupClosedWindows();

    var keys = this.keys;
    var index = util_safeIndexOf(keys, key);

    if (index === -1) {
      return;
    }

    return this.values[index];
  };

  _proto.delete = function _delete(key) {
    if (!key) {
      throw new Error("WeakMap expected key");
    }

    var weakmap = this.weakmap;

    if (weakmap) {
      try {
        weakmap.delete(key);
      } catch (err) {
        delete this.weakmap;
      }
    }

    if (this.isSafeToReadWrite(key)) {
      try {
        var entry = key[this.name];

        if (entry && entry[0] === key) {
          entry[0] = entry[1] = undefined;
        }
      } catch (err) {// pass
      }
    }

    this._cleanupClosedWindows();

    var keys = this.keys;
    var index = util_safeIndexOf(keys, key);

    if (index !== -1) {
      keys.splice(index, 1);
      this.values.splice(index, 1);
    }
  };

  _proto.has = function has(key) {
    if (!key) {
      throw new Error("WeakMap expected key");
    }

    var weakmap = this.weakmap;

    if (weakmap) {
      try {
        if (weakmap.has(key)) {
          return true;
        }
      } catch (err) {
        delete this.weakmap;
      }
    }

    if (this.isSafeToReadWrite(key)) {
      try {
        var entry = key[this.name];

        if (entry && entry[0] === key) {
          return true;
        }

        return false;
      } catch (err) {// pass
      }
    }

    this._cleanupClosedWindows();

    var index = util_safeIndexOf(this.keys, key);
    return index !== -1;
  };

  _proto.getOrSet = function getOrSet(key, getter) {
    if (this.has(key)) {
      // $FlowFixMe
      return this.get(key);
    }

    var value = getter();
    this.set(key, value);
    return value;
  };

  return CrossDomainSafeWeakMap;
}();
// CONCATENATED MODULE: ./node_modules/cross-domain-safe-weakmap/src/index.js

// CONCATENATED MODULE: ./node_modules/belter/src/util.js
/* eslint max-lines: 0 */


function getFunctionName(fn) {
  return fn.name || fn.__name__ || fn.displayName || 'anonymous';
}
function setFunctionName(fn, name) {
  try {
    delete fn.name;
    fn.name = name;
  } catch (err) {// pass
  }

  fn.__name__ = fn.displayName = name;
  return fn;
}
function base64encode(str) {
  if (typeof btoa === 'function') {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (m, p1) {
      return String.fromCharCode(parseInt(p1, 16));
    }));
  }

  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'utf8').toString('base64');
  }

  throw new Error("Can not find window.btoa or Buffer");
}
function base64decode(str) {
  if (typeof atob === 'function') {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
      // eslint-disable-next-line prefer-template
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'base64').toString('utf8');
  }

  throw new Error("Can not find window.atob or Buffer");
}
function uniqueID() {
  var chars = '0123456789abcdef';
  var randomID = 'xxxxxxxxxx'.replace(/./g, function () {
    return chars.charAt(Math.floor(Math.random() * chars.length));
  });
  var timeID = base64encode(new Date().toISOString().slice(11, 19).replace('T', '.')).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return randomID + "_" + timeID;
}
function getGlobal() {
  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof global !== 'undefined') {
    return global;
  }

  throw new Error("No global found");
}
var objectIDs;
function getObjectID(obj) {
  objectIDs = objectIDs || new weakmap_CrossDomainSafeWeakMap();

  if (obj === null || obj === undefined || typeof obj !== 'object' && typeof obj !== 'function') {
    throw new Error("Invalid object");
  }

  var uid = objectIDs.get(obj);

  if (!uid) {
    uid = typeof obj + ":" + uniqueID();
    objectIDs.set(obj, uid);
  }

  return uid;
}

function serializeArgs(args) {
  try {
    return JSON.stringify(Array.prototype.slice.call(args), function (subkey, val) {
      if (typeof val === 'function') {
        return "memoize[" + getObjectID(val) + "]";
      }

      return val;
    });
  } catch (err) {
    throw new Error("Arguments not serializable -- can not be used to memoize");
  }
}

function memoize(method, options) {
  var _this = this;

  if (options === void 0) {
    options = {};
  }

  var cacheMap = new weakmap_CrossDomainSafeWeakMap(); // $FlowFixMe

  var memoizedFunction = function memoizedFunction() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var cache = cacheMap.getOrSet(options.thisNamespace ? this : method, function () {
      return {};
    });
    var key = serializeArgs(args);
    var cacheTime = options.time;

    if (cache[key] && cacheTime && Date.now() - cache[key].time < cacheTime) {
      delete cache[key];
    }

    if (cache[key]) {
      return cache[key].value;
    }

    var time = Date.now();
    var value = method.apply(this, arguments);
    cache[key] = {
      time: time,
      value: value
    };
    return cache[key].value;
  };

  memoizedFunction.reset = function () {
    cacheMap.delete(options.thisNamespace ? _this : method);
  };

  return setFunctionName(memoizedFunction, getFunctionName(method) + "::memoized");
}
function promiseIdentity(item) {
  // $FlowFixMe
  return promise_ZalgoPromise.resolve(item);
} // eslint-disable-next-line flowtype/no-weak-types

function memoizePromise(method) {
  var cache = {}; // eslint-disable-next-line flowtype/no-weak-types

  function memoizedPromiseFunction() {
    var _arguments = arguments,
        _this2 = this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var key = serializeArgs(args);

    if (cache.hasOwnProperty(key)) {
      return cache[key];
    }

    cache[key] = promise_ZalgoPromise.try(function () {
      return method.apply(_this2, _arguments);
    }).finally(function () {
      delete cache[key];
    });
    return cache[key];
  }

  memoizedPromiseFunction.reset = function () {
    cache = {};
  };

  return setFunctionName(memoizedPromiseFunction, getFunctionName(method) + "::promiseMemoized");
} // eslint-disable-next-line flowtype/no-weak-types

function promisify(method, options) {
  if (options === void 0) {
    options = {};
  }

  function promisifiedFunction() {
    return promise_ZalgoPromise.try(method, this, arguments);
  }

  if (options.name) {
    promisifiedFunction.displayName = options.name + ":promisified";
  }

  return setFunctionName(promisifiedFunction, getFunctionName(method) + "::promisified");
} // eslint-disable-next-line flowtype/no-weak-types

function inlineMemoize(method, logic, args) {
  if (args === void 0) {
    args = [];
  }

  // $FlowFixMe
  var cache = method.__inline_memoize_cache__ = method.__inline_memoize_cache__ || {};
  var key = serializeArgs(args);

  if (cache.hasOwnProperty(key)) {
    return cache[key];
  }

  var result = cache[key] = logic.apply(void 0, args);
  return result;
} // eslint-disable-next-line no-unused-vars

function src_util_noop() {// pass
}
function once(method) {
  var called = false;

  var onceFunction = function onceFunction() {
    if (!called) {
      called = true;
      return method.apply(this, arguments);
    }
  };

  return setFunctionName(onceFunction, getFunctionName(method) + "::once");
}
function hashStr(str) {
  var hash = 0;

  for (var i = 0; i < str.length; i++) {
    hash += str[i].charCodeAt(0) * Math.pow(i % 10 + 1, 5);
  }

  return Math.floor(Math.pow(Math.sqrt(hash), 5));
}
function strHashStr(str) {
  var hash = '';

  for (var i = 0; i < str.length; i++) {
    var total = str[i].charCodeAt(0) * i;

    if (str[i + 1]) {
      total += str[i + 1].charCodeAt(0) * (i - 1);
    }

    hash += String.fromCharCode(97 + Math.abs(total) % 26);
  }

  return hash;
}
function match(str, pattern) {
  var regmatch = str.match(pattern);

  if (regmatch) {
    return regmatch[1];
  }
}
function awaitKey(obj, key) {
  return new promise_ZalgoPromise(function (resolve) {
    var value = obj[key];

    if (value) {
      return resolve(value);
    }

    delete obj[key];
    Object.defineProperty(obj, key, {
      configurable: true,
      set: function set(item) {
        value = item;

        if (value) {
          resolve(value);
        }
      },
      get: function get() {
        return value;
      }
    });
  });
}
function stringifyError(err, level) {
  if (level === void 0) {
    level = 1;
  }

  if (level >= 3) {
    return 'stringifyError stack overflow';
  }

  try {
    if (!err) {
      return "<unknown error: " + Object.prototype.toString.call(err) + ">";
    }

    if (typeof err === 'string') {
      return err;
    }

    if (err instanceof Error) {
      var stack = err && err.stack;
      var message = err && err.message;

      if (stack && message) {
        if (stack.indexOf(message) !== -1) {
          return stack;
        } else {
          return message + "\n" + stack;
        }
      } else if (stack) {
        return stack;
      } else if (message) {
        return message;
      }
    }

    if (err && err.toString && typeof err.toString === 'function') {
      // $FlowFixMe
      return err.toString();
    }

    return Object.prototype.toString.call(err);
  } catch (newErr) {
    // eslint-disable-line unicorn/catch-error-name
    return "Error while stringifying error: " + stringifyError(newErr, level + 1);
  }
}
function stringifyErrorMessage(err) {
  var defaultMessage = "<unknown error: " + Object.prototype.toString.call(err) + ">";

  if (!err) {
    return defaultMessage;
  }

  if (err instanceof Error) {
    return err.message || defaultMessage;
  }

  if (typeof err.message === 'string') {
    return err.message || defaultMessage;
  }

  return defaultMessage;
}
function stringify(item) {
  if (typeof item === 'string') {
    return item;
  }

  if (item && item.toString && typeof item.toString === 'function') {
    // $FlowFixMe
    return item.toString();
  }

  return Object.prototype.toString.call(item);
}
function domainMatches(hostname, domain) {
  hostname = hostname.split('://')[1];
  var index = hostname.indexOf(domain);
  return index !== -1 && hostname.slice(index) === domain;
}
function patchMethod(obj, name, handler) {
  var original = obj[name];

  obj[name] = function patchedMethod() {
    var _arguments2 = arguments,
        _this3 = this;

    return handler({
      context: this,
      args: Array.prototype.slice.call(arguments),
      original: original,
      callOriginal: function callOriginal() {
        return original.apply(_this3, _arguments2);
      }
    });
  };
}
function extend(obj, source) {
  if (!source) {
    return obj;
  }

  if (Object.assign) {
    return Object.assign(obj, source);
  }

  for (var key in source) {
    if (source.hasOwnProperty(key)) {
      obj[key] = source[key];
    }
  }

  return obj;
}
function util_values(obj) {
  var result = [];

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      result.push(obj[key]);
    }
  }

  return result;
}
function perc(pixels, percentage) {
  return Math.round(pixels * percentage / 100);
}
function min() {
  return Math.min.apply(Math, arguments);
}
function max() {
  return Math.max.apply(Math, arguments);
}
function regexMap(str, regexp, handler) {
  var results = []; // $FlowFixMe

  str.replace(regexp, function regexMapMatcher(item) {
    results.push(handler ? handler.apply(null, arguments) : item);
  }); // $FlowFixMe

  return results;
}
function svgToBase64(svg) {
  return "data:image/svg+xml;base64," + base64encode(svg);
}
function objFilter(obj, filter) {
  if (filter === void 0) {
    filter = Boolean;
  }

  var result = {};

  for (var key in obj) {
    if (!obj.hasOwnProperty(key) || !filter(obj[key], key)) {
      continue;
    }

    result[key] = obj[key];
  }

  return result;
}
function identity(item) {
  return item;
}
function regexTokenize(text, regexp) {
  var result = [];
  text.replace(regexp, function (token) {
    result.push(token);
    return '';
  });
  return result;
}
function promiseDebounce(method, delay) {
  if (delay === void 0) {
    delay = 50;
  }

  var promise;
  var timeout;

  var promiseDebounced = function promiseDebounced() {
    if (timeout) {
      clearTimeout(timeout);
    }

    var localPromise = promise = promise || new promise_ZalgoPromise();
    timeout = setTimeout(function () {
      promise = null;
      timeout = null;
      promise_ZalgoPromise.try(method).then(function (result) {
        localPromise.resolve(result);
      }, function (err) {
        localPromise.reject(err);
      });
    }, delay);
    return localPromise;
  };

  return setFunctionName(promiseDebounced, getFunctionName(method) + "::promiseDebounced");
}
function safeInterval(method, time) {
  var timeout;

  function loop() {
    timeout = setTimeout(function () {
      method();
      loop();
    }, time);
  }

  loop();
  return {
    cancel: function cancel() {
      clearTimeout(timeout);
    }
  };
}
function isInteger(str) {
  return Boolean(str.match(/^[0-9]+$/));
}
function isFloat(str) {
  return Boolean(str.match(/^[0-9]+\.[0-9]+$/));
}
function serializePrimitive(value) {
  return value.toString();
}
function deserializePrimitive(value) {
  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  } else if (isInteger(value)) {
    return parseInt(value, 10);
  } else if (isFloat(value)) {
    return parseFloat(value);
  } else {
    return value;
  }
}
function dotify(obj, prefix, newobj) {
  if (prefix === void 0) {
    prefix = '';
  }

  if (newobj === void 0) {
    newobj = {};
  }

  prefix = prefix ? prefix + "." : prefix;

  for (var key in obj) {
    if (!obj.hasOwnProperty(key) || obj[key] === undefined || obj[key] === null || typeof obj[key] === 'function') {
      continue;
    } else if (obj[key] && Array.isArray(obj[key]) && obj[key].length && obj[key].every(function (val) {
      return typeof val !== 'object';
    })) {
      newobj["" + prefix + key + "[]"] = obj[key].join(',');
    } else if (obj[key] && typeof obj[key] === 'object') {
      newobj = dotify(obj[key], "" + prefix + key, newobj);
    } else {
      newobj["" + prefix + key] = serializePrimitive(obj[key]);
    }
  }

  return newobj;
}
function undotify(obj) {
  var result = {};

  for (var key in obj) {
    if (!obj.hasOwnProperty(key) || typeof obj[key] !== 'string') {
      continue;
    }

    var value = obj[key];

    if (key.match(/^.+\[\]$/)) {
      key = key.slice(0, key.length - 2);
      value = value.split(',').map(deserializePrimitive);
    } else {
      value = deserializePrimitive(value);
    }

    var keyResult = result;
    var parts = key.split('.');

    for (var i = 0; i < parts.length; i++) {
      var part = parts[i];
      var isLast = i + 1 === parts.length;
      var isIndex = !isLast && isInteger(parts[i + 1]);

      if (part === 'constructor' || part === 'prototype' || part === '__proto__') {
        throw new Error("Disallowed key: " + part);
      }

      if (isLast) {
        // $FlowFixMe
        keyResult[part] = value;
      } else {
        // $FlowFixMe
        keyResult = keyResult[part] = keyResult[part] || (isIndex ? [] : {});
      }
    }
  }

  return result;
}
function eventEmitter() {
  var triggered = {};
  var handlers = {};
  return {
    on: function on(eventName, handler) {
      var handlerList = handlers[eventName] = handlers[eventName] || [];
      handlerList.push(handler);
      var cancelled = false;
      return {
        cancel: function cancel() {
          if (!cancelled) {
            cancelled = true;
            handlerList.splice(handlerList.indexOf(handler), 1);
          }
        }
      };
    },
    once: function once(eventName, handler) {
      var listener = this.on(eventName, function () {
        listener.cancel();
        handler();
      });
      return listener;
    },
    trigger: function trigger(eventName) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      var handlerList = handlers[eventName];
      var promises = [];

      if (handlerList) {
        var _loop = function _loop(_i2) {
          var handler = handlerList[_i2];
          promises.push(promise_ZalgoPromise.try(function () {
            return handler.apply(void 0, args);
          }));
        };

        for (var _i2 = 0; _i2 < handlerList.length; _i2++) {
          _loop(_i2);
        }
      }

      return promise_ZalgoPromise.all(promises).then(src_util_noop);
    },
    triggerOnce: function triggerOnce(eventName) {
      if (triggered[eventName]) {
        return promise_ZalgoPromise.resolve();
      }

      triggered[eventName] = true;

      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      return this.trigger.apply(this, [eventName].concat(args));
    },
    reset: function reset() {
      handlers = {};
    }
  };
}
function camelToDasherize(string) {
  return string.replace(/([A-Z])/g, function (g) {
    return "-" + g.toLowerCase();
  });
}
function dasherizeToCamel(string) {
  return string.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
function util_get(item, path, def) {
  if (!path) {
    return def;
  }

  var pathParts = path.split('.'); // Loop through each section of our key path

  for (var i = 0; i < pathParts.length; i++) {
    // If we have an object, we can get the key
    if (typeof item === 'object' && item !== null) {
      item = item[pathParts[i]]; // Otherwise, we should return the default (undefined if not provided)
    } else {
      return def;
    }
  } // If our final result is undefined, we should return the default


  return item === undefined ? def : item;
}
function safeTimeout(method, time) {
  var interval = safeInterval(function () {
    time -= 100;

    if (time <= 0) {
      interval.cancel();
      method();
    }
  }, 100);
}
function defineLazyProp(obj, key, getter) {
  if (Array.isArray(obj)) {
    if (typeof key !== 'number') {
      throw new TypeError("Array key must be number");
    }
  } else if (typeof obj === 'object' && obj !== null) {
    if (typeof key !== 'string') {
      throw new TypeError("Object key must be string");
    }
  }

  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get: function get() {
      // $FlowFixMe
      delete obj[key];
      var value = getter(); // $FlowFixMe

      obj[key] = value;
      return value;
    },
    set: function set(value) {
      // $FlowFixMe
      delete obj[key]; // $FlowFixMe

      obj[key] = value;
    }
  });
}
function arrayFrom(item) {
  // eslint-disable-line no-undef
  return Array.prototype.slice.call(item);
}
function isObject(item) {
  return typeof item === 'object' && item !== null;
}
function isObjectObject(obj) {
  return isObject(obj) && Object.prototype.toString.call(obj) === '[object Object]';
}
function isPlainObject(obj) {
  if (!isObjectObject(obj)) {
    return false;
  } // $FlowFixMe


  var constructor = obj.constructor;

  if (typeof constructor !== 'function') {
    return false;
  }

  var prototype = constructor.prototype;

  if (!isObjectObject(prototype)) {
    return false;
  }

  if (!prototype.hasOwnProperty('isPrototypeOf')) {
    return false;
  }

  return true;
}
function replaceObject(item, replacer, fullKey) {
  if (fullKey === void 0) {
    fullKey = '';
  }

  if (Array.isArray(item)) {
    var length = item.length;
    var result = [];

    var _loop2 = function _loop2(i) {
      defineLazyProp(result, i, function () {
        var itemKey = fullKey ? fullKey + "." + i : "" + i;
        var el = item[i];
        var child = replacer(el, i, itemKey);

        if (isPlainObject(child) || Array.isArray(child)) {
          // $FlowFixMe
          child = replaceObject(child, replacer, itemKey);
        }

        return child;
      });
    };

    for (var i = 0; i < length; i++) {
      _loop2(i);
    } // $FlowFixMe


    return result;
  } else if (isPlainObject(item)) {
    var _result = {};

    var _loop3 = function _loop3(key) {
      if (!item.hasOwnProperty(key)) {
        return "continue";
      }

      defineLazyProp(_result, key, function () {
        var itemKey = fullKey ? fullKey + "." + key : "" + key; // $FlowFixMe

        var el = item[key];
        var child = replacer(el, key, itemKey);

        if (isPlainObject(child) || Array.isArray(child)) {
          // $FlowFixMe
          child = replaceObject(child, replacer, itemKey);
        }

        return child;
      });
    };

    for (var key in item) {
      var _ret = _loop3(key);

      if (_ret === "continue") continue;
    } // $FlowFixMe


    return _result;
  } else {
    throw new Error("Pass an object or array");
  }
}
function copyProp(source, target, name, def) {
  if (source.hasOwnProperty(name)) {
    var descriptor = Object.getOwnPropertyDescriptor(source, name); // $FlowFixMe

    Object.defineProperty(target, name, descriptor);
  } else {
    target[name] = def;
  }
}
function regex(pattern, string, start) {
  if (start === void 0) {
    start = 0;
  }

  if (typeof pattern === 'string') {
    // eslint-disable-next-line security/detect-non-literal-regexp
    pattern = new RegExp(pattern);
  }

  var result = string.slice(start).match(pattern);

  if (!result) {
    return;
  } // $FlowFixMe


  var index = result.index;
  var regmatch = result[0];
  return {
    text: regmatch,
    groups: result.slice(1),
    start: start + index,
    end: start + index + regmatch.length,
    length: regmatch.length,
    replace: function replace(text) {
      if (!regmatch) {
        return '';
      }

      return "" + regmatch.slice(0, start + index) + text + regmatch.slice(index + regmatch.length);
    }
  };
}
function regexAll(pattern, string) {
  var matches = [];
  var start = 0; // eslint-disable-next-line no-constant-condition

  while (true) {
    var regmatch = regex(pattern, string, start);

    if (!regmatch) {
      break;
    }

    matches.push(regmatch);
    start = match.end;
  }

  return matches;
}
function isDefined(value) {
  return value !== null && value !== undefined;
}
function cycle(method) {
  return promise_ZalgoPromise.try(method).then(function () {
    return cycle(method);
  });
}
function debounce(method, time) {
  if (time === void 0) {
    time = 100;
  }

  var timeout;

  var debounceWrapper = function debounceWrapper() {
    var _arguments3 = arguments,
        _this4 = this;

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      return method.apply(_this4, _arguments3);
    }, time);
  };

  return setFunctionName(debounceWrapper, getFunctionName(method) + "::debounced");
}
function util_isRegex(item) {
  return Object.prototype.toString.call(item) === '[object RegExp]';
}
// eslint-disable-next-line flowtype/no-weak-types
var util_weakMapMemoize = function weakMapMemoize(method) {
  var weakmap = new weakmap_CrossDomainSafeWeakMap(); // eslint-disable-next-line flowtype/no-weak-types

  return function weakmapMemoized(arg) {
    var _this5 = this;

    return weakmap.getOrSet(arg, function () {
      return method.call(_this5, arg);
    });
  };
};
// eslint-disable-next-line flowtype/no-weak-types
var util_weakMapMemoizePromise = function weakMapMemoizePromise(method) {
  var weakmap = new weakmap_CrossDomainSafeWeakMap(); // eslint-disable-next-line flowtype/no-weak-types

  return function weakmapMemoizedPromise(arg) {
    var _this6 = this;

    return weakmap.getOrSet(arg, function () {
      return method.call(_this6, arg).finally(function () {
        weakmap.delete(arg);
      });
    });
  };
};
function getOrSet(obj, key, getter) {
  if (obj.hasOwnProperty(key)) {
    return obj[key];
  }

  var val = getter();
  obj[key] = val;
  return val;
}
function cleanup(obj) {
  var tasks = [];
  var cleaned = false;
  return {
    set: function set(name, item) {
      if (!cleaned) {
        obj[name] = item;
        this.register(function () {
          delete obj[name];
        });
      }

      return item;
    },
    register: function register(method) {
      if (cleaned) {
        method();
      } else {
        tasks.push(once(method));
      }
    },
    all: function all() {
      var results = [];
      cleaned = true;

      while (tasks.length) {
        var task = tasks.pop();
        results.push(task());
      }

      return promise_ZalgoPromise.all(results).then(src_util_noop);
    }
  };
}
function tryCatch(fn) {
  var result;
  var error;

  try {
    result = fn();
  } catch (err) {
    error = err;
  } // $FlowFixMe


  return {
    result: result,
    error: error
  };
}
function removeFromArray(arr, item) {
  var index = arr.indexOf(item);

  if (index !== -1) {
    arr.splice(index, 1);
  }
}
function assertExists(name, thing) {
  if (thing === null || typeof thing === 'undefined') {
    throw new Error("Expected " + name + " to be present");
  }

  return thing;
}
function unique(arr) {
  var result = {};

  for (var _i4 = 0; _i4 < arr.length; _i4++) {
    var item = arr[_i4];
    // eslint-disable-next-line const-immutable/no-mutation
    result[item] = true;
  }

  return Object.keys(result);
}
// CONCATENATED MODULE: ./node_modules/belter/src/constants.js
var KEY_CODES = {
  ENTER: 13
};
// CONCATENATED MODULE: ./node_modules/belter/src/dom.js


/* eslint max-lines: off */






function isDocumentReady() {
  return Boolean(document.body) && document.readyState === 'complete';
}
function urlEncode(str) {
  return str.replace(/\?/g, '%3F').replace(/&/g, '%26').replace(/#/g, '%23').replace(/\+/g, '%2B');
}
function waitForWindowReady() {
  return inlineMemoize(waitForWindowReady, function () {
    return new promise_ZalgoPromise(function (resolve) {
      if (isDocumentReady()) {
        resolve();
      }

      window.addEventListener('load', function () {
        return resolve();
      });
    });
  });
}
function waitForDocumentReady() {
  return inlineMemoize(waitForDocumentReady, function () {
    return new promise_ZalgoPromise(function (resolve) {
      if (isDocumentReady()) {
        return resolve();
      }

      var interval = setInterval(function () {
        if (isDocumentReady()) {
          clearInterval(interval);
          return resolve();
        }
      }, 10);
    });
  });
}
function waitForDocumentBody() {
  return waitForDocumentReady().then(function () {
    if (document.body) {
      return document.body;
    }

    throw new Error('Document ready but document.body not present');
  });
}
function parseQuery(queryString) {
  return inlineMemoize(parseQuery, function () {
    var params = {};

    if (!queryString) {
      return params;
    }

    if (queryString.indexOf('=') === -1) {
      return params;
    }

    for (var _i2 = 0, _queryString$split2 = queryString.split('&'); _i2 < _queryString$split2.length; _i2++) {
      var pair = _queryString$split2[_i2];
      pair = pair.split('=');

      if (pair[0] && pair[1]) {
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }
    }

    return params;
  }, [queryString]);
}
function getQueryParam(name) {
  return parseQuery(window.location.search.slice(1))[name];
}
function urlWillRedirectPage(url) {
  if (url.indexOf('#') === -1) {
    return true;
  }

  if (url.indexOf('#') === 0) {
    return false;
  }

  if (url.split('#')[0] === window.location.href.split('#')[0]) {
    return false;
  }

  return true;
}
function formatQuery(obj) {
  if (obj === void 0) {
    obj = {};
  }

  return Object.keys(obj).filter(function (key) {
    return typeof obj[key] === 'string';
  }).map(function (key) {
    return urlEncode(key) + "=" + urlEncode(obj[key]);
  }).join('&');
}
function extendQuery(originalQuery, props) {
  if (props === void 0) {
    props = {};
  }

  if (!props || !Object.keys(props).length) {
    return originalQuery;
  }

  return formatQuery(_extends({}, parseQuery(originalQuery), {}, props));
}
function extendUrl(url, options) {
  if (options === void 0) {
    options = {};
  }

  var query = options.query || {};
  var hash = options.hash || {};
  var originalUrl;
  var originalQuery;
  var originalHash;

  var _url$split = url.split('#');

  originalUrl = _url$split[0];
  originalHash = _url$split[1];

  var _originalUrl$split = originalUrl.split('?');

  originalUrl = _originalUrl$split[0];
  originalQuery = _originalUrl$split[1];
  var queryString = extendQuery(originalQuery, query);
  var hashString = extendQuery(originalHash, hash);

  if (queryString) {
    originalUrl = originalUrl + "?" + queryString;
  }

  if (hashString) {
    originalUrl = originalUrl + "#" + hashString;
  }

  return originalUrl;
}
function dom_redirect(url, win) {
  if (win === void 0) {
    win = window;
  }

  return new promise_ZalgoPromise(function (resolve) {
    win.location = url;

    if (!urlWillRedirectPage(url)) {
      resolve();
    }
  });
}
function hasMetaViewPort() {
  var meta = document.querySelector('meta[name=viewport]');

  if (isDevice() && window.screen.width < 660 && !meta) {
    return false;
  }

  return true;
}
function isElementVisible(el) {
  return Boolean(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}
function enablePerformance() {
  return inlineMemoize(enablePerformance, function () {
    /* eslint-disable compat/compat */
    return Boolean(window.performance && performance.now && performance.timing && performance.timing.connectEnd && performance.timing.navigationStart && Math.abs(performance.now() - Date.now()) > 1000 && performance.now() - (performance.timing.connectEnd - performance.timing.navigationStart) > 0);
    /* eslint-enable compat/compat */
  });
}
function getPageRenderTime() {
  return waitForDocumentReady().then(function () {
    if (!enablePerformance()) {
      return;
    }

    var timing = window.performance.timing;

    if (timing.connectEnd && timing.domInteractive) {
      return timing.domInteractive - timing.connectEnd;
    }
  });
}
function htmlEncode(html) {
  if (html === void 0) {
    html = '';
  }

  return html.toString().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/\//g, '&#x2F;');
}
function dom_isBrowser() {
  return typeof window !== 'undefined';
}
function querySelectorAll(selector, doc) {
  if (doc === void 0) {
    doc = window.document;
  }

  return Array.prototype.slice.call(doc.querySelectorAll(selector));
}
function dom_onClick(element, handler) {
  element.addEventListener('touchstart', src_util_noop);
  element.addEventListener('click', handler);
  element.addEventListener('keypress', function (event) {
    // $FlowFixMe
    if (event.keyCode === KEY_CODES.ENTER) {
      return handler(event);
    }
  });
}
function getScript(_ref) {
  var _ref$host = _ref.host,
      host = _ref$host === void 0 ? window.location.host : _ref$host,
      path = _ref.path;
  return inlineMemoize(getScript, function () {
    var url = "" + host + path;
    var scripts = Array.prototype.slice.call(document.getElementsByTagName('script'));

    for (var _i4 = 0; _i4 < scripts.length; _i4++) {
      var script = scripts[_i4];

      if (!script.src) {
        continue;
      }

      var src = script.src.replace(/^https?:\/\//, '').split('?')[0];

      if (src === url) {
        return script;
      }
    }
  }, [path]);
}
function isLocalStorageEnabled() {
  return inlineMemoize(isLocalStorageEnabled, function () {
    try {
      if (typeof window === 'undefined') {
        return false;
      }

      if (window.localStorage) {
        var value = Math.random().toString();
        window.localStorage.setItem('__test__localStorage__', value);
        var result = window.localStorage.getItem('__test__localStorage__');
        window.localStorage.removeItem('__test__localStorage__');

        if (value === result) {
          return true;
        }
      }
    } catch (err) {// pass
    }

    return false;
  });
}
function getBrowserLocales() {
  var nav = window.navigator;
  var locales = nav.languages ? Array.prototype.slice.apply(nav.languages) : [];

  if (nav.language) {
    locales.push(nav.language);
  }

  if (nav.userLanguage) {
    locales.push(nav.userLanguage);
  }

  return locales.map(function (locale) {
    if (locale && locale.match(/^[a-z]{2}[-_][A-Z]{2}$/)) {
      var _locale$split = locale.split(/[-_]/),
          lang = _locale$split[0],
          country = _locale$split[1];

      return {
        country: country,
        lang: lang
      };
    }

    if (locale && locale.match(/^[a-z]{2}$/)) {
      return {
        lang: locale
      };
    }

    return null;
  }).filter(Boolean);
}
function appendChild(container, child) {
  container.appendChild(child);
}
function isElement(element) {
  if (element instanceof window.Element) {
    return true;
  }

  if (element !== null && typeof element === 'object' && element.nodeType === 1 && typeof element.style === 'object' && typeof element.ownerDocument === 'object') {
    return true;
  }

  return false;
}
function getElementSafe(id, doc) {
  if (doc === void 0) {
    doc = document;
  }

  if (isElement(id)) {
    // $FlowFixMe
    return id;
  }

  if (typeof id === 'string') {
    return doc.querySelector(id);
  }
}
function getElement(id, doc) {
  if (doc === void 0) {
    doc = document;
  }

  var element = getElementSafe(id, doc);

  if (element) {
    return element;
  }

  throw new Error("Can not find element: " + stringify(id));
}
function elementReady(id) {
  return new promise_ZalgoPromise(function (resolve, reject) {
    var name = stringify(id);
    var el = getElementSafe(id);

    if (el) {
      return resolve(el);
    }

    if (isDocumentReady()) {
      return reject(new Error("Document is ready and element " + name + " does not exist"));
    }

    var interval = setInterval(function () {
      el = getElementSafe(id);

      if (el) {
        clearInterval(interval);
        return resolve(el);
      }

      if (isDocumentReady()) {
        clearInterval(interval);
        return reject(new Error("Document is ready and element " + name + " does not exist"));
      }
    }, 10);
  });
}
function PopupOpenError(message) {
  this.message = message;
}
PopupOpenError.prototype = Object.create(Error.prototype);
function popup(url, options) {
  // $FlowFixMe
  options = options || {};
  var _options = options,
      width = _options.width,
      height = _options.height;
  var top = 0;
  var left = 0;

  if (width) {
    if (window.outerWidth) {
      left = Math.round((window.outerWidth - width) / 2) + window.screenX;
    } else if (window.screen.width) {
      left = Math.round((window.screen.width - width) / 2);
    }
  }

  if (height) {
    if (window.outerHeight) {
      top = Math.round((window.outerHeight - height) / 2) + window.screenY;
    } else if (window.screen.height) {
      top = Math.round((window.screen.height - height) / 2);
    }
  }

  if (width && height) {
    options = _extends({
      top: top,
      left: left,
      width: width,
      height: height,
      status: 1,
      toolbar: 0,
      menubar: 0,
      resizable: 1,
      scrollbars: 1
    }, options);
  }

  var name = options.name || '';
  delete options.name; // eslint-disable-next-line array-callback-return

  var params = Object.keys(options).map(function (key) {
    // $FlowFixMe
    if (options[key] !== null && options[key] !== undefined) {
      return key + "=" + stringify(options[key]);
    }
  }).filter(Boolean).join(',');
  var win;

  try {
    win = window.open(url, name, params, true);
  } catch (err) {
    throw new PopupOpenError("Can not open popup window - " + (err.stack || err.message));
  }

  if (isWindowClosed(win)) {
    var err = new PopupOpenError("Can not open popup window - blocked");
    throw err;
  }

  window.addEventListener('unload', function () {
    return win.close();
  });
  return win;
}
function writeToWindow(win, html) {
  try {
    win.document.open();
    win.document.write(html);
    win.document.close();
  } catch (err) {
    try {
      win.location = "javascript: document.open(); document.write(" + JSON.stringify(html) + "); document.close();";
    } catch (err2) {// pass
    }
  }
}
function writeElementToWindow(win, el) {
  var tag = el.tagName.toLowerCase();

  if (tag !== 'html') {
    throw new Error("Expected element to be html, got " + tag);
  }

  var documentElement = win.document.documentElement;

  for (var _i6 = 0, _arrayFrom2 = arrayFrom(documentElement.children); _i6 < _arrayFrom2.length; _i6++) {
    var child = _arrayFrom2[_i6];
    documentElement.removeChild(child);
  }

  for (var _i8 = 0, _arrayFrom4 = arrayFrom(el.children); _i8 < _arrayFrom4.length; _i8++) {
    var _child = _arrayFrom4[_i8];
    documentElement.appendChild(_child);
  }
}
function setStyle(el, styleText, doc) {
  if (doc === void 0) {
    doc = window.document;
  }

  // $FlowFixMe
  if (el.styleSheet) {
    // $FlowFixMe
    el.styleSheet.cssText = styleText;
  } else {
    el.appendChild(doc.createTextNode(styleText));
  }
}
var awaitFrameLoadPromises;
function awaitFrameLoad(frame) {
  awaitFrameLoadPromises = awaitFrameLoadPromises || new weakmap_CrossDomainSafeWeakMap();

  if (awaitFrameLoadPromises.has(frame)) {
    var _promise = awaitFrameLoadPromises.get(frame);

    if (_promise) {
      return _promise;
    }
  }

  var promise = new promise_ZalgoPromise(function (resolve, reject) {
    frame.addEventListener('load', function () {
      linkFrameWindow(frame);
      resolve(frame);
    });
    frame.addEventListener('error', function (err) {
      if (frame.contentWindow) {
        resolve(frame);
      } else {
        reject(err);
      }
    });
  });
  awaitFrameLoadPromises.set(frame, promise);
  return promise;
}
function awaitFrameWindow(frame) {
  return awaitFrameLoad(frame).then(function (loadedFrame) {
    if (!loadedFrame.contentWindow) {
      throw new Error("Could not find window in iframe");
    }

    return loadedFrame.contentWindow;
  });
}
function createElement(tag, options, container) {
  if (tag === void 0) {
    tag = 'div';
  }

  if (options === void 0) {
    options = {};
  }

  tag = tag.toLowerCase();
  var element = document.createElement(tag);

  if (options.style) {
    extend(element.style, options.style);
  }

  if (options.class) {
    element.className = options.class.join(' ');
  }

  if (options.id) {
    element.setAttribute('id', options.id);
  }

  if (options.attributes) {
    for (var _i10 = 0, _Object$keys2 = Object.keys(options.attributes); _i10 < _Object$keys2.length; _i10++) {
      var key = _Object$keys2[_i10];
      element.setAttribute(key, options.attributes[key]);
    }
  }

  if (options.styleSheet) {
    setStyle(element, options.styleSheet);
  }

  if (container) {
    appendChild(container, element);
  }

  if (options.html) {
    if (tag === 'iframe') {
      // $FlowFixMe
      if (!container || !element.contentWindow) {
        throw new Error("Iframe html can not be written unless container provided and iframe in DOM");
      } // $FlowFixMe


      writeToWindow(element.contentWindow, options.html);
    } else {
      element.innerHTML = options.html;
    }
  }

  return element;
}
function iframe(options, container) {
  if (options === void 0) {
    options = {};
  }

  var attributes = options.attributes || {};
  var style = options.style || {};
  var frame = createElement('iframe', {
    attributes: _extends({
      allowTransparency: 'true'
    }, attributes),
    style: _extends({
      backgroundColor: 'transparent',
      border: 'none'
    }, style),
    html: options.html,
    class: options.class
  });
  var isIE = window.navigator.userAgent.match(/MSIE|Edge/i);

  if (!frame.hasAttribute('id')) {
    frame.setAttribute('id', uniqueID());
  } // $FlowFixMe


  awaitFrameLoad(frame);

  if (container) {
    var el = getElement(container);
    el.appendChild(frame);
  }

  if (options.url || isIE) {
    frame.setAttribute('src', options.url || 'about:blank');
  } // $FlowFixMe


  return frame;
}
function addEventListener(obj, event, handler) {
  obj.addEventListener(event, handler);
  return {
    cancel: function cancel() {
      obj.removeEventListener(event, handler);
    }
  };
}
function bindEvents(element, eventNames, handler) {
  handler = once(handler);

  for (var _i12 = 0; _i12 < eventNames.length; _i12++) {
    var eventName = eventNames[_i12];
    element.addEventListener(eventName, handler);
  }

  return {
    cancel: once(function () {
      for (var _i14 = 0; _i14 < eventNames.length; _i14++) {
        var _eventName = eventNames[_i14];
        element.removeEventListener(_eventName, handler);
      }
    })
  };
}
var VENDOR_PREFIXES = ['webkit', 'moz', 'ms', 'o'];
function setVendorCSS(element, name, value) {
  // $FlowFixMe
  element.style[name] = value;
  var capitalizedName = capitalizeFirstLetter(name);

  for (var _i16 = 0; _i16 < VENDOR_PREFIXES.length; _i16++) {
    var prefix = VENDOR_PREFIXES[_i16];
    // $FlowFixMe
    element.style["" + prefix + capitalizedName] = value;
  }
}
var ANIMATION_START_EVENTS = ['animationstart', 'webkitAnimationStart', 'oAnimationStart', 'MSAnimationStart'];
var ANIMATION_END_EVENTS = ['animationend', 'webkitAnimationEnd', 'oAnimationEnd', 'MSAnimationEnd'];
function animate(element, name, clean, timeout) {
  if (timeout === void 0) {
    timeout = 1000;
  }

  return new promise_ZalgoPromise(function (resolve, reject) {
    var el = getElement(element);

    if (!el) {
      return resolve();
    }

    var hasStarted = false;
    var startTimeout;
    var endTimeout;
    var startEvent;
    var endEvent;

    function cleanUp() {
      clearTimeout(startTimeout);
      clearTimeout(endTimeout);
      startEvent.cancel();
      endEvent.cancel();
    }

    startEvent = bindEvents(el, ANIMATION_START_EVENTS, function (event) {
      // $FlowFixMe
      if (event.target !== el || event.animationName !== name) {
        return;
      }

      clearTimeout(startTimeout);
      event.stopPropagation();
      startEvent.cancel();
      hasStarted = true;
      endTimeout = setTimeout(function () {
        cleanUp();
        resolve();
      }, timeout);
    });
    endEvent = bindEvents(el, ANIMATION_END_EVENTS, function (event) {
      // $FlowFixMe
      if (event.target !== el || event.animationName !== name) {
        return;
      }

      cleanUp(); // $FlowFixMe

      if (typeof event.animationName === 'string' && event.animationName !== name) {
        return reject("Expected animation name to be " + name + ", found " + event.animationName);
      }

      return resolve();
    });
    setVendorCSS(el, 'animationName', name);
    startTimeout = setTimeout(function () {
      if (!hasStarted) {
        cleanUp();
        return resolve();
      }
    }, 200);

    if (clean) {
      clean(cleanUp);
    }
  });
}
var STYLE = {
  DISPLAY: {
    NONE: 'none',
    BLOCK: 'block'
  },
  VISIBILITY: {
    VISIBLE: 'visible',
    HIDDEN: 'hidden'
  },
  IMPORTANT: 'important'
};
function makeElementVisible(element) {
  element.style.setProperty('visibility', '');
}
function makeElementInvisible(element) {
  element.style.setProperty('visibility', STYLE.VISIBILITY.HIDDEN, STYLE.IMPORTANT);
}
function showElement(element) {
  element.style.setProperty('display', '');
}
function hideElement(element) {
  element.style.setProperty('display', STYLE.DISPLAY.NONE, STYLE.IMPORTANT);
}
function destroyElement(element) {
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
}
function showAndAnimate(element, name, clean) {
  var animation = animate(element, name, clean);
  showElement(element);
  return animation;
}
function animateAndHide(element, name, clean) {
  return animate(element, name, clean).then(function () {
    hideElement(element);
  });
}
function addClass(element, name) {
  element.classList.add(name);
}
function removeClass(element, name) {
  element.classList.remove(name);
}
function isElementClosed(el) {
  if (!el || !el.parentNode) {
    return true;
  }

  return false;
}
function watchElementForClose(element, handler) {
  handler = once(handler);
  var interval;

  if (isElementClosed(element)) {
    handler();
  } else {
    interval = safeInterval(function () {
      if (isElementClosed(element)) {
        interval.cancel();
        handler();
      }
    }, 50);
  }

  return {
    cancel: function cancel() {
      if (interval) {
        interval.cancel();
      }
    }
  };
}
function fixScripts(el, doc) {
  if (doc === void 0) {
    doc = window.document;
  }

  for (var _i18 = 0, _querySelectorAll2 = querySelectorAll('script', el); _i18 < _querySelectorAll2.length; _i18++) {
    var script = _querySelectorAll2[_i18];
    var parentNode = script.parentNode;

    if (!parentNode) {
      continue;
    }

    var newScript = doc.createElement('script');
    newScript.text = script.textContent;
    parentNode.replaceChild(newScript, script);
  }
}
function onResize(el, handler, _temp) {
  var _ref2 = _temp === void 0 ? {} : _temp,
      _ref2$width = _ref2.width,
      width = _ref2$width === void 0 ? true : _ref2$width,
      _ref2$height = _ref2.height,
      height = _ref2$height === void 0 ? true : _ref2$height,
      _ref2$interval = _ref2.interval,
      interval = _ref2$interval === void 0 ? 100 : _ref2$interval,
      _ref2$win = _ref2.win,
      win = _ref2$win === void 0 ? window : _ref2$win;

  var currentWidth = el.offsetWidth;
  var currentHeight = el.offsetHeight;
  handler({
    width: currentWidth,
    height: currentHeight
  });

  var check = function check() {
    var newWidth = el.offsetWidth;
    var newHeight = el.offsetHeight;

    if (width && newWidth !== currentWidth || height && newHeight !== currentHeight) {
      handler({
        width: newWidth,
        height: newHeight
      });
    }

    currentWidth = newWidth;
    currentHeight = newHeight;
  };

  var observer;
  var timeout;

  if (typeof win.ResizeObserver !== 'undefined') {
    observer = new win.ResizeObserver(check);
    observer.observe(el);
  } else if (typeof win.MutationObserver !== 'undefined') {
    observer = new win.MutationObserver(check);
    observer.observe(el, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: false
    });
    win.addEventListener('resize', check);
  } else {
    var loop = function loop() {
      check();
      timeout = setTimeout(loop, interval);
    };

    loop();
  }

  return {
    cancel: function cancel() {
      observer.disconnect();
      window.removeEventListener('resize', check);
      clearTimeout(timeout);
    }
  };
}
function getResourceLoadTime(url) {
  if (!enablePerformance()) {
    return;
  }

  if (!window.performance || typeof window.performance.getEntries !== 'function') {
    return;
  }

  var entries = window.performance.getEntries();

  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];

    if (entry && entry.name && entry.name.indexOf(url) === 0 && typeof entry.duration === 'number') {
      return Math.floor(entry.duration);
    }
  }
}
// CONCATENATED MODULE: ./node_modules/belter/src/storage.js


var DEFAULT_SESSION_STORAGE = 20 * 60 * 1000;
function getStorage(_ref) {
  var name = _ref.name,
      _ref$lifetime = _ref.lifetime,
      lifetime = _ref$lifetime === void 0 ? DEFAULT_SESSION_STORAGE : _ref$lifetime;
  return inlineMemoize(getStorage, function () {
    var STORAGE_KEY = "__" + name + "_storage__";
    var accessedStorage;

    function getState(handler) {
      var localStorageEnabled = isLocalStorageEnabled();
      var storage;

      if (accessedStorage) {
        storage = accessedStorage;
      }

      if (!storage && localStorageEnabled) {
        var rawStorage = window.localStorage.getItem(STORAGE_KEY);

        if (rawStorage) {
          storage = JSON.parse(rawStorage);
        }
      }

      if (!storage) {
        storage = getGlobal()[STORAGE_KEY];
      }

      if (!storage) {
        storage = {
          id: uniqueID()
        };
      }

      if (!storage.id) {
        storage.id = uniqueID();
      }

      accessedStorage = storage;
      var result = handler(storage);

      if (localStorageEnabled) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
      } else {
        getGlobal()[STORAGE_KEY] = storage;
      }

      accessedStorage = null;
      return result;
    }

    function getID() {
      return getState(function (storage) {
        return storage.id;
      });
    }

    function getSession(handler) {
      return getState(function (storage) {
        var session = storage.__session__;
        var now = Date.now();

        if (session && now - session.created > lifetime) {
          session = null;
        }

        if (!session) {
          session = {
            guid: uniqueID(),
            created: now
          };
        }

        storage.__session__ = session;
        return handler(session);
      });
    }

    function getSessionState(handler) {
      return getSession(function (session) {
        session.state = session.state || {};
        return handler(session.state);
      });
    }

    function getSessionID() {
      return getSession(function (session) {
        return session.guid;
      });
    }

    return {
      getState: getState,
      getID: getID,
      getSessionState: getSessionState,
      getSessionID: getSessionID
    };
  }, [{
    name: name,
    lifetime: lifetime
  }]);
}
// CONCATENATED MODULE: ./node_modules/belter/src/experiment.js



function getBelterExperimentStorage() {
  return getStorage({
    name: 'belter_experiment'
  });
}

function isEventUnique(name) {
  return getBelterExperimentStorage().getSessionState(function (state) {
    state.loggedBeacons = state.loggedBeacons || [];

    if (state.loggedBeacons.indexOf(name) === -1) {
      state.loggedBeacons.push(name);
      return true;
    }

    return false;
  });
}

function getThrottlePercentile(name) {
  return getBelterExperimentStorage().getState(function (state) {
    state.throttlePercentiles = state.throttlePercentiles || {};
    state.throttlePercentiles[name] = state.throttlePercentiles[name] || Math.floor(Math.random() * 100);
    return state.throttlePercentiles[name];
  });
}

var THROTTLE_GROUP = {
  TEST: 'test',
  CONTROL: 'control',
  THROTTLE: 'throttle'
};
function experiment(_ref) {
  var name = _ref.name,
      _ref$sample = _ref.sample,
      sample = _ref$sample === void 0 ? 50 : _ref$sample,
      _ref$logTreatment = _ref.logTreatment,
      logTreatment = _ref$logTreatment === void 0 ? src_util_noop : _ref$logTreatment,
      _ref$logCheckpoint = _ref.logCheckpoint,
      logCheckpoint = _ref$logCheckpoint === void 0 ? src_util_noop : _ref$logCheckpoint;
  var throttle = getThrottlePercentile(name);
  var group;

  if (throttle < sample) {
    group = THROTTLE_GROUP.TEST;
  } else if (sample >= 50 || sample <= throttle && throttle < sample * 2) {
    group = THROTTLE_GROUP.CONTROL;
  } else {
    group = THROTTLE_GROUP.THROTTLE;
  }

  var treatment = name + "_" + group;
  var started = false;
  var forced = false;

  try {
    if (window.localStorage && window.localStorage.getItem(name)) {
      forced = true;
    }
  } catch (err) {// pass
  }

  return {
    isEnabled: function isEnabled() {
      return group === THROTTLE_GROUP.TEST || forced;
    },
    isDisabled: function isDisabled() {
      return group !== THROTTLE_GROUP.TEST && !forced;
    },
    getTreatment: function getTreatment() {
      return treatment;
    },
    log: function log(checkpoint, payload) {
      if (payload === void 0) {
        payload = {};
      }

      if (!started) {
        return this;
      }

      if (isEventUnique(name + "_" + treatment + "_" + JSON.stringify(payload))) {
        logTreatment({
          name: name,
          treatment: treatment,
          payload: payload
        });
      }

      if (isEventUnique(name + "_" + treatment + "_" + checkpoint + "_" + JSON.stringify(payload))) {
        logCheckpoint({
          name: name,
          treatment: treatment,
          checkpoint: checkpoint,
          payload: payload
        });
      }

      return this;
    },
    logStart: function logStart(payload) {
      if (payload === void 0) {
        payload = {};
      }

      started = true;
      return this.log("start", payload);
    },
    logComplete: function logComplete(payload) {
      if (payload === void 0) {
        payload = {};
      }

      return this.log("complete", payload);
    }
  };
}
// CONCATENATED MODULE: ./node_modules/belter/src/global.js

function getGlobalNameSpace(_ref) {
  var name = _ref.name,
      _ref$version = _ref.version,
      version = _ref$version === void 0 ? 'latest' : _ref$version;
  var global = getGlobal();
  var globalKey = "__" + name + "__" + version + "_global__";
  var namespace = global[globalKey] = global[globalKey] || {};
  return {
    get: function get(key, defValue) {
      // $FlowFixMe
      defValue = defValue || {};
      var item = namespace[key] = namespace[key] || defValue;
      return item;
    }
  };
}
// CONCATENATED MODULE: ./node_modules/belter/src/http.js

var HEADERS = {
  CONTENT_TYPE: 'content-type',
  ACCEPT: 'accept'
};
var http_headerBuilders = [];

function parseHeaders(rawHeaders) {
  if (rawHeaders === void 0) {
    rawHeaders = '';
  }

  var result = {};

  for (var _i2 = 0, _rawHeaders$trim$spli2 = rawHeaders.trim().split('\n'); _i2 < _rawHeaders$trim$spli2.length; _i2++) {
    var line = _rawHeaders$trim$spli2[_i2];

    var _line$split = line.split(':'),
        _key = _line$split[0],
        values = _line$split.slice(1);

    result[_key.toLowerCase()] = values.join(':').trim();
  }

  return result;
}

function request(_ref) {
  var url = _ref.url,
      _ref$method = _ref.method,
      method = _ref$method === void 0 ? 'get' : _ref$method,
      _ref$headers = _ref.headers,
      headers = _ref$headers === void 0 ? {} : _ref$headers,
      json = _ref.json,
      data = _ref.data,
      body = _ref.body,
      _ref$win = _ref.win,
      win = _ref$win === void 0 ? window : _ref$win,
      _ref$timeout = _ref.timeout,
      timeout = _ref$timeout === void 0 ? 0 : _ref$timeout;
  return new promise_ZalgoPromise(function (resolve, reject) {
    if (json && data || json && body || data && json) {
      throw new Error("Only options.json or options.data or options.body should be passed");
    }

    var normalizedHeaders = {};

    for (var _i4 = 0, _Object$keys2 = Object.keys(headers); _i4 < _Object$keys2.length; _i4++) {
      var _key2 = _Object$keys2[_i4];
      normalizedHeaders[_key2.toLowerCase()] = headers[_key2];
    }

    if (json) {
      normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || 'application/json';
    } else if (data || body) {
      normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || 'application/x-www-form-urlencoded; charset=utf-8';
    }

    normalizedHeaders[HEADERS.ACCEPT] = normalizedHeaders[HEADERS.ACCEPT] || 'application/json';

    for (var _i6 = 0; _i6 < http_headerBuilders.length; _i6++) {
      var headerBuilder = http_headerBuilders[_i6];
      var builtHeaders = headerBuilder();

      for (var _i8 = 0, _Object$keys4 = Object.keys(builtHeaders); _i8 < _Object$keys4.length; _i8++) {
        var _key3 = _Object$keys4[_i8];
        normalizedHeaders[_key3.toLowerCase()] = builtHeaders[_key3];
      }
    }

    var xhr = new win.XMLHttpRequest();
    xhr.addEventListener('load', function xhrLoad() {
      var responseHeaders = parseHeaders(this.getAllResponseHeaders());

      if (!this.status) {
        return reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: no response status code."));
      }

      var contentType = responseHeaders['content-type'];
      var isJSON = contentType && (contentType.indexOf('application/json') === 0 || contentType.indexOf('text/json') === 0);
      var responseBody = this.responseText;

      try {
        responseBody = JSON.parse(responseBody);
      } catch (err) {
        if (isJSON) {
          return reject(new Error("Invalid json: " + this.responseText + "."));
        }
      }

      var res = {
        status: this.status,
        headers: responseHeaders,
        body: responseBody
      };
      return resolve(res);
    }, false);
    xhr.addEventListener('error', function (evt) {
      reject(new Error("Request to " + method.toLowerCase() + " " + url + " failed: " + evt.toString() + "."));
    }, false);
    xhr.open(method, url, true);

    for (var _key4 in normalizedHeaders) {
      if (normalizedHeaders.hasOwnProperty(_key4)) {
        xhr.setRequestHeader(_key4, normalizedHeaders[_key4]);
      }
    }

    if (json) {
      body = JSON.stringify(json);
    } else if (data) {
      body = Object.keys(data).map(function (key) {
        return encodeURIComponent(key) + "=" + (data ? encodeURIComponent(data[key]) : '');
      }).join('&');
    }

    xhr.timeout = timeout;

    xhr.ontimeout = function xhrTimeout() {
      reject(new Error("Request to " + method.toLowerCase() + " " + url + " has timed out"));
    };

    xhr.send(body);
  });
}
function http_addHeaderBuilder(method) {
  http_headerBuilders.push(method);
}
// CONCATENATED MODULE: ./node_modules/belter/src/types.js
// export something to force webpack to see this as an ES module
var types_TYPES = true;
// CONCATENATED MODULE: ./node_modules/belter/src/decorators.js

function memoized(target, name, descriptor) {
  descriptor.value = memoize(descriptor.value, {
    name: name,
    thisNamespace: true
  });
}
function decorators_promise(target, name, descriptor) {
  descriptor.value = promisify(descriptor.value, {
    name: name
  });
}
// CONCATENATED MODULE: ./node_modules/belter/src/css.js
function isPerc(str) {
  return typeof str === 'string' && /^[0-9]+%$/.test(str);
}
function isPx(str) {
  return typeof str === 'string' && /^[0-9]+px$/.test(str);
}
function toNum(val) {
  if (typeof val === 'number') {
    return val;
  }

  var match = val.match(/^([0-9]+)(px|%)$/);

  if (!match) {
    throw new Error("Could not match css value from " + val);
  }

  return parseInt(match[1], 10);
}
function toPx(val) {
  return toNum(val) + "px";
}
function toCSS(val) {
  if (typeof val === 'number') {
    return toPx(val);
  }

  return isPerc(val) ? val : toPx(val);
}
function percOf(num, perc) {
  return parseInt(num * toNum(perc) / 100, 10);
}
function normalizeDimension(dim, max) {
  if (typeof dim === 'number') {
    return dim;
  } else if (isPerc(dim)) {
    return percOf(max, dim);
  } else if (isPx(dim)) {
    return toNum(dim);
  } else {
    throw new Error("Can not normalize dimension: " + dim);
  }
}
// CONCATENATED MODULE: ./node_modules/belter/src/test.js


function wrapPromise(method, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$timeout = _ref.timeout,
      timeout = _ref$timeout === void 0 ? 5000 : _ref$timeout;

  var expected = [];
  var promises = [];
  var timer = setTimeout(function () {
    if (expected.length) {
      promises.push(promise_ZalgoPromise.asyncReject(new Error("Expected " + expected[0] + " to be called")));
    }
  }, timeout);

  var expect = function expect(name, fn) {
    if (fn === void 0) {
      fn = src_util_noop;
    }

    expected.push(name); // $FlowFixMe

    return function expectWrapper() {
      var _this = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      removeFromArray(expected, name); // $FlowFixMe

      var _tryCatch = tryCatch(function () {
        var _fn;

        return (_fn = fn).call.apply(_fn, [_this].concat(args));
      }),
          result = _tryCatch.result,
          error = _tryCatch.error;

      if (error) {
        promises.push(promise_ZalgoPromise.asyncReject(error));
        throw error;
      }

      promises.push(promise_ZalgoPromise.resolve(result));
      return result;
    };
  };

  var avoid = function avoid(name, fn) {
    if (fn === void 0) {
      fn = src_util_noop;
    }

    // $FlowFixMe
    return function avoidWrapper() {
      var _fn2;

      promises.push(promise_ZalgoPromise.asyncReject(new Error("Expected " + name + " to not be called"))); // $FlowFixMe

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return (_fn2 = fn).call.apply(_fn2, [this].concat(args));
    };
  };

  var expectError = function expectError(name, fn) {
    if (fn === void 0) {
      fn = src_util_noop;
    }

    expected.push(name); // $FlowFixMe

    return function expectErrorWrapper() {
      var _this2 = this;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      removeFromArray(expected, name); // $FlowFixMe

      var _tryCatch2 = tryCatch(function () {
        var _fn3;

        return (_fn3 = fn).call.apply(_fn3, [_this2].concat(args));
      }),
          result = _tryCatch2.result,
          error = _tryCatch2.error;

      if (error) {
        throw error;
      }

      promises.push(promise_ZalgoPromise.resolve(result).then(function () {
        throw new Error("Expected " + name + " to throw an error");
      }, src_util_noop));
      return result;
    };
  };

  promises.push(promise_ZalgoPromise.try(function () {
    return method({
      expect: expect,
      avoid: avoid,
      expectError: expectError,
      error: avoid
    });
  }));

  var drain = function drain() {
    return promise_ZalgoPromise.try(function () {
      if (promises.length) {
        return promises.pop();
      }
    }).then(function () {
      if (promises.length) {
        return drain();
      }

      if (expected.length) {
        return promise_ZalgoPromise.delay(10).then(drain);
      }
    });
  };

  return drain().then(function () {
    clearTimeout(timer);
  });
}
// CONCATENATED MODULE: ./node_modules/belter/src/index.js











// CONCATENATED MODULE: ./node_modules/@paypal/sdk-constants/src/locale.js
/* eslint max-lines: 0 */
var COUNTRY = {
  AD: 'AD',
  AE: 'AE',
  AG: 'AG',
  AI: 'AI',
  AL: 'AL',
  AM: 'AM',
  AN: 'AN',
  AO: 'AO',
  AR: 'AR',
  AT: 'AT',
  AU: 'AU',
  AW: 'AW',
  AZ: 'AZ',
  BA: 'BA',
  BB: 'BB',
  BE: 'BE',
  BF: 'BF',
  BG: 'BG',
  BH: 'BH',
  BI: 'BI',
  BJ: 'BJ',
  BM: 'BM',
  BN: 'BN',
  BO: 'BO',
  BR: 'BR',
  BS: 'BS',
  BT: 'BT',
  BW: 'BW',
  BY: 'BY',
  BZ: 'BZ',
  CA: 'CA',
  CD: 'CD',
  CG: 'CG',
  CH: 'CH',
  CI: 'CI',
  CK: 'CK',
  CL: 'CL',
  CM: 'CM',
  CN: 'CN',
  CO: 'CO',
  CR: 'CR',
  CV: 'CV',
  CY: 'CY',
  CZ: 'CZ',
  DE: 'DE',
  DJ: 'DJ',
  DK: 'DK',
  DM: 'DM',
  DO: 'DO',
  DZ: 'DZ',
  EC: 'EC',
  EE: 'EE',
  EG: 'EG',
  ER: 'ER',
  ES: 'ES',
  ET: 'ET',
  FI: 'FI',
  FJ: 'FJ',
  FK: 'FK',
  FM: 'FM',
  FO: 'FO',
  FR: 'FR',
  GA: 'GA',
  GB: 'GB',
  GD: 'GD',
  GE: 'GE',
  GF: 'GF',
  GI: 'GI',
  GL: 'GL',
  GM: 'GM',
  GN: 'GN',
  GP: 'GP',
  GR: 'GR',
  GT: 'GT',
  GW: 'GW',
  GY: 'GY',
  HK: 'HK',
  HN: 'HN',
  HR: 'HR',
  HU: 'HU',
  ID: 'ID',
  IE: 'IE',
  IL: 'IL',
  IN: 'IN',
  IS: 'IS',
  IT: 'IT',
  JM: 'JM',
  JO: 'JO',
  JP: 'JP',
  KE: 'KE',
  KG: 'KG',
  KH: 'KH',
  KI: 'KI',
  KM: 'KM',
  KN: 'KN',
  KR: 'KR',
  KW: 'KW',
  KY: 'KY',
  KZ: 'KZ',
  LA: 'LA',
  LC: 'LC',
  LI: 'LI',
  LK: 'LK',
  LS: 'LS',
  LT: 'LT',
  LU: 'LU',
  LV: 'LV',
  MA: 'MA',
  MC: 'MC',
  MD: 'MD',
  ME: 'ME',
  MG: 'MG',
  MH: 'MH',
  MK: 'MK',
  ML: 'ML',
  MN: 'MN',
  MQ: 'MQ',
  MR: 'MR',
  MS: 'MS',
  MT: 'MT',
  MU: 'MU',
  MV: 'MV',
  MW: 'MW',
  MX: 'MX',
  MY: 'MY',
  MZ: 'MZ',
  NA: 'NA',
  NC: 'NC',
  NE: 'NE',
  NF: 'NF',
  NG: 'NG',
  NI: 'NI',
  NL: 'NL',
  NO: 'NO',
  NP: 'NP',
  NR: 'NR',
  NU: 'NU',
  NZ: 'NZ',
  OM: 'OM',
  PA: 'PA',
  PE: 'PE',
  PF: 'PF',
  PG: 'PG',
  PH: 'PH',
  PL: 'PL',
  PM: 'PM',
  PN: 'PN',
  PT: 'PT',
  PW: 'PW',
  PY: 'PY',
  QA: 'QA',
  RE: 'RE',
  RO: 'RO',
  RS: 'RS',
  RU: 'RU',
  RW: 'RW',
  SA: 'SA',
  SB: 'SB',
  SC: 'SC',
  SE: 'SE',
  SG: 'SG',
  SH: 'SH',
  SI: 'SI',
  SJ: 'SJ',
  SK: 'SK',
  SL: 'SL',
  SM: 'SM',
  SN: 'SN',
  SO: 'SO',
  SR: 'SR',
  ST: 'ST',
  SV: 'SV',
  SZ: 'SZ',
  TC: 'TC',
  TD: 'TD',
  TG: 'TG',
  TH: 'TH',
  TJ: 'TJ',
  TM: 'TM',
  TN: 'TN',
  TO: 'TO',
  TR: 'TR',
  TT: 'TT',
  TV: 'TV',
  TW: 'TW',
  TZ: 'TZ',
  UA: 'UA',
  UG: 'UG',
  US: 'US',
  UY: 'UY',
  VA: 'VA',
  VC: 'VC',
  VE: 'VE',
  VG: 'VG',
  VN: 'VN',
  VU: 'VU',
  WF: 'WF',
  WS: 'WS',
  YE: 'YE',
  YT: 'YT',
  ZA: 'ZA',
  ZM: 'ZM',
  ZW: 'ZW'
};
var LANG = {
  AR: 'ar',
  CS: 'cs',
  DA: 'da',
  DE: 'de',
  EL: 'el',
  EN: 'en',
  ES: 'es',
  FI: 'fi',
  FR: 'fr',
  HE: 'he',
  HU: 'hu',
  ID: 'id',
  IT: 'it',
  JA: 'ja',
  KO: 'ko',
  NL: 'nl',
  NO: 'no',
  PL: 'pl',
  PT: 'pt',
  RU: 'ru',
  SK: 'sk',
  SV: 'sv',
  TH: 'th',
  TR: 'tr',
  ZH: 'zh'
};
var COUNTRY_LANGS = {
  AD: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  AE: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH, LANG.AR],
  AG: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  AI: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  AL: [LANG.EN],
  AM: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  AN: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  AO: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  AR: [LANG.ES, LANG.EN],
  AT: [LANG.DE, LANG.EN],
  AU: [LANG.EN],
  AW: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  AZ: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  BA: [LANG.EN],
  BB: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  BE: [LANG.EN, LANG.NL, LANG.FR],
  BF: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  BG: [LANG.EN],
  BH: [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  BI: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  BJ: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  BM: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  BN: [LANG.EN],
  BO: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  BR: [LANG.PT, LANG.EN],
  BS: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  BT: [LANG.EN],
  BW: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  BY: [LANG.EN],
  BZ: [LANG.EN, LANG.ES, LANG.FR, LANG.ZH],
  CA: [LANG.EN, LANG.FR],
  CD: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  CG: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  CH: [LANG.DE, LANG.FR, LANG.EN],
  CI: [LANG.FR, LANG.EN],
  CK: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  CL: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  CM: [LANG.FR, LANG.EN],
  CN: [LANG.ZH],
  CO: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  CR: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  CV: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  CY: [LANG.EN],
  CZ: [LANG.CS, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  DE: [LANG.DE, LANG.EN],
  DJ: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  DK: [LANG.DA, LANG.EN],
  DM: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  DO: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  DZ: [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  EC: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  EE: [LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH],
  EG: [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  ER: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  ES: [LANG.ES, LANG.EN],
  ET: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  FI: [LANG.FI, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  FJ: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  FK: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  FM: [LANG.EN],
  FO: [LANG.DA, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  FR: [LANG.FR, LANG.EN],
  GA: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  GB: [LANG.EN],
  GD: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  GE: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  GF: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  GI: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  GL: [LANG.DA, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  GM: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  GN: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  GP: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  GR: [LANG.EL, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  GT: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  GW: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  GY: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  HK: [LANG.EN, LANG.ZH],
  HN: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  HR: [LANG.EN],
  HU: [LANG.HU, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  ID: [LANG.ID, LANG.EN],
  IE: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  IL: [LANG.HE, LANG.EN],
  IN: [LANG.EN],
  IS: [LANG.EN],
  IT: [LANG.IT, LANG.EN],
  JM: [LANG.EN, LANG.ES, LANG.FR, LANG.ZH],
  JO: [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  JP: [LANG.JA, LANG.EN],
  KE: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  KG: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  KH: [LANG.EN],
  KI: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  KM: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  KN: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  KR: [LANG.KO, LANG.EN],
  KW: [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  KY: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  KZ: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  LA: [LANG.EN],
  LC: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  LI: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  LK: [LANG.EN],
  LS: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  LT: [LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH],
  LU: [LANG.EN, LANG.DE, LANG.FR, LANG.ES, LANG.ZH],
  LV: [LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH],
  MA: [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  MC: [LANG.FR, LANG.EN],
  MD: [LANG.EN],
  ME: [LANG.EN],
  MG: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  MH: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  MK: [LANG.EN],
  ML: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  MN: [LANG.EN],
  MQ: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  MR: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  MS: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  MT: [LANG.EN],
  MU: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  MV: [LANG.EN],
  MW: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  MX: [LANG.ES, LANG.EN],
  MY: [LANG.EN],
  MZ: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  NA: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  NC: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  NE: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  NF: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  NG: [LANG.EN],
  NI: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  NL: [LANG.NL, LANG.EN],
  NO: [LANG.NO, LANG.EN],
  NP: [LANG.EN],
  NR: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  NU: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  NZ: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  OM: [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  PA: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  PE: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  PF: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  PG: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  PH: [LANG.EN],
  PL: [LANG.PL, LANG.EN],
  PM: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  PN: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  PT: [LANG.PT, LANG.EN],
  PW: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  PY: [LANG.ES, LANG.EN],
  QA: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH, LANG.AR],
  RE: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  RO: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  RS: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  RU: [LANG.RU, LANG.EN],
  RW: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  SA: [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  SB: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  SC: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  SE: [LANG.SV, LANG.EN],
  SG: [LANG.EN],
  SH: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  SI: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  SJ: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  SK: [LANG.SK, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  SL: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  SM: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  SN: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  SO: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  SR: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  ST: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  SV: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  SZ: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  TC: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  TD: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  TG: [LANG.FR, LANG.EN, LANG.ES, LANG.ZH],
  TH: [LANG.TH, LANG.EN],
  TJ: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  TM: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  TN: [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  TO: [LANG.EN],
  TR: [LANG.TR, LANG.EN],
  TT: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  TV: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  TW: [LANG.ZH, LANG.EN],
  TZ: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  UA: [LANG.EN, LANG.RU, LANG.FR, LANG.ES, LANG.ZH],
  UG: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  US: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  UY: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  VA: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  VC: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  VE: [LANG.ES, LANG.EN, LANG.FR, LANG.ZH],
  VG: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  VN: [LANG.EN],
  VU: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  WF: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  WS: [LANG.EN],
  YE: [LANG.AR, LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  YT: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  ZA: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  ZM: [LANG.EN, LANG.FR, LANG.ES, LANG.ZH],
  ZW: [LANG.EN]
};
// CONCATENATED MODULE: ./node_modules/@paypal/sdk-constants/src/params.js
var SDK_PATH = '/sdk/js';
var SDK_SETTINGS = {
  NAMESPACE: 'data-namespace',
  CLIENT_TOKEN: 'data-client-token',
  PARTNER_ATTRIBUTION_ID: 'data-partner-attribution-id',
  STAGE_HOST: 'data-stage-host',
  API_STAGE_HOST: 'data-api-stage-host',
  CSP_NONCE: 'data-csp-nonce',
  ENABLE_3DS: 'data-enable-3ds',
  SDK_INTEGRATION_SOURCE: 'data-sdk-integration-source'
};
var SDK_QUERY_KEYS = {
  COMPONENTS: 'components',
  ENV: 'env',
  DEBUG: 'debug',
  CACHEBUST: 'cachebust',
  CLIENT_ID: 'client-id',
  MERCHANT_ID: 'merchant-id',
  MERCHANT_EMAIL_HASH: 'merchant-email-hash',
  LOCALE: 'locale',
  CURRENCY: 'currency',
  INTENT: 'intent',
  COMMIT: 'commit',
  VAULT: 'vault',
  BUYER_COUNTRY: 'buyer-country',
  DISABLE_FUNDING: 'disable-funding',
  DISABLE_CARD: 'disable-card',
  LOCALE_COUNTRY: 'locale-country',
  LOCALE_LANG: 'locale-lang',
  FRAMEWORK: 'framework',
  INTEGRATION_DATE: 'integration-date',
  ORDER_CURRENCY: 'order-currency',
  ORDER_INTENT: 'order-intent',
  ORDER_COMMIT: 'order-commit',
  ORDER_VAULT: 'order-vault',
  STAGE_HOST: 'stage-host'
};
var COMPONENTS = {
  BUTTONS: 'buttons',
  HOSTED_FIELDS: 'hosted-fields'
};
var FRAMEWORK = {
  ANGULARJS: 'angularjs',
  ANGULAR: 'angular',
  REACT: 'react',
  VUE: 'vue'
};
var DEBUG = {
  TRUE: true,
  FALSE: false
};
var QUERY_BOOL = {
  TRUE: 'true',
  FALSE: 'false'
};
var UNKNOWN = 'unknown';
var params_PROTOCOL = {
  HTTP: 'http',
  HTTPS: 'https'
};
// CONCATENATED MODULE: ./node_modules/@paypal/sdk-constants/src/env.js
var ENV = {
  LOCAL: 'local',
  STAGE: 'stage',
  SANDBOX: 'sandbox',
  PRODUCTION: 'production',
  TEST: 'test'
};
// CONCATENATED MODULE: ./node_modules/@paypal/sdk-constants/src/fpti.js
var FPTI_KEY = {
  FEED: 'feed_name',
  STATE: 'state_name',
  TRANSITION: 'transition_name',
  BUTTON_TYPE: 'button_type',
  SESSION_UID: 'page_session_id',
  BUTTON_SESSION_UID: 'button_session_id',
  TOKEN: 'token',
  CONTEXT_ID: 'context_id',
  CONTEXT_TYPE: 'context_type',
  REFERER: 'referer_url',
  MERCHANT_DOMAIN: 'merchant_domain',
  PAY_ID: 'pay_id',
  SELLER_ID: 'seller_id',
  CLIENT_ID: 'client_id',
  DATA_SOURCE: 'serverside_data_source',
  BUTTON_SOURCE: 'button_source',
  ERROR_CODE: 'ext_error_code',
  ERROR_DESC: 'ext_error_desc',
  PAGE_LOAD_TIME: 'page_load_time',
  EXPERIMENT_NAME: 'pxp_exp_id',
  TREATMENT_NAME: 'pxp_trtmnt_id',
  TRANSITION_TIME: 'transition_time',
  FUNDING_LIST: 'eligible_payment_methods',
  FUNDING_COUNT: 'eligible_payment_count',
  CHOSEN_FUNDING: 'selected_payment_method',
  BUTTON_LAYOUT: 'button_layout',
  VERSION: 'checkoutjs_version',
  LOCALE: 'locale',
  BUYER_COUNTRY: 'buyer_cntry',
  INTEGRATION_IDENTIFIER: 'integration_identifier',
  PARTNER_ATTRIBUTION_ID: 'bn_code',
  SDK_NAME: 'sdk_name',
  SDK_VERSION: 'sdk_version',
  USER_AGENT: 'user_agent',
  USER_ACTION: 'user_action',
  CONTEXT_CORRID: 'context_correlation_id',
  SDK_CACHE: 'sdk_cache',
  SDK_LOAD_TIME: 'sdk_load_time',
  IS_VAULT: 'is_vault',
  DISABLE_FUNDING: 'disable_funding',
  DISABLE_CARD: 'disable_card',
  RESPONSE_DURATION: 'response_duration',
  SDK_INTEGRATION_SOURCE: 'sdk_integration_source',
  PAYMENT_FLOW: 'payment_flow',
  BUTTON_VERSION: 'button_version'
};
var FPTI_USER_ACTION = {
  COMMIT: 'commit',
  CONTINUE: 'continue'
};
var FPTI_DATA_SOURCE = {
  PAYMENTS_SDK: 'checkout'
};
var FPTI_FEED = {
  PAYMENTS_SDK: 'payments_sdk'
};
var FPTI_SDK_NAME = {
  PAYMENTS_SDK: 'payments_sdk'
};
// CONCATENATED MODULE: ./node_modules/@paypal/sdk-constants/src/order.js
var INTENT = {
  CAPTURE: 'capture',
  AUTHORIZE: 'authorize',
  ORDER: 'order'
};
var COMMIT = {
  TRUE: true,
  FALSE: false
};
var VAULT = {
  TRUE: true,
  FALSE: false
};
var CURRENCY = {
  AUD: 'AUD',
  BRL: 'BRL',
  CAD: 'CAD',
  CZK: 'CZK',
  DKK: 'DKK',
  EUR: 'EUR',
  HKD: 'HKD',
  HUF: 'HUF',
  INR: 'INR',
  ILS: 'ILS',
  JPY: 'JPY',
  MUR: 'MUR',
  MYR: 'MYR',
  MXN: 'MXN',
  TWD: 'TWD',
  NZD: 'NZD',
  NOK: 'NOK',
  PHP: 'PHP',
  PLN: 'PLN',
  GBP: 'GBP',
  RUB: 'RUB',
  SGD: 'SGD',
  SEK: 'SEK',
  CHF: 'CHF',
  THB: 'THB',
  USD: 'USD'
};
// CONCATENATED MODULE: ./node_modules/@paypal/sdk-constants/src/platform.js
var PLATFORM = {
  DESKTOP: 'desktop',
  MOBILE: 'mobile'
};
// CONCATENATED MODULE: ./node_modules/@paypal/sdk-constants/src/funding.js
var FUNDING = {
  PAYPAL: 'paypal',
  VENMO: 'venmo',
  ITAU: 'itau',
  CREDIT: 'credit',
  CARD: 'card',
  IDEAL: 'ideal',
  SEPA: 'sepa',
  BANCONTACT: 'bancontact',
  GIROPAY: 'giropay',
  SOFORT: 'sofort',
  EPS: 'eps',
  MYBANK: 'mybank',
  P24: 'p24',
  VERKKOPANKKI: 'verkkopankki',
  PAYU: 'payu',
  BLIK: 'blik',
  TRUSTLY: 'trustly',
  ZIMPLER: 'zimpler',
  MAXIMA: 'maxima',
  OXXO: 'oxxo',
  BOLETO: 'boleto',
  WECHATPAY: 'wechatpay'
};
var CARD = {
  VISA: 'visa',
  MASTERCARD: 'mastercard',
  AMEX: 'amex',
  DISCOVER: 'discover',
  HIPER: 'hiper',
  ELO: 'elo',
  JCB: 'jcb',
  CUP: 'cup'
};
// CONCATENATED MODULE: ./node_modules/@paypal/sdk-constants/src/defaults.js



var DEFAULT_COUNTRY = COUNTRY.US;
var DEFAULT_CURRENCY = CURRENCY.USD;
var DEFAULT_INTENT = INTENT.CAPTURE;
var DEFAULT_COMMIT = COMMIT.TRUE;
var DEFAULT_SALE_COMMIT = COMMIT.TRUE;
var DEFAULT_NONSALE_COMMIT = COMMIT.TRUE;
var DEFAULT_VAULT = VAULT.FALSE;
var DEFAULT_COMPONENTS = COMPONENTS.BUTTONS;
var DEFAULT_DEBUG = DEBUG.FALSE;
// CONCATENATED MODULE: ./node_modules/@paypal/sdk-constants/src/index.js








// CONCATENATED MODULE: ./src/constants.js
var SMART_PAYMENT_BUTTONS = 'smart-payment-buttons';
var constants_HEADERS = {
  AUTHORIZATION: 'authorization',
  CONTENT_TYPE: 'content-type',
  ACCESS_TOKEN: 'x-paypal-internal-euat',
  CSRF_TOKEN: 'x-csrf-jwt',
  SOURCE: 'x-source',
  REQUESTED_BY: 'x-requested-by',
  PARTNER_ATTRIBUTION_ID: 'paypal-partner-attribution-id',
  CLIENT_METADATA_ID: 'paypal-client-metadata-id',
  PAYPAL_DEBUG_ID: 'paypal-debug-id'
};
var DATA_ATTRIBUTES = {
  FUNDING_SOURCE: 'data-funding-source',
  CARD: 'data-card',
  PAYMENT_METHOD_ID: 'data-payment-method-id',
  MENU: 'data-menu',
  NONCE: 'data-nonce'
};
var CLASS = {
  LOADING: 'paypal-button-loading',
  CLICKED: 'paypal-button-clicked'
};
var ORDER_API_ERROR = {
  INSTRUMENT_DECLINED: 'INSTRUMENT_DECLINED',
  PAYER_ACTION_REQUIRED: 'PAYER_ACTION_REQUIRED'
};
var CONTEXT = {
  IFRAME: 'iframe',
  POPUP: 'popup'
};
var TARGET_ELEMENT = {
  BODY: 'body'
};
var INTEGRATION_ARTIFACT = {
  PAYPAL_JS_SDK: 'PAYPAL_JS_SDK'
};
var USER_EXPERIENCE_FLOW = {
  INCONTEXT: 'INCONTEXT',
  INLINE: 'INLINE'
};
var DOM_EVENT = {
  MOUSEDOWN: 'mousedown',
  HOVER: 'hover'
};
var PRODUCT_FLOW = {
  SMART_PAYMENT_BUTTONS: 'SMART_PAYMENT_BUTTONS'
};
var FPTI_CONTEXT_TYPE = {
  BUTTON_SESSION_ID: 'button_session_id',
  ORDER_ID: 'EC-Token',
  PAYMENT_ID: 'Pay-ID'
};
var FPTI_STATE = {
  BUTTON: 'smart_button'
};
var FPTI_TRANSITION = {
  BUTTON_LOAD: 'process_button_load',
  BUTTON_CLICK: 'process_button_click',
  CREATE_ORDER: 'process_create_order',
  RECEIVE_ORDER: 'process_receive_order',
  CREATE_PAYMENT: 'process_create_payment',
  CHECKOUT_SHIPPING_CHANGE: 'process_checkout_shipping_change',
  CHECKOUT_AUTHORIZE: 'process_checkout_authorize',
  CHECKOUT_CANCEL: 'process_checkout_cancel',
  NATIVE_DETECT_APP_SWITCH: 'native_detect_app_switch',
  NATIVE_DETECT_WEB_SWITCH: 'native_detect_web_switch',
  NATIVE_APP_SWITCH_ACK: 'native_app_switch_ack',
  NATIVE_ERROR: 'native_app_switch_ack'
};
var FPTI_BUTTON_TYPE = {
  IFRAME: 'iframe'
};
var FTPI_BUTTON_KEY = {
  BUTTON_LAYOUT: 'button_layout',
  BUTTON_COLOR: 'button_color',
  BUTTON_SIZE: 'button_size',
  BUTTON_SHAPE: 'button_shape',
  BUTTON_LABEL: 'button_label',
  BUTTON_WIDTH: 'button_width',
  BUTTON_TYPE: 'button_type',
  BUTTON_TAGLINE_ENABLED: 'button_tagline_enabled'
};
var USER_ACTION = {
  COMMIT: 'commit',
  CONTINUE: 'continue'
};
// CONCATENATED MODULE: ./src/lib/util.js



function unresolvedPromise() {
  return new promise_ZalgoPromise(src_util_noop);
}
function promiseNoop() {
  // eslint-disable-line no-unused-vars
  return promise_ZalgoPromise.resolve();
}
function getBody() {
  var body = document.body;

  if (!body) {
    throw new Error("Document body not found");
  }

  return body;
}
function sendBeacon(url) {
  var img = document.createElement('img');
  img.src = url;
  img.style.visibility = 'hidden';
  img.style.position = 'absolute';

  if (document.body) {
    document.body.appendChild(img);
  }
}
function fixClickFocus(el) {
  el.addEventListener(DOM_EVENT.MOUSEDOWN, function () {
    el.classList.add(CLASS.CLICKED);
  });
  el.addEventListener(DOM_EVENT.HOVER, function (event) {
    if (el.classList.contains(CLASS.CLICKED)) {
      event.preventDefault();
      el.blur();
      el.classList.remove(CLASS.CLICKED);
    }
  });
}
function sleep(time) {
  return new promise_ZalgoPromise(function (resolve) {
    setTimeout(resolve, time);
  });
}
function redirectTop(url) {
  if (false) {} else {
    window.top.location = url;
  }
}
function loadScript(url) {
  return new promise_ZalgoPromise(function (resolve, reject) {
    var container = document.body || document.head;

    if (!container) {
      return reject(new Error("Can not find container for script: " + url));
    }

    var script = document.createElement('script');
    script.setAttribute('src', url);
    script.addEventListener('load', function () {
      return resolve(script);
    }); // $FlowFixMe

    script.addEventListener('error', function (err) {
      return reject(err);
    });
    container.appendChild(script);
  });
}
function promiseOne(promises) {
  return new promise_ZalgoPromise(function (resolve, reject) {
    for (var _i2 = 0; _i2 < promises.length; _i2++) {
      var promise = promises[_i2];
      promise.then(resolve, reject);
    }
  });
}
// CONCATENATED MODULE: ./node_modules/beaver-logger/src/constants.js
var LOG_LEVEL = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
};
var constants_PROTOCOL = {
  FILE: 'file:'
};
// CONCATENATED MODULE: ./node_modules/beaver-logger/src/config.js

var AUTO_FLUSH_LEVEL = [LOG_LEVEL.WARN, LOG_LEVEL.ERROR];
var LOG_LEVEL_PRIORITY = [LOG_LEVEL.ERROR, LOG_LEVEL.WARN, LOG_LEVEL.INFO, LOG_LEVEL.DEBUG];
var FLUSH_INTERVAL = 60 * 1000;
var DEFAULT_LOG_LEVEL =  false ? undefined : LOG_LEVEL.WARN;
// CONCATENATED MODULE: ./node_modules/beaver-logger/src/logger.js






function httpTransport(_ref) {
  var url = _ref.url,
      method = _ref.method,
      headers = _ref.headers,
      json = _ref.json;
  return request({
    url: url,
    method: method,
    headers: headers,
    json: json
  }).then(src_util_noop);
}

function extendIfDefined(target, source) {
  for (var key in source) {
    if (source.hasOwnProperty(key) && source[key] && !target[key]) {
      target[key] = source[key];
    }
  }
}

function Logger(_ref2) {
  var url = _ref2.url,
      prefix = _ref2.prefix,
      _ref2$logLevel = _ref2.logLevel,
      logLevel = _ref2$logLevel === void 0 ? DEFAULT_LOG_LEVEL : _ref2$logLevel,
      _ref2$transport = _ref2.transport,
      transport = _ref2$transport === void 0 ? httpTransport : _ref2$transport,
      _ref2$flushInterval = _ref2.flushInterval,
      flushInterval = _ref2$flushInterval === void 0 ? FLUSH_INTERVAL : _ref2$flushInterval;
  var events = [];
  var tracking = [];
  var payloadBuilders = [];
  var metaBuilders = [];
  var trackingBuilders = [];
  var headerBuilders = [];

  function print(level, event, payload) {
    if (!dom_isBrowser() || !window.console || !window.console.log) {
      return;
    }

    if (LOG_LEVEL_PRIORITY.indexOf(level) > LOG_LEVEL_PRIORITY.indexOf(logLevel)) {
      return;
    }

    var args = [event];
    args.push(payload);

    if (payload.error || payload.warning) {
      args.push('\n\n', payload.error || payload.warning);
    }

    try {
      if (window.console[level] && window.console[level].apply) {
        window.console[level].apply(window.console, args);
      } else if (window.console.log && window.console.log.apply) {
        window.console.log.apply(window.console, args);
      }
    } catch (err) {// pass
    }
  }

  function immediateFlush() {
    return promise_ZalgoPromise.try(function () {
      if (!dom_isBrowser() || window.location.protocol === constants_PROTOCOL.FILE) {
        return;
      }

      if (!events.length && !tracking.length) {
        return;
      }

      var meta = {};

      for (var _i2 = 0; _i2 < metaBuilders.length; _i2++) {
        var builder = metaBuilders[_i2];
        extendIfDefined(meta, builder(meta));
      }

      var headers = {};

      for (var _i4 = 0; _i4 < headerBuilders.length; _i4++) {
        var _builder = headerBuilders[_i4];
        extendIfDefined(headers, _builder(headers));
      }

      var req = transport({
        method: 'POST',
        url: url,
        headers: headers,
        json: {
          events: events,
          meta: meta,
          tracking: tracking
        }
      });
      events = [];
      tracking = [];
      return req.then(src_util_noop);
    });
  }

  var flush = promiseDebounce(immediateFlush);

  function enqueue(level, event, payload) {
    events.push({
      level: level,
      event: event,
      payload: payload
    });

    if (AUTO_FLUSH_LEVEL.indexOf(level) !== -1) {
      flush();
    }
  }

  function log(level, event, payload) {
    if (payload === void 0) {
      payload = {};
    }

    if (!dom_isBrowser()) {
      return logger; // eslint-disable-line no-use-before-define
    }

    if (prefix) {
      event = prefix + "_" + event;
    }

    var logPayload = _extends({}, objFilter(payload), {
      timestamp: Date.now().toString()
    });

    for (var _i6 = 0; _i6 < payloadBuilders.length; _i6++) {
      var builder = payloadBuilders[_i6];
      extendIfDefined(logPayload, builder(logPayload));
    }

    enqueue(level, event, logPayload);
    print(level, event, logPayload);
    return logger; // eslint-disable-line no-use-before-define
  }

  function addBuilder(builders, builder) {
    builders.push(builder);
    return logger; // eslint-disable-line no-use-before-define
  }

  function addPayloadBuilder(builder) {
    return addBuilder(payloadBuilders, builder);
  }

  function addMetaBuilder(builder) {
    return addBuilder(metaBuilders, builder);
  }

  function addTrackingBuilder(builder) {
    return addBuilder(trackingBuilders, builder);
  }

  function addHeaderBuilder(builder) {
    return addBuilder(headerBuilders, builder);
  }

  function debug(event, payload) {
    return log(LOG_LEVEL.DEBUG, event, payload);
  }

  function info(event, payload) {
    return log(LOG_LEVEL.INFO, event, payload);
  }

  function warn(event, payload) {
    return log(LOG_LEVEL.WARN, event, payload);
  }

  function error(event, payload) {
    return log(LOG_LEVEL.ERROR, event, payload);
  }

  function track(payload) {
    if (payload === void 0) {
      payload = {};
    }

    if (!dom_isBrowser()) {
      return logger; // eslint-disable-line no-use-before-define
    }

    var trackingPayload = objFilter(payload);

    for (var _i8 = 0; _i8 < trackingBuilders.length; _i8++) {
      var builder = trackingBuilders[_i8];
      extendIfDefined(trackingPayload, builder(trackingPayload));
    }

    print(LOG_LEVEL.DEBUG, 'track', trackingPayload);
    tracking.push(trackingPayload);
    return logger; // eslint-disable-line no-use-before-define
  }

  function setTransport(newTransport) {
    transport = newTransport;
    return logger; // eslint-disable-line no-use-before-define
  }

  if (dom_isBrowser()) {
    safeInterval(flush, flushInterval);
  }

  var logger = {
    debug: debug,
    info: info,
    warn: warn,
    error: error,
    track: track,
    flush: flush,
    immediateFlush: immediateFlush,
    addPayloadBuilder: addPayloadBuilder,
    addMetaBuilder: addMetaBuilder,
    addTrackingBuilder: addTrackingBuilder,
    addHeaderBuilder: addHeaderBuilder,
    setTransport: setTransport
  };
  return logger;
}
// CONCATENATED MODULE: ./node_modules/beaver-logger/src/index.js


// CONCATENATED MODULE: ./src/config.js
var _NATIVE_CHECKOUT_URI, _NATIVE_CHECKOUT_POPU;


var LOGGER_URL = '/xoplatform/logger/api/logger';
var AUTH_API_URL = '/v1/oauth2/token';
var ORDERS_API_URL = '/v2/checkout/orders';
var PAYMENTS_API_URL = '/v1/payments/payment';
var CREATE_SUBSCRIPTIONS_API_URL = '/v1/billing/subscriptions';
var VALIDATE_PAYMENT_METHOD_API = 'validate-payment-method';
var BASE_SMART_API_URL = '/smart/api';
var SMART_API_URI = {
  AUTH: BASE_SMART_API_URL + "/auth",
  CHECKOUT: BASE_SMART_API_URL + "/checkout",
  ORDER: BASE_SMART_API_URL + "/order",
  PAYMENT: BASE_SMART_API_URL + "/payment",
  SUBSCRIPTION: BASE_SMART_API_URL + "/billagmt/subscriptions"
};
var GRAPHQL_URI = '/graphql';
var WEB_CHECKOUT_URI = '/checkoutnow';
var NATIVE_CHECKOUT_URI = (_NATIVE_CHECKOUT_URI = {}, _NATIVE_CHECKOUT_URI[FUNDING.PAYPAL] = '/smart/checkout/native', _NATIVE_CHECKOUT_URI[FUNDING.VENMO] = '/smart/checkout/venmo', _NATIVE_CHECKOUT_URI);
var NATIVE_CHECKOUT_POPUP_URI = (_NATIVE_CHECKOUT_POPU = {}, _NATIVE_CHECKOUT_POPU[FUNDING.PAYPAL] = '/smart/checkout/native/popup', _NATIVE_CHECKOUT_POPU[FUNDING.VENMO] = '/smart/checkout/venmo/popup', _NATIVE_CHECKOUT_POPU);
var NATIVE_DETECTION_URL = 'http://127.0.0.1:8765/hello';
var CLIENT_ID_PAYEE_NO_MATCH = ['Af3YaeRfoJGtncwLeiahT93xTYT0-wldEEaiGehhGspP333r6tADvHeVCwZPR022F4d0YQquv7Lik_PT', 'AbHo6hBEDmCHulDhRMkCVk7FDed5zE1-mNo7SQvo_yxeLvGylM5mGh5IOjx0AV9sTHhHDjD4A443Dybb', 'AcjM7hAZjUAqIgU0Lvzneb9-_rWs7qAEl6PoPVHtQV5PNmWBihQWsu_SglKO', 'Af_pMiA6ikCtlsNB8dJW1oG1ZI7FirXbRU43rDRfq_i_iQAPbYsojeI9Q2VzZvD1u2wKEPuaokZaNWyC', 'AQAZZuAP5V0b8Wzs1t3KJM3opK8ueK6Txnlm7pw6kMFHrcAdFogBw3pBmeNP-234aHAZ2BlHeijkU2Tt', 'Aef8KpflK3t-pTjstogUtqzAuk1IRGHpkdBTxyTWeARwqXyuRrX5Uj-Bs6KdMwK1g8ZhitjzfJ5jh6K7', 'ARcLSr40hevzVXTnnNpHochqg9lsyznO2UugwjyCpt4MPnAmxgyLGC2Ia7aufLH1jS8BhOIZBnXqhOfP', 'AYiXLQVgLszolhHbiYAm2HZERgDF5BOPXG7i4m9BNsTTSdmWhVu2Np4_GqDJLrl5VA50VDAlMMpCMArb', 'ARbpxmp0udlm2zBPu6bqW6PAMV-UfCTktgWFtJ0cy1rKQUUtIRffwg1A-i0wRyFg9BhbfZM3M6ci6czP', 'AeHvO7dLYAlLLnkZWxCTvHgSBMoFRn-bu1Wy9kjEXZVb8wYZPRpEykxDhLQ0WjgUPQz_MeF1e1FnH4mT', 'Abi2EEJv7o1v6GKAE1nNVgeNqBWLYXSiDoAKi-ADKU6uRPi_41GJEMr5rjZC8fuQxAC-MVEPYSfYsfzD', 'AW9fGl1zpjGSB474VARpj8j0hyEzrwNY7WgJCtwStaVVYkiyixnX4Z3KSe9A0jPLOcKj_2B9lHon1nAR', 'ARBlYB7bfFnpO5IgprEW0PqtBSZOn1Q0Jly-3r_IzMEU8sPq0fdNrk1D4JgHAitxDBxfuL6wDpDvTZgU', 'AZNQsMt_Ho-GClAUCvZVuKyz-n5rRhZyEBL2yTTetPV-lTqQE2_4quG6-ADlBMZoAgnG-yccas62Hqg2'];
var FIREBASE_SCRIPTS = {
  APP: 'https://www.paypalobjects.com/checkout/js/lib/firebase-app.js',
  AUTH: 'https://www.paypalobjects.com/checkout/js/lib/firebase-auth.js',
  DATABASE: 'https://www.paypalobjects.com/checkout/js/lib/firebase-database.js'
};
var ENABLE_PAYMENT_API = false;
// CONCATENATED MODULE: ./src/lib/logger.js






function getLogger() {
  return inlineMemoize(getLogger, function () {
    return Logger({
      url: LOGGER_URL
    });
  });
}
function setupLogger(_ref) {
  var env = _ref.env,
      sessionID = _ref.sessionID,
      buttonSessionID = _ref.buttonSessionID,
      clientID = _ref.clientID,
      partnerAttributionID = _ref.partnerAttributionID,
      commit = _ref.commit,
      correlationID = _ref.correlationID,
      locale = _ref.locale,
      merchantID = _ref.merchantID,
      merchantDomain = _ref.merchantDomain,
      version = _ref.version;
  var logger = getLogger();
  logger.addPayloadBuilder(function () {
    return {
      referer: window.location.host,
      buttonSessionID: buttonSessionID,
      sessionID: sessionID,
      env: env
    };
  });
  logger.addTrackingBuilder(function () {
    var _ref2;

    var lang = locale.lang,
        country = locale.country;
    return _ref2 = {}, _ref2[FPTI_KEY.STATE] = FPTI_STATE.BUTTON, _ref2[FPTI_KEY.CONTEXT_TYPE] = FPTI_CONTEXT_TYPE.BUTTON_SESSION_ID, _ref2[FPTI_KEY.CONTEXT_ID] = buttonSessionID, _ref2[FPTI_KEY.STATE] = FPTI_STATE.BUTTON, _ref2[FPTI_KEY.FEED] = FPTI_FEED.PAYMENTS_SDK, _ref2[FPTI_KEY.DATA_SOURCE] = FPTI_DATA_SOURCE.PAYMENTS_SDK, _ref2[FPTI_KEY.CLIENT_ID] = clientID, _ref2[FPTI_KEY.SELLER_ID] = merchantID[0], _ref2[FPTI_KEY.BUTTON_SESSION_UID] = buttonSessionID, _ref2[FPTI_KEY.SESSION_UID] = sessionID, _ref2[FPTI_KEY.REFERER] = window.location.host, _ref2[FPTI_KEY.MERCHANT_DOMAIN] = merchantDomain, _ref2[FPTI_KEY.LOCALE] = lang + "_" + country, _ref2[FPTI_KEY.INTEGRATION_IDENTIFIER] = clientID, _ref2[FPTI_KEY.PARTNER_ATTRIBUTION_ID] = partnerAttributionID, _ref2[FPTI_KEY.SDK_NAME] = FPTI_SDK_NAME.PAYMENTS_SDK, _ref2[FPTI_KEY.SDK_VERSION] = version, _ref2[FPTI_KEY.USER_AGENT] = window.navigator && window.navigator.userAgent, _ref2[FPTI_KEY.USER_ACTION] = commit ? FPTI_USER_ACTION.COMMIT : FPTI_USER_ACTION.CONTINUE, _ref2[FPTI_KEY.CONTEXT_CORRID] = correlationID, _ref2[FPTI_KEY.BUTTON_VERSION] = "2.0.185", _ref2;
  });
  promise_ZalgoPromise.onPossiblyUnhandledException(function (err) {
    var _logger$track;

    logger.track((_logger$track = {}, _logger$track[FPTI_KEY.ERROR_CODE] = 'payments_sdk_error', _logger$track[FPTI_KEY.ERROR_DESC] = stringifyErrorMessage(err), _logger$track));
    logger.error('unhandled_error', {
      err: stringifyError(err)
    }); // eslint-disable-next-line promise/no-promise-in-callback

    logger.flush().catch(src_util_noop);
  });
}
// CONCATENATED MODULE: ./src/lib/index.js


// CONCATENATED MODULE: ./src/button/props/types.js

// export something to force webpack to see this as an ES module
var props_types_TYPES = true;
// CONCATENATED MODULE: ./src/button/dom.js



function getButtons() {
  return querySelectorAll("[ " + DATA_ATTRIBUTES.FUNDING_SOURCE + " ]");
}
function getSelectedFunding(button) {
  var fundingSource = button.getAttribute(DATA_ATTRIBUTES.FUNDING_SOURCE);
  var paymentMethodID = button.getAttribute(DATA_ATTRIBUTES.PAYMENT_METHOD_ID);
  var card = button.getAttribute(DATA_ATTRIBUTES.CARD); // $FlowFixMe

  return {
    fundingSource: fundingSource,
    card: card,
    paymentMethodID: paymentMethodID
  };
}
function enableLoadingSpinner(button) {
  button.classList.add(CLASS.LOADING);
}
function disableLoadingSpinner(button) {
  button.classList.remove(CLASS.LOADING);
}
function getNonce() {
  var nonce = '';

  if (document.body) {
    nonce = document.body.getAttribute("" + DATA_ATTRIBUTES.NONCE) || '';
  }

  return nonce;
}
// CONCATENATED MODULE: ./src/button/props/onInit.js

function buildXOnInitData() {
  // $FlowFixMe
  return {};
}
function buildXOnInitActions(set) {
  return {
    enable: function enable() {
      return promise_ZalgoPromise.try(function () {
        return set(true);
      });
    },
    disable: function disable() {
      return promise_ZalgoPromise.try(function () {
        return set(false);
      });
    }
  };
}
function getOnInit(xprops) {
  var onInit = xprops.onInit;
  return function () {
    var enabled = true;
    var initPromise = promise_ZalgoPromise.try(function () {
      if (onInit) {
        return onInit(buildXOnInitData(), buildXOnInitActions(function (val) {
          enabled = val;
        }));
      }
    });
    return {
      initPromise: initPromise,
      isEnabled: function isEnabled() {
        return enabled;
      }
    };
  };
}
// CONCATENATED MODULE: ./src/api/api.js





function callRestAPI(_ref) {
  var _extends2;

  var accessToken = _ref.accessToken,
      method = _ref.method,
      url = _ref.url,
      data = _ref.data,
      headers = _ref.headers;

  if (!accessToken) {
    throw new Error("No access token passed to " + url);
  }

  var requestHeaders = _extends((_extends2 = {}, _extends2[constants_HEADERS.AUTHORIZATION] = "Bearer " + accessToken, _extends2[constants_HEADERS.CONTENT_TYPE] = "application/json", _extends2), headers);

  return request({
    method: method,
    url: url,
    headers: requestHeaders,
    json: data
  }).then(function (_ref2) {
    var status = _ref2.status,
        body = _ref2.body,
        responseHeaders = _ref2.headers;

    if (status >= 300) {
      throw new Error(url + " returned status: " + status + " (Corr ID: " + responseHeaders[constants_HEADERS.PAYPAL_DEBUG_ID] + ")");
    }

    return body;
  });
}
function callSmartAPI(_ref3) {
  var _reqHeaders;

  var accessToken = _ref3.accessToken,
      url = _ref3.url,
      _ref3$method = _ref3.method,
      method = _ref3$method === void 0 ? 'get' : _ref3$method,
      json = _ref3.json;
  var reqHeaders = (_reqHeaders = {}, _reqHeaders[constants_HEADERS.REQUESTED_BY] = SMART_PAYMENT_BUTTONS, _reqHeaders);

  if (accessToken) {
    reqHeaders[constants_HEADERS.ACCESS_TOKEN] = accessToken;
  }

  return request({
    url: url,
    method: method,
    headers: reqHeaders,
    json: json
  }).then(function (_ref4) {
    var status = _ref4.status,
        body = _ref4.body,
        headers = _ref4.headers;

    if (body.ack === 'contingency') {
      var err = new Error(body.contingency); // $FlowFixMe

      err.data = body.data;
      throw err;
    }

    if (status > 400) {
      throw new Error("Api: " + url + " returned status code: " + status + " (Corr ID: " + headers[constants_HEADERS.PAYPAL_DEBUG_ID] + ")");
    }

    if (body.ack !== 'success') {
      throw new Error("Api: " + url + " returned ack: " + body.ack + " (Corr ID: " + headers[constants_HEADERS.PAYPAL_DEBUG_ID] + ")");
    }

    return body.data;
  });
}
function callGraphQL(_ref5) {
  var query = _ref5.query,
      _ref5$variables = _ref5.variables,
      variables = _ref5$variables === void 0 ? {} : _ref5$variables,
      _ref5$headers = _ref5.headers,
      headers = _ref5$headers === void 0 ? {} : _ref5$headers;
  return request({
    url: GRAPHQL_URI,
    method: 'POST',
    json: {
      query: query,
      variables: variables
    },
    headers: _extends({
      'x-app-name': SMART_PAYMENT_BUTTONS
    }, headers)
  }).then(function (_ref6) {
    var status = _ref6.status,
        body = _ref6.body;
    var errors = body.errors || [];

    if (errors.length) {
      var message = errors[0].message || JSON.stringify(errors[0]);
      throw new Error(message);
    }

    if (status !== 200) {
      throw new Error(GRAPHQL_URI + " returned status " + status);
    }

    return body.data;
  });
}
// CONCATENATED MODULE: ./src/api/auth.js






function createAccessToken(clientID) {
  return inlineMemoize(createAccessToken, function () {
    getLogger().info("rest_api_create_access_token");
    var basicAuth = base64encode(clientID + ":");
    return request({
      method: "post",
      url: AUTH_API_URL,
      headers: {
        Authorization: "Basic " + basicAuth
      },
      data: {
        grant_type: "client_credentials"
      }
    }).then(function (_ref) {
      var body = _ref.body;

      if (body && body.error === 'invalid_client') {
        throw new Error("Auth Api invalid client id: " + clientID + ":\n\n" + JSON.stringify(body, null, 4));
      }

      if (!body || !body.access_token) {
        throw new Error("Auth Api response error:\n\n" + JSON.stringify(body, null, 4));
      }

      return body.access_token;
    });
  }, [clientID]);
}
function getFirebaseSessionToken(sessionUID) {
  return callGraphQL({
    query: "\n            query GetFireBaseSessionToken($sessionUID: String!) {\n                firebase {\n                    auth(sessionUID: $sessionUID) {\n                        sessionToken\n                    }\n                }\n            }\n        ",
    variables: {
      sessionUID: sessionUID
    }
  }).then(function (res) {
    return res.firebase.auth.sessionToken;
  });
}
function upgradeFacilitatorAccessToken(facilitatorAccessToken, _ref2) {
  var _headers;

  var buyerAccessToken = _ref2.buyerAccessToken,
      orderID = _ref2.orderID;
  return callGraphQL({
    headers: (_headers = {}, _headers[constants_HEADERS.ACCESS_TOKEN] = buyerAccessToken, _headers),
    query: "\n            mutation UpgradeFacilitatorAccessToken(\n                $orderID: String!\n                $buyerAccessToken: String!\n                $facilitatorAccessToken: String!\n            ) {\n                upgradeLowScopeAccessToken(\n                    token: $orderID\n                    buyerAccessToken: $buyerAccessToken\n                    merchantLSAT: $facilitatorAccessToken\n                )\n            }\n        ",
    variables: {
      facilitatorAccessToken: facilitatorAccessToken,
      buyerAccessToken: buyerAccessToken,
      orderID: orderID
    }
  }).then(src_util_noop);
}
// CONCATENATED MODULE: ./src/api/order.js






function createOrderID(order, _ref) {
  var _headers;

  var facilitatorAccessToken = _ref.facilitatorAccessToken,
      partnerAttributionID = _ref.partnerAttributionID;
  getLogger().info("rest_api_create_order_id");
  return callRestAPI({
    accessToken: facilitatorAccessToken,
    method: "post",
    url: "" + ORDERS_API_URL,
    data: order,
    headers: (_headers = {}, _headers[constants_HEADERS.PARTNER_ATTRIBUTION_ID] = partnerAttributionID || '', _headers)
  }).then(function (body) {
    var _getLogger$track;

    var orderID = body && body.id;

    if (!orderID) {
      throw new Error("Order Api response error:\n\n" + JSON.stringify(body, null, 4));
    }

    getLogger().track((_getLogger$track = {}, _getLogger$track[FPTI_KEY.TRANSITION] = FPTI_TRANSITION.CREATE_ORDER, _getLogger$track[FPTI_KEY.CONTEXT_TYPE] = FPTI_CONTEXT_TYPE.ORDER_ID, _getLogger$track[FPTI_KEY.TOKEN] = orderID, _getLogger$track[FPTI_KEY.CONTEXT_ID] = orderID, _getLogger$track));
    return orderID;
  });
}
function getOrder(orderID, _ref2) {
  var _headers2;

  var facilitatorAccessToken = _ref2.facilitatorAccessToken,
      buyerAccessToken = _ref2.buyerAccessToken,
      partnerAttributionID = _ref2.partnerAttributionID,
      _ref2$forceRestAPI = _ref2.forceRestAPI,
      forceRestAPI = _ref2$forceRestAPI === void 0 ? false : _ref2$forceRestAPI;
  return forceRestAPI ? callRestAPI({
    accessToken: facilitatorAccessToken,
    url: ORDERS_API_URL + "/" + orderID,
    headers: (_headers2 = {}, _headers2[constants_HEADERS.PARTNER_ATTRIBUTION_ID] = partnerAttributionID || '', _headers2)
  }) : callSmartAPI({
    accessToken: buyerAccessToken,
    url: SMART_API_URI.ORDER + "/" + orderID
  });
}
function captureOrder(orderID, _ref3) {
  var _headers3;

  var facilitatorAccessToken = _ref3.facilitatorAccessToken,
      buyerAccessToken = _ref3.buyerAccessToken,
      partnerAttributionID = _ref3.partnerAttributionID,
      _ref3$forceRestAPI = _ref3.forceRestAPI,
      forceRestAPI = _ref3$forceRestAPI === void 0 ? false : _ref3$forceRestAPI;
  return forceRestAPI ? callRestAPI({
    accessToken: facilitatorAccessToken,
    method: "post",
    url: ORDERS_API_URL + "/" + orderID + "/capture",
    headers: (_headers3 = {}, _headers3[constants_HEADERS.PARTNER_ATTRIBUTION_ID] = partnerAttributionID || '', _headers3)
  }) : callSmartAPI({
    accessToken: buyerAccessToken,
    method: 'post',
    url: SMART_API_URI.ORDER + "/" + orderID + "/capture"
  });
}
function authorizeOrder(orderID, _ref4) {
  var _headers4;

  var facilitatorAccessToken = _ref4.facilitatorAccessToken,
      buyerAccessToken = _ref4.buyerAccessToken,
      partnerAttributionID = _ref4.partnerAttributionID,
      _ref4$forceRestAPI = _ref4.forceRestAPI,
      forceRestAPI = _ref4$forceRestAPI === void 0 ? false : _ref4$forceRestAPI;
  return forceRestAPI ? callRestAPI({
    accessToken: facilitatorAccessToken,
    method: "post",
    url: ORDERS_API_URL + "/" + orderID + "/authorize",
    headers: (_headers4 = {}, _headers4[constants_HEADERS.PARTNER_ATTRIBUTION_ID] = partnerAttributionID || '', _headers4)
  }) : callSmartAPI({
    accessToken: buyerAccessToken,
    method: 'post',
    url: SMART_API_URI.ORDER + "/" + orderID + "/authorize"
  });
}
function patchOrder(orderID, data, _ref5) {
  var _headers5;

  var facilitatorAccessToken = _ref5.facilitatorAccessToken,
      buyerAccessToken = _ref5.buyerAccessToken,
      partnerAttributionID = _ref5.partnerAttributionID,
      _ref5$forceRestAPI = _ref5.forceRestAPI,
      forceRestAPI = _ref5$forceRestAPI === void 0 ? false : _ref5$forceRestAPI;
  var patchData = Array.isArray(data) ? {
    patch: data
  } : data;
  return forceRestAPI ? callRestAPI({
    accessToken: facilitatorAccessToken,
    method: "patch",
    url: ORDERS_API_URL + "/" + orderID,
    data: patchData,
    headers: (_headers5 = {}, _headers5[constants_HEADERS.PARTNER_ATTRIBUTION_ID] = partnerAttributionID || '', _headers5)
  }) : callSmartAPI({
    accessToken: buyerAccessToken,
    method: 'post',
    url: SMART_API_URI.ORDER + "/" + orderID + "/patch",
    json: {
      data: patchData
    }
  });
}
function getPayee(orderID) {
  return callSmartAPI({
    url: SMART_API_URI.CHECKOUT + "/" + orderID + "/payee"
  });
}
var VALIDATE_CONTINGENCIES = {
  THREE_DOMAIN_SECURE: '3D_SECURE'
};
function validatePaymentMethod(_ref6) {
  var _headers6;

  var clientAccessToken = _ref6.clientAccessToken,
      orderID = _ref6.orderID,
      paymentMethodID = _ref6.paymentMethodID,
      enableThreeDomainSecure = _ref6.enableThreeDomainSecure,
      partnerAttributionID = _ref6.partnerAttributionID,
      buttonSessionID = _ref6.buttonSessionID;
  getLogger().info("rest_api_create_order_token");
  var headers = (_headers6 = {}, _headers6[constants_HEADERS.AUTHORIZATION] = "Bearer " + clientAccessToken, _headers6[constants_HEADERS.PARTNER_ATTRIBUTION_ID] = partnerAttributionID, _headers6[constants_HEADERS.CLIENT_METADATA_ID] = buttonSessionID, _headers6);
  var paymentSource = {
    token: {
      id: paymentMethodID,
      type: 'NONCE'
    }
  };

  if (enableThreeDomainSecure) {
    paymentSource.contingencies = [VALIDATE_CONTINGENCIES.THREE_DOMAIN_SECURE];
  }

  var json = {
    payment_source: paymentSource
  };
  return request({
    method: "post",
    url: ORDERS_API_URL + "/" + orderID + "/" + VALIDATE_PAYMENT_METHOD_API,
    headers: headers,
    json: json
  });
}
function billingTokenToOrderID(billingToken) {
  return callSmartAPI({
    method: 'post',
    url: SMART_API_URI.PAYMENT + "/" + billingToken + "/ectoken"
  }).then(function (data) {
    return data.token;
  });
}
function subscriptionIdToCartId(subscriptionID) {
  return callSmartAPI({
    method: 'post',
    url: SMART_API_URI.SUBSCRIPTION + "/" + subscriptionID + "/cartid"
  }).then(function (data) {
    return data.token;
  });
}
function enableVault(_ref7) {
  var _headers7;

  var orderID = _ref7.orderID,
      clientAccessToken = _ref7.clientAccessToken;
  return callGraphQL({
    query: "\n            mutation EnableVault(\n                $orderID : String!\n            ) {\n                enableVault(\n                    token: $orderID\n                )\n            }\n        ",
    variables: {
      orderID: orderID
    },
    headers: (_headers7 = {}, _headers7[constants_HEADERS.ACCESS_TOKEN] = clientAccessToken, _headers7)
  });
}
function deleteVault(_ref8) {
  var _headers8;

  var paymentMethodID = _ref8.paymentMethodID,
      clientAccessToken = _ref8.clientAccessToken;
  return callGraphQL({
    query: "\n            mutation DeleteVault(\n                $paymentMethodID : String!\n            ) {\n                deleteVault(\n                    paymentMethodID: $paymentMethodID\n                )\n            }\n        ",
    variables: {
      paymentMethodID: paymentMethodID
    },
    headers: (_headers8 = {}, _headers8[constants_HEADERS.ACCESS_TOKEN] = clientAccessToken, _headers8)
  });
}
function updateClientConfig(_ref9) {
  var orderID = _ref9.orderID,
      fundingSource = _ref9.fundingSource,
      integrationArtifact = _ref9.integrationArtifact,
      userExperienceFlow = _ref9.userExperienceFlow,
      productFlow = _ref9.productFlow;
  return callGraphQL({
    query: "\n            mutation UpdateClientConfig(\n                $orderID : String!,\n                $fundingSource : ButtonFundingSourceType!,\n                $integrationArtifact : IntegrationArtifactType!,\n                $userExperienceFlow : UserExperienceFlowType!,\n                $productFlow : ProductFlowType!\n            ) {\n                updateClientConfig(\n                    token: $orderID,\n                    fundingSource: $fundingSource,\n                    integrationArtifact: $integrationArtifact,\n                    userExperienceFlow: $userExperienceFlow,\n                    productFlow: $productFlow\n                )\n            }\n        ",
    variables: {
      orderID: orderID,
      fundingSource: fundingSource,
      integrationArtifact: integrationArtifact,
      userExperienceFlow: userExperienceFlow,
      productFlow: productFlow
    }
  }).then(src_util_noop);
}
// CONCATENATED MODULE: ./src/api/payment.js





function createPayment(payment, _ref) {
  var _headers;

  var facilitatorAccessToken = _ref.facilitatorAccessToken,
      partnerAttributionID = _ref.partnerAttributionID;
  getLogger().info("rest_api_create_payment_id");
  return callRestAPI({
    accessToken: facilitatorAccessToken,
    method: "post",
    url: "" + PAYMENTS_API_URL,
    data: payment,
    headers: (_headers = {}, _headers[constants_HEADERS.PARTNER_ATTRIBUTION_ID] = partnerAttributionID || '', _headers)
  }).then(function (body) {
    var _getLogger$track;

    var paymentID = body && body.id;

    if (!paymentID) {
      throw new Error("Payment Api response error:\n\n" + JSON.stringify(body, null, 4));
    }

    getLogger().track((_getLogger$track = {}, _getLogger$track[FPTI_KEY.TRANSITION] = FPTI_TRANSITION.CREATE_PAYMENT, _getLogger$track[FPTI_KEY.CONTEXT_TYPE] = FPTI_CONTEXT_TYPE.PAYMENT_ID, _getLogger$track[FPTI_KEY.TOKEN] = paymentID, _getLogger$track[FPTI_KEY.CONTEXT_ID] = paymentID, _getLogger$track));
    return body;
  });
}
function createPaymentID(payment, _ref2) {
  var facilitatorAccessToken = _ref2.facilitatorAccessToken,
      partnerAttributionID = _ref2.partnerAttributionID;
  return createPayment(payment, {
    facilitatorAccessToken: facilitatorAccessToken,
    partnerAttributionID: partnerAttributionID
  }).then(function (res) {
    return res.id;
  });
}
function createPaymentToken(payment, _ref3) {
  var facilitatorAccessToken = _ref3.facilitatorAccessToken,
      partnerAttributionID = _ref3.partnerAttributionID;
  return createPayment(payment, {
    facilitatorAccessToken: facilitatorAccessToken,
    partnerAttributionID: partnerAttributionID
  }).then(function (res) {
    if (res.links && res.links.length) {
      for (var i = 0; i < res.links.length; i++) {
        if (res.links[i].method === 'REDIRECT' && res.links[i].rel === 'approval_url') {
          var match = res.links[i].href.match(/token=((EC-)?[A-Z0-9]{17})/);

          if (match) {
            return match[1];
          }
        }
      }
    }

    throw new Error("Could not find payment token");
  });
}
function getPayment(paymentID, _ref4) {
  var _headers2;

  var facilitatorAccessToken = _ref4.facilitatorAccessToken,
      buyerAccessToken = _ref4.buyerAccessToken,
      partnerAttributionID = _ref4.partnerAttributionID;
  return buyerAccessToken ? callSmartAPI({
    accessToken: buyerAccessToken,
    url: SMART_API_URI.PAYMENT + "/" + paymentID
  }) : callRestAPI({
    accessToken: facilitatorAccessToken,
    url: PAYMENTS_API_URL + "/" + paymentID,
    headers: (_headers2 = {}, _headers2[constants_HEADERS.PARTNER_ATTRIBUTION_ID] = partnerAttributionID || '', _headers2)
  });
}
function executePayment(paymentID, payerID, _ref5) {
  var _headers3;

  var facilitatorAccessToken = _ref5.facilitatorAccessToken,
      buyerAccessToken = _ref5.buyerAccessToken,
      partnerAttributionID = _ref5.partnerAttributionID;
  return buyerAccessToken ? callSmartAPI({
    accessToken: buyerAccessToken,
    method: 'post',
    url: SMART_API_URI.PAYMENT + "/" + paymentID + "/execute",
    json: {
      data: {
        payer_id: payerID
      }
    }
  }) : callRestAPI({
    accessToken: facilitatorAccessToken,
    method: "post",
    url: PAYMENTS_API_URL + "/" + paymentID + "/execute",
    headers: (_headers3 = {}, _headers3[constants_HEADERS.PARTNER_ATTRIBUTION_ID] = partnerAttributionID || '', _headers3),
    data: {
      payer_id: payerID
    }
  });
}
function patchPayment(paymentID, data, _ref6) {
  var _headers4;

  var facilitatorAccessToken = _ref6.facilitatorAccessToken,
      buyerAccessToken = _ref6.buyerAccessToken,
      partnerAttributionID = _ref6.partnerAttributionID;
  var patchData = Array.isArray(data) ? {
    patch: data
  } : data;
  return buyerAccessToken ? callSmartAPI({
    accessToken: buyerAccessToken,
    method: 'post',
    url: SMART_API_URI.ORDER + "/" + paymentID + "/patch",
    json: {
      data: patchData
    }
  }) : callRestAPI({
    accessToken: facilitatorAccessToken,
    method: "patch",
    url: PAYMENTS_API_URL + "/" + paymentID,
    data: patchData,
    headers: (_headers4 = {}, _headers4[constants_HEADERS.PARTNER_ATTRIBUTION_ID] = partnerAttributionID || '', _headers4)
  });
}
// CONCATENATED MODULE: ./src/api/subscription.js




function subscription_createSubscription(accessToken, subscriptionPayload, _ref) {
  var partnerAttributionID = _ref.partnerAttributionID;
  getLogger().info("rest_api_create_subscription_id");

  if (!accessToken) {
    throw new Error("Access token not passed");
  }

  if (!subscriptionPayload) {
    throw new Error("Expected subscription payload to be passed");
  }

  var headers = {
    'Authorization': "Bearer " + accessToken,
    'PayPal-Partner-Attribution-Id': partnerAttributionID
  };
  return request({
    method: "post",
    url: CREATE_SUBSCRIPTIONS_API_URL,
    headers: headers,
    json: subscriptionPayload
  }).then(function (_ref2) {
    var body = _ref2.body;

    if (!body || !body.id) {
      throw new Error("Create Subscription Api response error:\n\n" + JSON.stringify(body, null, 4));
    }

    return body.id;
  });
}
function reviseSubscription(accessToken, subscriptionID, subscriptionPayload, _ref3) {
  var partnerAttributionID = _ref3.partnerAttributionID;
  getLogger().info("rest_api_create_subscription_id");

  if (!accessToken) {
    throw new Error("Access token not passed");
  }

  if (!subscriptionID) {
    throw new Error("Expected subscription id to be passed as first argument to revise subscription api");
  }

  if (!subscriptionPayload) {
    throw new Error("Expected subscription payload to be passed");
  }

  var headers = {
    'Authorization': "Bearer " + accessToken,
    'PayPal-Partner-Attribution-Id': partnerAttributionID
  };
  return request({
    method: "post",
    url: CREATE_SUBSCRIPTIONS_API_URL + "/" + subscriptionID + "/revise",
    headers: headers,
    json: subscriptionPayload
  }).then(function (_ref4) {
    var body = _ref4.body,
        status = _ref4.status;

    if (status !== 200) {
      throw new Error("Revise Subscription Api HTTP-" + status + " response: error:\n\n" + JSON.stringify(body, null, 4));
    } // for revision flow the same subscription id is returned


    return subscriptionID;
  });
}
function activateSubscription(subscriptionID, _ref5) {
  var buyerAccessToken = _ref5.buyerAccessToken;
  return callSmartAPI({
    accessToken: buyerAccessToken,
    method: "post",
    url: SMART_API_URI.SUBSCRIPTION + "/" + subscriptionID + "/activate"
  });
}
function getSubscription(subscriptionID, _ref6) {
  var buyerAccessToken = _ref6.buyerAccessToken;
  return callSmartAPI({
    accessToken: buyerAccessToken,
    url: SMART_API_URI.SUBSCRIPTION + "/" + subscriptionID
  });
}
// CONCATENATED MODULE: ./src/api/socket.js


/* eslint unicorn/prefer-add-event-listener: off, max-lines: off */





var MESSAGE_TYPE = {
  REQUEST: 'request',
  RESPONSE: 'response'
};
var RESPONSE_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error'
};
function messageSocket(_ref) {
  var sessionUID = _ref.sessionUID,
      driver = _ref.driver,
      sourceApp = _ref.sourceApp,
      sourceAppVersion = _ref.sourceAppVersion,
      targetApp = _ref.targetApp,
      _ref$retry = _ref.retry,
      retry = _ref$retry === void 0 ? true : _ref$retry;
  var receivedMessages = {};
  var responseListeners = {};
  var activeRequests = [];
  var requestListeners = {};
  var errorListeners = [];

  var sendMessage = function sendMessage(socket, data) {
    var messageUID = uniqueID();
    receivedMessages[messageUID] = true;

    var message = _extends({
      session_uid: sessionUID,
      message_uid: messageUID,
      source_app: sourceApp,
      source_app_version: sourceAppVersion,
      target_app: targetApp
    }, data);

    socket.send(JSON.stringify(message));
  };

  var sendResponse = function sendResponse(socket, _ref2) {
    var messageName = _ref2.messageName,
        responseStatus = _ref2.responseStatus,
        responseData = _ref2.responseData,
        requestUID = _ref2.requestUID;

    if (!socket.isOpen()) {
      return;
    }

    return sendMessage(socket, {
      request_uid: requestUID,
      message_name: messageName,
      message_status: responseStatus,
      message_type: MESSAGE_TYPE.RESPONSE,
      message_data: responseData
    });
  };

  var onRequest = function onRequest(socket, _ref3) {
    var messageSessionUID = _ref3.messageSessionUID,
        requestUID = _ref3.requestUID,
        messageName = _ref3.messageName,
        messageData = _ref3.messageData;
    var activeRequest = new promise_ZalgoPromise();
    activeRequests.push(activeRequest);
    return promise_ZalgoPromise.try(function () {
      var requestListener = requestListeners[messageName];

      if (!requestListener) {
        throw new Error("No listener found for name: " + messageName);
      }

      var handler = requestListener.handler,
          requireSessionUID = requestListener.requireSessionUID;

      if (requireSessionUID && messageSessionUID !== sessionUID) {
        throw new Error("Incorrect sessionUID: " + (messageSessionUID || 'undefined'));
      }

      return handler({
        data: messageData
      });
    }).then(function (res) {
      sendResponse(socket, {
        responseStatus: RESPONSE_STATUS.SUCCESS,
        responseData: res,
        messageName: messageName,
        requestUID: requestUID
      });
    }, function (err) {
      var res = {
        message: err && err.message ? err.message : 'Unknown error'
      };
      sendResponse(socket, {
        responseStatus: RESPONSE_STATUS.ERROR,
        responseData: res,
        messageName: messageName,
        messageSessionUID: messageSessionUID,
        requestUID: requestUID
      });
    }).finally(function () {
      activeRequest.resolve();
      activeRequests.splice(activeRequests.indexOf(activeRequest), 1);
    });
  };

  var onResponse = function onResponse(_ref4) {
    var messageName = _ref4.messageName,
        requestUID = _ref4.requestUID,
        messageSessionUID = _ref4.messageSessionUID,
        responseStatus = _ref4.responseStatus,
        messageData = _ref4.messageData;

    var _ref5 = responseListeners[requestUID] || {},
        listenerPromise = _ref5.listenerPromise,
        requireSessionUID = _ref5.requireSessionUID;

    if (!listenerPromise) {
      throw new Error("Could not find response listener for " + messageName + " with id: " + requestUID);
    }

    if (requireSessionUID && messageSessionUID !== sessionUID) {
      throw new Error("Incorrect sessionUID: " + (messageSessionUID || 'undefined'));
    }

    delete responseListeners[requestUID];

    if (responseStatus === RESPONSE_STATUS.SUCCESS) {
      listenerPromise.resolve({
        data: messageData
      });
    } else if (responseStatus === RESPONSE_STATUS.ERROR) {
      listenerPromise.reject(new Error(messageData.message));
    } else {
      throw new Error("Can not handle response status: " + (status || 'undefined'));
    }
  };

  var onMessage = function onMessage(socket, rawData) {
    var parsedData;

    try {
      parsedData = JSON.parse(rawData);
    } catch (err) {
      throw new Error("Could not parse socket message: " + rawData);
    }

    if (!parsedData) {
      throw new Error("No data passed from socket message");
    }

    var _parsedData = parsedData,
        messageSessionUID = _parsedData.session_uid,
        requestUID = _parsedData.request_uid,
        messageUID = _parsedData.message_uid,
        messageName = _parsedData.message_name,
        messageType = _parsedData.message_type,
        messageData = _parsedData.message_data,
        responseStatus = _parsedData.message_status,
        messageTargetApp = _parsedData.target_app;
    requestUID = requestUID || parsedData.request_id;

    if (messageUID && receivedMessages[messageUID]) {
      return;
    }

    if (!messageUID || !requestUID || !messageName || !messageType || !messageTargetApp) {
      throw new Error("Incomplete message: " + rawData);
    }

    receivedMessages[messageUID] = true;

    if (messageType === MESSAGE_TYPE.REQUEST) {
      return onRequest(socket, {
        messageSessionUID: messageSessionUID,
        requestUID: requestUID,
        messageName: messageName,
        messageData: messageData
      });
    } else if (messageType === MESSAGE_TYPE.RESPONSE) {
      return onResponse({
        messageName: messageName,
        requestUID: requestUID,
        messageSessionUID: messageSessionUID,
        responseStatus: responseStatus,
        messageData: messageData
      });
    } else {
      throw new Error("Unhandleable message type: " + messageType);
    }
  };

  var closed = false;
  var retryDelay;

  var updateRetryDelay = function updateRetryDelay() {
    if (retry) {
      retryDelay = retryDelay ? retryDelay * 2 : 1;
    }
  };

  var socketPromise;
  var retryPromise;

  var init = function init() {
    socketPromise = promise_ZalgoPromise.try(function () {
      if (retryDelay) {
        retryPromise = promise_ZalgoPromise.delay(retryDelay);
        return retryPromise;
      }
    }).then(function () {
      retryPromise = null;
      var instance = driver();
      var connectionPromise = new promise_ZalgoPromise(function (resolve, reject) {
        instance.onOpen(function () {
          closed = false;
          retryDelay = 0;
          resolve(instance);
        });
        instance.onClose(function (err) {
          closed = true;
          reject(err || new Error('socket closed'));

          if (retry) {
            updateRetryDelay();
            init();
          }
        });
        instance.onError(function (err) {
          reject(err);

          for (var _i2 = 0, _errorListeners2 = errorListeners; _i2 < _errorListeners2.length; _i2++) {
            var errorListener = _errorListeners2[_i2];
            errorListener(err);
          }
        });
      });
      instance.onMessage(function (rawMessage) {
        return connectionPromise.then(function (socket) {
          return onMessage(socket, rawMessage);
        });
      });
      return connectionPromise;
    });
    socketPromise.catch(src_util_noop);
  };

  init();

  var on = function on(name, handler, _temp) {
    var _ref6 = _temp === void 0 ? {} : _temp,
        _ref6$requireSessionU = _ref6.requireSessionUID,
        requireSessionUID = _ref6$requireSessionU === void 0 ? true : _ref6$requireSessionU;

    if (requestListeners[name]) {
      throw new Error("Listener already registered for name: " + name);
    }

    requestListeners[name] = {
      handler: handler,
      requireSessionUID: requireSessionUID
    };
    return {
      cancel: function cancel() {
        delete requestListeners[name];
      }
    };
  };

  var send = function send(messageName, messageData, _temp2) {
    var _ref7 = _temp2 === void 0 ? {} : _temp2,
        _ref7$requireSessionU = _ref7.requireSessionUID,
        requireSessionUID = _ref7$requireSessionU === void 0 ? true : _ref7$requireSessionU,
        _ref7$timeout = _ref7.timeout,
        timeout = _ref7$timeout === void 0 ? 0 : _ref7$timeout;

    return socketPromise.then(function (socket) {
      var requestUID = uniqueID();
      var listenerPromise = new promise_ZalgoPromise();
      responseListeners[requestUID] = {
        listenerPromise: listenerPromise,
        requireSessionUID: requireSessionUID
      };
      sendMessage(socket, {
        request_uid: requestUID,
        message_name: messageName,
        message_type: MESSAGE_TYPE.REQUEST,
        message_data: messageData
      });

      if (timeout) {
        setTimeout(function () {
          listenerPromise.reject(new Error("Timeoued out waiting for " + messageName + " response after " + timeout + "ms"));
        }, timeout);
      }

      return listenerPromise;
    });
  };

  var reconnect = function reconnect() {
    return promise_ZalgoPromise.try(function () {
      if (!closed) {
        return socketPromise;
      }

      if (retryPromise) {
        retryPromise.resolve();
        return socketPromise;
      }

      retryDelay = 0;
      return init();
    });
  };

  var close = function close() {
    retry = false;
    requestListeners = {};
    errorListeners = [];

    for (var _i4 = 0, _Object$keys2 = Object.keys(responseListeners); _i4 < _Object$keys2.length; _i4++) {
      var requestUID = _Object$keys2[_i4];
      var listenerPromise = responseListeners[requestUID].listenerPromise;
      listenerPromise.asyncReject(new Error("Socket closed"));
    }

    promise_ZalgoPromise.all(activeRequests).then(function () {
      return socketPromise.then(function (socket) {
        return socket.close();
      }, src_util_noop);
    });
  };

  var onError = function onError(handler) {
    errorListeners.push(handler);
  };

  return {
    on: on,
    send: send,
    onError: onError,
    reconnect: reconnect,
    close: close
  };
}
function webSocket(_ref8) {
  var sessionUID = _ref8.sessionUID,
      url = _ref8.url,
      sourceApp = _ref8.sourceApp,
      sourceAppVersion = _ref8.sourceAppVersion,
      targetApp = _ref8.targetApp;

  var driver = function driver() {
    var socket = new WebSocket(url);
    return {
      send: function send(data) {
        socket.send(data);
      },
      close: function close() {
        socket.close();
      },
      onMessage: function onMessage(handler) {
        socket.onmessage = function (event) {
          var data = event.data;

          if (typeof data !== 'string' || !data) {
            throw new TypeError("Expected string data from web socket");
          }

          handler(data);
        };
      },
      onError: function onError(handler) {
        socket.onerror = function () {
          handler(new Error("The socket encountered an error"));
        };
      },
      onOpen: function onOpen(handler) {
        socket.onopen = function () {
          return handler();
        };
      },
      onClose: function onClose(handler) {
        socket.onclose = function () {
          return handler(new Error("Websocket connection closed"));
        };
      },
      isOpen: function isOpen() {
        return socket.readyState === WebSocket.OPEN;
      }
    };
  };

  return messageSocket({
    sessionUID: sessionUID,
    driver: driver,
    sourceApp: sourceApp,
    sourceAppVersion: sourceAppVersion,
    targetApp: targetApp
  });
}
var loadFirebaseSDK = memoize(function (config) {
  return loadScript(FIREBASE_SCRIPTS.APP).then(function () {
    return promise_ZalgoPromise.all([loadScript(FIREBASE_SCRIPTS.AUTH), loadScript(FIREBASE_SCRIPTS.DATABASE)]);
  }).then(function () {
    var firebase = window.firebase;

    if (!firebase) {
      throw new Error("Firebase failed to load");
    }

    firebase.initializeApp(config);
    return firebase;
  });
});
function firebaseSocket(_ref9) {
  var sessionUID = _ref9.sessionUID,
      config = _ref9.config,
      sourceApp = _ref9.sourceApp,
      sourceAppVersion = _ref9.sourceAppVersion,
      targetApp = _ref9.targetApp;

  var driver = function driver() {
    var open = false;
    var onMessageHandlers = [];
    var onErrorHandlers = [];
    var onCloseHandlers = [];
    var onOpenHandlers = [];

    var error = function error(err) {
      for (var _i6 = 0; _i6 < onErrorHandlers.length; _i6++) {
        var _handler = onErrorHandlers[_i6];

        _handler(err);
      }
    };

    var databasePromise = promise_ZalgoPromise.all([loadFirebaseSDK(config), getFirebaseSessionToken(sessionUID)]).then(function (_ref10) {
      var firebase = _ref10[0],
          sessionToken = _ref10[1];
      return firebase.auth().signInWithCustomToken(sessionToken).then(function () {
        var database = firebase.database();
        firebase.database.INTERNAL.forceWebSockets();
        open = true;

        for (var _i8 = 0; _i8 < onOpenHandlers.length; _i8++) {
          var _handler2 = onOpenHandlers[_i8];

          _handler2();
        }

        database.ref("users/" + sessionUID + "/messages").on('value', function (res) {
          var messages = res.val() || {};

          for (var _i10 = 0, _Object$keys4 = Object.keys(messages); _i10 < _Object$keys4.length; _i10++) {
            var messageID = _Object$keys4[_i10];
            var message = messages[messageID];

            for (var _i12 = 0; _i12 < onMessageHandlers.length; _i12++) {
              var _handler3 = onMessageHandlers[_i12];

              _handler3(message);
            }
          }
        }, function (err) {
          error(err);
        });
        database.goOnline();
        return database;
      });
    });
    databasePromise.catch(src_util_noop);
    return {
      send: function send(data) {
        databasePromise.then(function (database) {
          return database.ref("users/" + sessionUID + "/messages/" + uniqueID()).set(data);
        }).catch(error);
      },
      close: function close() {
        databasePromise.then(function (database) {
          database.goOffline();
        });
      },
      onMessage: function onMessage(handler) {
        onMessageHandlers.push(handler);
      },
      onError: function onError(handler) {
        onErrorHandlers.push(handler);
      },
      onOpen: function onOpen(handler) {
        if (open) {
          handler();
        } else {
          onOpenHandlers.push(handler);
        }
      },
      onClose: function onClose(handler) {
        onCloseHandlers.push(handler);
      },
      isOpen: function isOpen() {
        return open;
      }
    };
  };

  return messageSocket({
    sessionUID: sessionUID,
    driver: driver,
    sourceApp: sourceApp,
    sourceAppVersion: sourceAppVersion,
    targetApp: targetApp
  });
}
// CONCATENATED MODULE: ./src/api/index.js





// CONCATENATED MODULE: ./src/button/props/createOrder.js









function buildXCreateOrderData() {
  // $FlowFixMe
  return {};
}
function buildOrderActions(_ref) {
  var facilitatorAccessToken = _ref.facilitatorAccessToken,
      intent = _ref.intent,
      currency = _ref.currency,
      merchantID = _ref.merchantID,
      partnerAttributionID = _ref.partnerAttributionID;

  var create = function create(data) {
    var order = _extends({}, data);

    if (order.intent && order.intent.toLowerCase() !== intent) {
      throw new Error("Unexpected intent: " + order.intent + " passed to order.create. Please ensure you are passing /sdk/js?" + SDK_QUERY_KEYS.INTENT + "=" + order.intent.toLowerCase() + " in the paypal script tag.");
    }

    order = _extends({}, order, {
      intent: intent.toUpperCase()
    });
    order.purchase_units = order.purchase_units.map(function (unit) {
      if (unit.amount.currency_code && unit.amount.currency_code !== currency) {
        throw new Error("Unexpected currency: " + unit.amount.currency_code + " passed to order.create. Please ensure you are passing /sdk/js?" + SDK_QUERY_KEYS.CURRENCY + "=" + unit.amount.currency_code + " in the paypal script tag.");
      }

      var payee = unit.payee;

      if (payee && merchantID && merchantID.length) {
        if (!merchantID[0]) {
          throw new Error("Pass " + SDK_QUERY_KEYS.MERCHANT_ID + "=XYZ in the paypal script tag.");
        }

        if (payee.merchant_id && payee.merchant_id !== merchantID[0]) {
          throw new Error("Expected payee.merchant_id to be \"" + merchantID[0] + "\"");
        }
      }

      if (merchantID) {
        payee = _extends({}, payee, {
          merchant_id: merchantID[0]
        });
      }

      return _extends({}, unit, {
        payee: payee,
        amount: _extends({}, unit.amount, {
          currency_code: currency
        })
      });
    });
    order.application_context = order.application_context || {};
    return createOrderID(order, {
      facilitatorAccessToken: facilitatorAccessToken,
      partnerAttributionID: partnerAttributionID,
      forceRestAPI: false
    });
  };

  return {
    create: create
  };
}
function buildPaymentActions(_ref2) {
  var facilitatorAccessToken = _ref2.facilitatorAccessToken,
      intent = _ref2.intent,
      currency = _ref2.currency,
      merchantID = _ref2.merchantID,
      partnerAttributionID = _ref2.partnerAttributionID;

  var create = function create(data) {
    var payment = _extends({}, data);

    var expectedIntent = intent === INTENT.CAPTURE ? 'sale' : intent;

    if (payment.intent && payment.intent !== expectedIntent) {
      throw new Error("Unexpected intent: " + payment.intent + " passed to order.create. Expected " + expectedIntent);
    }

    payment = _extends({}, payment, {
      intent: expectedIntent
    });
    payment.transactions = payment.transactions.map(function (transaction) {
      if (transaction.amount.currency && transaction.amount.currency !== currency) {
        throw new Error("Unexpected currency: " + transaction.amount.currency + " passed to order.create. Please ensure you are passing /sdk/js?" + SDK_QUERY_KEYS.CURRENCY + "=" + transaction.amount.currency + " in the paypal script tag.");
      }

      var payee = transaction.payee;

      if (payee && merchantID && merchantID.length) {
        if (!merchantID[0]) {
          throw new Error("Pass " + SDK_QUERY_KEYS.MERCHANT_ID + "=XYZ in the paypal script tag.");
        }

        if (payee.merchant_id && payee.merchant_id !== merchantID[0]) {
          throw new Error("Expected payee.merchant_id to be \"" + merchantID[0] + "\"");
        }
      }

      if (merchantID) {
        payee = _extends({}, payee, {
          merchant_id: merchantID[0]
        });
      }

      return _extends({}, transaction, {
        payee: payee,
        amount: _extends({}, transaction.amount, {
          currency: currency
        })
      });
    });
    payment.redirect_urls = payment.redirect_urls || {};
    payment.redirect_urls.return_url = payment.redirect_urls.return_url || getDomain() + "/checkoutnow/error";
    payment.redirect_urls.cancel_url = payment.redirect_urls.cancel_url || getDomain() + "/checkoutnow/error";
    payment.payer = payment.payer || {};
    payment.payer.payment_method = payment.payer.payment_method || 'paypal';
    return createPaymentToken(payment, {
      facilitatorAccessToken: facilitatorAccessToken,
      partnerAttributionID: partnerAttributionID
    });
  };

  return {
    create: create
  };
}
function buildXCreateOrderActions(_ref3) {
  var facilitatorAccessToken = _ref3.facilitatorAccessToken,
      intent = _ref3.intent,
      currency = _ref3.currency,
      merchantID = _ref3.merchantID,
      partnerAttributionID = _ref3.partnerAttributionID;
  var order = buildOrderActions({
    facilitatorAccessToken: facilitatorAccessToken,
    intent: intent,
    currency: currency,
    merchantID: merchantID,
    partnerAttributionID: partnerAttributionID
  });
  var payment = buildPaymentActions({
    facilitatorAccessToken: facilitatorAccessToken,
    intent: intent,
    currency: currency,
    merchantID: merchantID,
    partnerAttributionID: partnerAttributionID
  });
  return {
    order: order,
    payment: ENABLE_PAYMENT_API ? payment : null
  };
}
function getCreateOrder(xprops, _ref4) {
  var facilitatorAccessToken = _ref4.facilitatorAccessToken,
      createBillingAgreement = _ref4.createBillingAgreement,
      createSubscription = _ref4.createSubscription;
  var createOrder = xprops.createOrder,
      buttonSessionID = xprops.buttonSessionID,
      intent = xprops.intent,
      currency = xprops.currency,
      merchantID = xprops.merchantID,
      partnerAttributionID = xprops.partnerAttributionID;
  var data = buildXCreateOrderData();
  var actions = buildXCreateOrderActions({
    facilitatorAccessToken: facilitatorAccessToken,
    intent: intent,
    currency: currency,
    merchantID: merchantID,
    partnerAttributionID: partnerAttributionID
  });
  return memoize(function () {
    var startTime = Date.now();
    return promise_ZalgoPromise.try(function () {
      if (createBillingAgreement) {
        return createBillingAgreement().then(billingTokenToOrderID);
      } else if (createSubscription) {
        return createSubscription().then(subscriptionIdToCartId);
      } else if (createOrder) {
        return createOrder(data, actions);
      } else {
        return actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: currency,
              value: '0.01'
            }
          }]
        });
      }
    }).then(function (orderID) {
      var _getLogger$track;

      if (!orderID || typeof orderID !== 'string') {
        throw new Error("Expected an order id to be passed");
      }

      if (orderID.indexOf('PAY-') === 0 || orderID.indexOf('PAYID-') === 0) {
        throw new Error("Do not pass PAY-XXX or PAYID-XXX directly into createOrder. Pass the EC-XXX token instead");
      }

      var duration = Date.now() - startTime;
      getLogger().track((_getLogger$track = {}, _getLogger$track[FPTI_KEY.STATE] = FPTI_STATE.BUTTON, _getLogger$track[FPTI_KEY.TRANSITION] = FPTI_TRANSITION.RECEIVE_ORDER, _getLogger$track[FPTI_KEY.CONTEXT_TYPE] = FPTI_CONTEXT_TYPE.ORDER_ID, _getLogger$track[FPTI_KEY.CONTEXT_ID] = orderID, _getLogger$track[FPTI_KEY.TOKEN] = orderID, _getLogger$track[FPTI_KEY.BUTTON_SESSION_UID] = buttonSessionID, _getLogger$track[FPTI_KEY.RESPONSE_DURATION] = duration.toString(), _getLogger$track)).flush();
      return orderID;
    });
  });
}
// CONCATENATED MODULE: ./src/button/props/onApprove.js








function onApprove_buildOrderActions(_ref) {
  var intent = _ref.intent,
      orderID = _ref.orderID,
      restart = _ref.restart,
      facilitatorAccessToken = _ref.facilitatorAccessToken,
      buyerAccessToken = _ref.buyerAccessToken,
      partnerAttributionID = _ref.partnerAttributionID,
      forceRestAPI = _ref.forceRestAPI;

  var handleProcessorError = function handleProcessorError(err) {
    // $FlowFixMe
    var isProcessorDecline = err && err.data && err.data.details && err.data.details.some(function (detail) {
      return detail.issue === ORDER_API_ERROR.INSTRUMENT_DECLINED || detail.issue === ORDER_API_ERROR.PAYER_ACTION_REQUIRED;
    });

    if (isProcessorDecline) {
      return restart().then(unresolvedPromise);
    }

    throw new Error('Order could not be captured');
  };

  var get = memoize(function () {
    return getOrder(orderID, {
      facilitatorAccessToken: facilitatorAccessToken,
      buyerAccessToken: buyerAccessToken,
      partnerAttributionID: partnerAttributionID,
      forceRestAPI: forceRestAPI
    });
  });
  var capture = memoize(function () {
    if (intent !== INTENT.CAPTURE) {
      throw new Error("Use " + SDK_QUERY_KEYS.INTENT + "=" + INTENT.CAPTURE + " to use client-side capture");
    }

    return captureOrder(orderID, {
      facilitatorAccessToken: facilitatorAccessToken,
      buyerAccessToken: buyerAccessToken,
      partnerAttributionID: partnerAttributionID,
      forceRestAPI: forceRestAPI
    }).finally(get.reset).finally(capture.reset).catch(handleProcessorError);
  });
  var authorize = memoize(function () {
    if (intent !== INTENT.AUTHORIZE) {
      throw new Error("Use " + SDK_QUERY_KEYS.INTENT + "=" + INTENT.AUTHORIZE + " to use client-side authorize");
    }

    return authorizeOrder(orderID, {
      facilitatorAccessToken: facilitatorAccessToken,
      buyerAccessToken: buyerAccessToken,
      partnerAttributionID: partnerAttributionID,
      forceRestAPI: forceRestAPI
    }).finally(get.reset).finally(authorize.reset).catch(handleProcessorError);
  });

  var patch = function patch(data) {
    if (data === void 0) {
      data = {};
    }

    return patchOrder(orderID, data, {
      facilitatorAccessToken: facilitatorAccessToken,
      buyerAccessToken: buyerAccessToken,
      partnerAttributionID: partnerAttributionID,
      forceRestAPI: forceRestAPI
    }).catch(function () {
      throw new Error('Order could not be patched');
    });
  };

  return {
    capture: capture,
    authorize: authorize,
    patch: patch,
    get: get
  };
}

function onApprove_buildPaymentActions(_ref2) {
  var intent = _ref2.intent,
      paymentID = _ref2.paymentID,
      payerID = _ref2.payerID,
      restart = _ref2.restart,
      facilitatorAccessToken = _ref2.facilitatorAccessToken,
      buyerAccessToken = _ref2.buyerAccessToken,
      partnerAttributionID = _ref2.partnerAttributionID;

  if (!paymentID) {
    return;
  }

  var handleProcessorError = function handleProcessorError(err) {
    // $FlowFixMe
    var isProcessorDecline = err && err.data && err.data.details && err.data.details.some(function (detail) {
      return detail.issue === ORDER_API_ERROR.INSTRUMENT_DECLINED || detail.issue === ORDER_API_ERROR.PAYER_ACTION_REQUIRED;
    });

    if (isProcessorDecline) {
      return restart().then(unresolvedPromise);
    }

    throw new Error('Order could not be captured');
  };

  var get = memoize(function () {
    return getPayment(paymentID, {
      facilitatorAccessToken: facilitatorAccessToken,
      buyerAccessToken: buyerAccessToken,
      partnerAttributionID: partnerAttributionID
    });
  });
  var execute = memoize(function () {
    if (intent !== INTENT.CAPTURE) {
      throw new Error("Use " + SDK_QUERY_KEYS.INTENT + "=" + INTENT.CAPTURE + " to use client-side capture");
    }

    return executePayment(paymentID, payerID, {
      facilitatorAccessToken: facilitatorAccessToken,
      buyerAccessToken: buyerAccessToken,
      partnerAttributionID: partnerAttributionID
    }).finally(get.reset).finally(execute.reset).catch(handleProcessorError);
  });

  var patch = function patch(data) {
    if (data === void 0) {
      data = {};
    }

    return patchPayment(paymentID, data, {
      facilitatorAccessToken: facilitatorAccessToken,
      buyerAccessToken: buyerAccessToken,
      partnerAttributionID: partnerAttributionID
    }).catch(function () {
      throw new Error('Order could not be patched');
    });
  };

  return {
    execute: execute,
    patch: patch,
    get: get
  };
}

function buildXApproveActions(_ref3) {
  var intent = _ref3.intent,
      orderID = _ref3.orderID,
      paymentID = _ref3.paymentID,
      payerID = _ref3.payerID,
      restart = _ref3.restart,
      subscriptionID = _ref3.subscriptionID,
      facilitatorAccessToken = _ref3.facilitatorAccessToken,
      buyerAccessToken = _ref3.buyerAccessToken,
      partnerAttributionID = _ref3.partnerAttributionID,
      forceRestAPI = _ref3.forceRestAPI;
  // Subscription GET Actions
  var getSubscriptionApi = memoize(function () {
    return getSubscription(subscriptionID, {
      buyerAccessToken: buyerAccessToken
    });
  });
  var activateSubscriptionApi = memoize(function () {
    return activateSubscription(subscriptionID, {
      buyerAccessToken: buyerAccessToken
    });
  });

  var redirect = function redirect(url) {
    if (!url) {
      throw new Error("Expected redirect url");
    }

    if (url.indexOf('://') === -1) {
      getLogger().warn('redir_url_non_scheme', {
        url: url
      }).flush();
      throw new Error("Invalid redirect url: " + url + " - must be fully qualified url");
    } else if (!url.match(/^https?:\/\//)) {
      getLogger().warn('redir_url_non_http', {
        url: url
      }).flush();
    }

    return dom_redirect(url, window.top);
  };

  var order = onApprove_buildOrderActions({
    intent: intent,
    orderID: orderID,
    paymentID: paymentID,
    payerID: payerID,
    subscriptionID: subscriptionID,
    restart: restart,
    facilitatorAccessToken: facilitatorAccessToken,
    buyerAccessToken: buyerAccessToken,
    partnerAttributionID: partnerAttributionID,
    forceRestAPI: forceRestAPI
  });
  var payment = onApprove_buildPaymentActions({
    intent: intent,
    orderID: orderID,
    paymentID: paymentID,
    payerID: payerID,
    subscriptionID: subscriptionID,
    restart: restart,
    facilitatorAccessToken: facilitatorAccessToken,
    buyerAccessToken: buyerAccessToken,
    partnerAttributionID: partnerAttributionID,
    forceRestAPI: forceRestAPI
  });
  return {
    order: order,
    payment: ENABLE_PAYMENT_API ? payment : null,
    subscription: {
      get: getSubscriptionApi,
      activate: activateSubscriptionApi
    },
    restart: restart,
    redirect: redirect
  };
}

function getDefaultOnApprove(intent) {
  return function (data, actions) {
    if (intent === INTENT.CAPTURE) {
      return actions.order.capture().then(src_util_noop);
    } else if (intent === INTENT.AUTHORIZE) {
      return actions.order.authorize().then(src_util_noop);
    } else {
      throw new Error("Unsupported intent for auto-capture: " + intent);
    }
  };
}

function getOnApprove(xprops, _ref4) {
  var facilitatorAccessToken = _ref4.facilitatorAccessToken,
      createOrder = _ref4.createOrder;
  var intent = xprops.intent,
      _xprops$onApprove = xprops.onApprove,
      onApprove = _xprops$onApprove === void 0 ? getDefaultOnApprove(intent) : _xprops$onApprove,
      partnerAttributionID = xprops.partnerAttributionID,
      onError = xprops.onError,
      _xprops$upgradeLSAT = xprops.upgradeLSAT,
      upgradeLSAT = _xprops$upgradeLSAT === void 0 ? false : _xprops$upgradeLSAT;

  if (!onApprove) {
    throw new Error("Expected onApprove");
  }

  return memoize(function (_ref5, _ref6) {
    var payerID = _ref5.payerID,
        paymentID = _ref5.paymentID,
        billingToken = _ref5.billingToken,
        subscriptionID = _ref5.subscriptionID,
        buyerAccessToken = _ref5.buyerAccessToken,
        _ref5$forceRestAPI = _ref5.forceRestAPI,
        forceRestAPI = _ref5$forceRestAPI === void 0 ? upgradeLSAT : _ref5$forceRestAPI;
    var restart = _ref6.restart;
    return promise_ZalgoPromise.try(function () {
      if (upgradeLSAT) {
        return createOrder().then(function (orderID) {
          return upgradeFacilitatorAccessToken(facilitatorAccessToken, {
            buyerAccessToken: buyerAccessToken,
            orderID: orderID
          });
        });
      }
    }).then(function () {
      return createOrder();
    }).then(function (orderID) {
      var _getLogger$info$track;

      getLogger().info('button_approve').track((_getLogger$info$track = {}, _getLogger$info$track[FPTI_KEY.TRANSITION] = FPTI_TRANSITION.CHECKOUT_AUTHORIZE, _getLogger$info$track[FPTI_KEY.TOKEN] = orderID, _getLogger$info$track)).flush();
      var data = {
        orderID: orderID,
        payerID: payerID,
        paymentID: paymentID,
        billingToken: billingToken,
        subscriptionID: subscriptionID,
        facilitatorAccessToken: facilitatorAccessToken
      };
      var actions = buildXApproveActions({
        orderID: orderID,
        paymentID: paymentID,
        payerID: payerID,
        intent: intent,
        restart: restart,
        subscriptionID: subscriptionID,
        facilitatorAccessToken: facilitatorAccessToken,
        buyerAccessToken: buyerAccessToken,
        partnerAttributionID: partnerAttributionID,
        forceRestAPI: forceRestAPI
      });
      return onApprove(data, actions).catch(function (err) {
        return promise_ZalgoPromise.try(function () {
          return onError(err);
        }).then(function () {
          throw err;
        });
      });
    });
  });
}
// CONCATENATED MODULE: ./src/button/props/onCancel.js





function buildXOnCancelData(_ref) {
  var orderID = _ref.orderID;
  return {
    orderID: orderID
  };
}
function buildXOnCancelActions() {
  var redirect = function redirect(url) {
    if (!url) {
      throw new Error("Expected redirect url");
    }

    if (url.indexOf('://') === -1) {
      getLogger().warn('redir_url_non_scheme', {
        url: url
      }).flush();
      throw new Error("Invalid redirect url: " + url + " - must be fully qualified url");
    } else if (!url.match(/^https?:\/\//)) {
      getLogger().warn('redir_url_non_http', {
        url: url
      }).flush();
    }

    return dom_redirect(url, window.top);
  }; // $FlowFixMe


  return {
    redirect: redirect
  };
}
function getOnCancel(xprops, _ref2) {
  var createOrder = _ref2.createOrder;
  var _xprops$onCancel = xprops.onCancel,
      onCancel = _xprops$onCancel === void 0 ? src_util_noop : _xprops$onCancel,
      onError = xprops.onError;
  return memoize(function () {
    return createOrder().then(function (orderID) {
      var _getLogger$info$track;

      getLogger().info('button_cancel').track((_getLogger$info$track = {}, _getLogger$info$track[FPTI_KEY.TRANSITION] = FPTI_TRANSITION.CHECKOUT_CANCEL, _getLogger$info$track[FPTI_KEY.TOKEN] = orderID, _getLogger$info$track)).flush();
      return onCancel(buildXOnCancelData({
        orderID: orderID
      }), buildXOnCancelActions());
    }).catch(function (err) {
      return onError(err);
    });
  });
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
// CONCATENATED MODULE: ./src/button/props/onShippingChange.js






function buildXOnShippingChangeData(data) {
  return data;
}
function buildXShippingChangeActions(_ref) {
  var orderID = _ref.orderID,
      actions = _ref.actions,
      facilitatorAccessToken = _ref.facilitatorAccessToken,
      buyerAccessToken = _ref.buyerAccessToken,
      partnerAttributionID = _ref.partnerAttributionID;

  var patch = function patch(data) {
    if (data === void 0) {
      data = {};
    }

    return patchOrder(orderID, data, {
      facilitatorAccessToken: facilitatorAccessToken,
      buyerAccessToken: buyerAccessToken,
      partnerAttributionID: partnerAttributionID
    }).catch(function () {
      throw new Error('Order could not be patched');
    });
  };

  var resolve = function resolve() {
    return promise_ZalgoPromise.resolve();
  };

  var reject = actions.reject || function reject() {
    throw new Error("Missing reject action callback");
  };

  return {
    resolve: resolve,
    reject: reject,
    order: {
      patch: patch
    }
  };
}
function getOnShippingChange(xprops, _ref2) {
  var facilitatorAccessToken = _ref2.facilitatorAccessToken,
      createOrder = _ref2.createOrder;
  var onShippingChange = xprops.onShippingChange,
      partnerAttributionID = xprops.partnerAttributionID;

  if (onShippingChange) {
    return function (_ref3, actions) {
      var buyerAccessToken = _ref3.buyerAccessToken,
          data = _objectWithoutPropertiesLoose(_ref3, ["buyerAccessToken"]);

      return createOrder().then(function (orderID) {
        var _getLogger$info$track;

        getLogger().info('button_shipping_change').track((_getLogger$info$track = {}, _getLogger$info$track[FPTI_KEY.TRANSITION] = FPTI_TRANSITION.CHECKOUT_SHIPPING_CHANGE, _getLogger$info$track[FPTI_KEY.TOKEN] = orderID, _getLogger$info$track)).flush();
        return onShippingChange(buildXOnShippingChangeData(data), buildXShippingChangeActions({
          orderID: orderID,
          facilitatorAccessToken: facilitatorAccessToken,
          buyerAccessToken: buyerAccessToken,
          actions: actions,
          partnerAttributionID: partnerAttributionID
        }));
      });
    };
  }
}
// CONCATENATED MODULE: ./src/button/props/onClick.js



var CLICK_VALID = {
  VALID: true,
  INVALID: false
};
function buildXOnClickData(_ref) {
  var fundingSource = _ref.fundingSource;
  return {
    fundingSource: fundingSource
  };
}
function buildXOnClickActions() {
  return {
    resolve: function resolve() {
      return promise_ZalgoPromise.try(function () {
        return CLICK_VALID.VALID;
      });
    },
    reject: function reject() {
      return promise_ZalgoPromise.try(function () {
        return CLICK_VALID.INVALID;
      });
    }
  };
}
function getOnClick(xprops) {
  var onClick = xprops.onClick;

  if (!onClick) {
    return;
  }

  return memoize(function (_ref2) {
    var fundingSource = _ref2.fundingSource;
    return onClick(buildXOnClickData({
      fundingSource: fundingSource
    }), buildXOnClickActions()).then(function (valid) {
      return valid !== CLICK_VALID.INVALID;
    });
  });
}
// CONCATENATED MODULE: ./src/button/props/createBillingAgreement.js
function buildXCreateBillingAgreementData() {
  // $FlowFixMe
  return {};
}
function buildXCreateBillingAgreementActions() {
  // $FlowFixMe
  return {};
}
function getCreateBillingAgreement(xprops) {
  var createBillingAgreement = xprops.createBillingAgreement;

  if (createBillingAgreement) {
    return function () {
      return createBillingAgreement(buildXCreateBillingAgreementData(), buildXCreateBillingAgreementActions()).then(function (billingToken) {
        if (!billingToken || typeof billingToken !== 'string') {
          throw new Error("Expected a billing token to be passed to createBillingAgreement");
        }

        return billingToken;
      });
    };
  }
}
// CONCATENATED MODULE: ./src/button/props/createSubscription.js

function buildXCreateSubscriptionData() {
  // $FlowFixMe
  return {};
}
function buildXCreateSubscriptionActions(_ref) {
  var facilitatorAccessToken = _ref.facilitatorAccessToken,
      partnerAttributionID = _ref.partnerAttributionID;

  var create = function create(data) {
    return subscription_createSubscription(facilitatorAccessToken, data, {
      partnerAttributionID: partnerAttributionID
    });
  };

  var revise = function revise(subscriptionID, data) {
    return reviseSubscription(facilitatorAccessToken, subscriptionID, data, {
      partnerAttributionID: partnerAttributionID
    });
  };

  return {
    subscription: {
      create: create,
      revise: revise
    }
  };
}
function getCreateSubscription(xprops, _ref2) {
  var facilitatorAccessToken = _ref2.facilitatorAccessToken;
  var createSubscriptionFunc = xprops.createSubscription,
      partnerAttributionID = xprops.partnerAttributionID;

  if (createSubscriptionFunc) {
    return function () {
      return createSubscriptionFunc(buildXCreateSubscriptionData(), buildXCreateSubscriptionActions({
        facilitatorAccessToken: facilitatorAccessToken,
        partnerAttributionID: partnerAttributionID
      })).then(function (subscriptionID) {
        if (!subscriptionID || typeof subscriptionID !== 'string') {
          throw new Error("Expected an subscription id to be passed to createSubscription");
        }

        return subscriptionID;
      });
    };
  }
}
// CONCATENATED MODULE: ./src/button/props/props.js










function getProps(_ref) {
  var facilitatorAccessToken = _ref.facilitatorAccessToken;
  var xprops = window.xprops;
  var env = xprops.env,
      vault = xprops.vault,
      commit = xprops.commit,
      locale = xprops.locale,
      platform = xprops.platform,
      sessionID = xprops.sessionID,
      buttonSessionID = xprops.buttonSessionID,
      clientID = xprops.clientID,
      partnerAttributionID = xprops.partnerAttributionID,
      correlationID = xprops.correlationID,
      getParentDomain = xprops.getParentDomain,
      clientAccessToken = xprops.clientAccessToken,
      getPopupBridge = xprops.getPopupBridge,
      getPrerenderDetails = xprops.getPrerenderDetails,
      getPageUrl = xprops.getPageUrl,
      enableThreeDomainSecure = xprops.enableThreeDomainSecure,
      enableStandardCardFields = xprops.enableStandardCardFields,
      _xprops$enableNativeC = xprops.enableNativeCheckout,
      enableNativeCheckout = _xprops$enableNativeC === void 0 ? false : _xprops$enableNativeC,
      rememberFunding = xprops.remember,
      onError = xprops.onError,
      stageHost = xprops.stageHost,
      apiStageHost = xprops.apiStageHost,
      style = xprops.style,
      getParent = xprops.getParent,
      currency = xprops.currency;
  var onInit = getOnInit(xprops);
  var merchantDomain = typeof getParentDomain === 'function' ? getParentDomain() : 'unknown';
  var onClick = getOnClick(xprops);

  if (xprops.createBillingAgreement) {
    if (xprops.createOrder) {
      throw new Error("Do not pass both createBillingAgreement and createOrder");
    }

    if (!xprops.vault) {
      throw new Error("Must pass vault=true to sdk to use createBillingAgreement");
    }
  }

  if (xprops.createSubscription) {
    if (xprops.createOrder) {
      throw new Error("Do not pass both createSubscription and createOrder");
    }

    if (xprops.createOrder) {
      throw new Error("Do not pass both createSubscription and createBillingAgreement");
    }

    if (!xprops.vault) {
      throw new Error("Must pass vault=true to sdk to use createSubscription");
    }
  }

  var createBillingAgreement = getCreateBillingAgreement(xprops);
  var createSubscription = getCreateSubscription(xprops, {
    facilitatorAccessToken: facilitatorAccessToken
  });
  var createOrder = getCreateOrder(xprops, {
    facilitatorAccessToken: facilitatorAccessToken,
    createBillingAgreement: createBillingAgreement,
    createSubscription: createSubscription
  });
  var onApprove = getOnApprove(xprops, {
    facilitatorAccessToken: facilitatorAccessToken,
    createOrder: createOrder
  });
  var onCancel = getOnCancel(xprops, {
    facilitatorAccessToken: facilitatorAccessToken,
    createOrder: createOrder
  });
  var onShippingChange = getOnShippingChange(xprops, {
    facilitatorAccessToken: facilitatorAccessToken,
    createOrder: createOrder
  });
  return {
    env: env,
    style: style,
    vault: vault,
    commit: commit,
    clientAccessToken: clientAccessToken,
    locale: locale,
    sessionID: sessionID,
    buttonSessionID: buttonSessionID,
    clientID: clientID,
    partnerAttributionID: partnerAttributionID,
    correlationID: correlationID,
    merchantDomain: merchantDomain,
    platform: platform,
    currency: currency,
    getPopupBridge: getPopupBridge,
    getPrerenderDetails: getPrerenderDetails,
    getPageUrl: getPageUrl,
    rememberFunding: rememberFunding,
    getParent: getParent,
    enableThreeDomainSecure: enableThreeDomainSecure,
    enableStandardCardFields: enableStandardCardFields,
    enableNativeCheckout: enableNativeCheckout,
    onClick: onClick,
    onInit: onInit,
    onError: onError,
    stageHost: stageHost,
    apiStageHost: apiStageHost,
    createOrder: createOrder,
    createBillingAgreement: createBillingAgreement,
    createSubscription: createSubscription,
    onApprove: onApprove,
    onCancel: onCancel,
    onShippingChange: onShippingChange
  };
}
function getComponents() {
  var _paypal = paypal,
      Checkout = _paypal.Checkout,
      CardFields = _paypal.CardFields,
      ThreeDomainSecure = _paypal.ThreeDomainSecure;
  return {
    Checkout: Checkout,
    CardFields: CardFields,
    ThreeDomainSecure: ThreeDomainSecure
  };
}
function getConfig(_ref2) {
  var serverCSPNonce = _ref2.serverCSPNonce,
      firebaseConfig = _ref2.firebaseConfig;
  var cspNonce = serverCSPNonce || getNonce();
  var _paypal2 = paypal,
      version = _paypal2.version;
  return {
    version: version,
    cspNonce: cspNonce,
    firebase: firebaseConfig
  };
}
function getServiceData(_ref3) {
  var facilitatorAccessToken = _ref3.facilitatorAccessToken,
      sdkMeta = _ref3.sdkMeta,
      buyerGeoCountry = _ref3.buyerGeoCountry,
      fundingEligibility = _ref3.fundingEligibility,
      personalization = _ref3.personalization,
      serverMerchantID = _ref3.serverMerchantID,
      eligibility = _ref3.eligibility;
  return {
    merchantID: serverMerchantID,
    buyerCountry: buyerGeoCountry || COUNTRY.US,
    fundingEligibility: fundingEligibility,
    sdkMeta: sdkMeta,
    personalization: personalization,
    facilitatorAccessToken: facilitatorAccessToken,
    eligibility: eligibility
  };
}
// CONCATENATED MODULE: ./src/button/props/onError.js
function getOnError(xprops) {
  var onError = xprops.onError;
  return onError;
}
// CONCATENATED MODULE: ./src/button/props/getPopupBridge.js

var POPUP_BRIDGE_OPTYPE = {
  PAYMENT: 'payment',
  CANCEL: 'cancel'
};
// CONCATENATED MODULE: ./src/button/props/rememberFunding.js


function getRememberFunding(xprops) {
  var remember = xprops.remember;
  return remember;
}
// CONCATENATED MODULE: ./src/button/props/getPageUrl.js

function getGetPageUrl(xprops) {
  var getPageUrl = xprops.getPageUrl;
  return getPageUrl;
}
// CONCATENATED MODULE: ./src/button/props/index.js














// CONCATENATED MODULE: ./src/button/logs.js





function setupButtonLogs(_ref) {
  var style = _ref.style;
  var logger = getLogger();

  if (isIEIntranet()) {
    logger.warn('button_child_intranet_mode');
  }

  return getPageRenderTime().then(function (pageRenderTime) {
    var _logger$track;

    var fundingSources = Array.prototype.slice.call(document.querySelectorAll("[" + DATA_ATTRIBUTES.FUNDING_SOURCE + "]")).map(function (el) {
      return el.getAttribute(DATA_ATTRIBUTES.CARD) || el.getAttribute(DATA_ATTRIBUTES.FUNDING_SOURCE);
    }).filter(function (source) {
      return source && source !== FUNDING.CARD;
    });
    var layout = style.layout,
        color = style.color,
        shape = style.shape,
        label = style.label,
        _style$tagline = style.tagline,
        tagline = _style$tagline === void 0 ? true : _style$tagline;
    logger.info("button_render_color_" + color);
    logger.info("button_render_shape_" + shape);
    logger.info("button_render_label_" + label);
    logger.info("button_render_layout_" + layout);
    logger.info("button_render_tagline_" + tagline.toString());
    logger.track((_logger$track = {}, _logger$track[FPTI_KEY.TRANSITION] = FPTI_TRANSITION.BUTTON_LOAD, _logger$track[FPTI_KEY.FUNDING_LIST] = fundingSources.join(':'), _logger$track[FPTI_KEY.FUNDING_COUNT] = fundingSources.length.toString(), _logger$track[FPTI_KEY.PAGE_LOAD_TIME] = pageRenderTime ? pageRenderTime.toString() : '', _logger$track[FTPI_BUTTON_KEY.BUTTON_LAYOUT] = layout, _logger$track[FTPI_BUTTON_KEY.BUTTON_COLOR] = color, _logger$track[FTPI_BUTTON_KEY.BUTTON_SIZE] = 'responsive', _logger$track[FTPI_BUTTON_KEY.BUTTON_SHAPE] = shape, _logger$track[FTPI_BUTTON_KEY.BUTTON_LABEL] = label, _logger$track[FTPI_BUTTON_KEY.BUTTON_WIDTH] = window.innerWidth, _logger$track[FTPI_BUTTON_KEY.BUTTON_TYPE] = FPTI_BUTTON_TYPE.IFRAME, _logger$track[FTPI_BUTTON_KEY.BUTTON_TAGLINE_ENABLED] = tagline ? '1' : '0', _logger$track));
    logger.flush();
  });
}
// CONCATENATED MODULE: ./src/button/remember.js


function setupRemember(_ref) {
  var rememberFunding = _ref.rememberFunding,
      fundingEligibility = _ref.fundingEligibility;
  return promise_ZalgoPromise.try(function () {
    if (fundingEligibility && fundingEligibility.venmo && fundingEligibility.venmo.eligible) {
      return rememberFunding([FUNDING.VENMO]);
    }
  });
}
// CONCATENATED MODULE: ./node_modules/jsx-pragmatic/src/constants.js
var NODE_TYPE = {
  ELEMENT: 'element',
  TEXT: 'text',
  COMPONENT: 'component',
  FRAGMENT: 'fragment'
};
// CONCATENATED MODULE: ./node_modules/jsx-pragmatic/src/node.js


function _renderChildren(children, renderer) {
  // eslint-disable-line no-use-before-define
  var result = [];

  for (var _i2 = 0; _i2 < children.length; _i2++) {
    var child = children[_i2];
    var renderedChild = child.render(renderer);

    if (!renderedChild) {
      continue;
    } else if (Array.isArray(renderedChild)) {
      for (var _i4 = 0; _i4 < renderedChild.length; _i4++) {
        var subchild = renderedChild[_i4];

        if (subchild) {
          result.push(subchild);
        }
      }
    } else {
      result.push(renderedChild);
    }
  }

  return result;
}

var node_ElementNode =
/*#__PURE__*/
function () {
  // eslint-disable-line no-use-before-define
  // eslint-disable-line no-undef
  function ElementNode(name, props, children) {
    this.type = NODE_TYPE.ELEMENT;
    this.name = void 0;
    this.props = void 0;
    this.children = void 0;
    this.onRender = void 0;
    // eslint-disable-line no-use-before-define
    this.name = name;
    this.props = props;
    this.children = children;
    var onRender = props.onRender;

    if (typeof onRender === 'function') {
      this.onRender = onRender;
      delete props.onRender;
    }
  }

  var _proto = ElementNode.prototype;

  _proto.render = function render(renderer) {
    var el = renderer(this);

    if (this.onRender) {
      this.onRender(el);
    }

    return el;
  };

  _proto.renderChildren = function renderChildren(renderer) {
    return _renderChildren(this.children, renderer);
  };

  return ElementNode;
}();
var node_FragmentNode =
/*#__PURE__*/
function () {
  // eslint-disable-line no-use-before-define
  function FragmentNode(children) {
    this.type = NODE_TYPE.FRAGMENT;
    this.children = void 0;
    // eslint-disable-line no-use-before-define
    this.children = children;
  }

  var _proto2 = FragmentNode.prototype;

  _proto2.render = function render(renderer) {
    return _renderChildren(this.children, renderer);
  };

  return FragmentNode;
}();
var node_TextNode =
/*#__PURE__*/
function () {
  function TextNode(text) {
    this.type = NODE_TYPE.TEXT;
    this.text = void 0;
    this.text = text;
  }

  var _proto3 = TextNode.prototype;

  _proto3.render = function render(renderer) {
    return renderer(this);
  };

  return TextNode;
}();
var node_ComponentNode =
/*#__PURE__*/
function () {
  function ComponentNode(component, props, children) {
    this.type = NODE_TYPE.COMPONENT;
    this.component = void 0;
    this.props = void 0;
    this.children = void 0;
    this.component = component;
    this.props = props;
    this.children = children;
  }

  var _proto4 = ComponentNode.prototype;

  _proto4.renderComponent = function renderComponent(renderer) {
    // $FlowFixMe
    var props = this.props;
    var child = normalizeChild(this.component(props, this.children)); // eslint-disable-line no-use-before-define

    if (child) {
      return child.render(renderer);
    }
  };

  _proto4.render = function render(renderer) {
    return renderer(this);
  };

  _proto4.renderChildren = function renderChildren(renderer) {
    return _renderChildren(this.children, renderer);
  };

  return ComponentNode;
}();

function normalizeChildren(children) {
  var result = [];

  for (var _i6 = 0; _i6 < children.length; _i6++) {
    var child = children[_i6];

    if (!child) {
      continue;
    } else if (typeof child === 'string') {
      result.push(new node_TextNode(child));
    } else if (Array.isArray(child)) {
      for (var _i8 = 0, _normalizeChildren2 = normalizeChildren(child); _i8 < _normalizeChildren2.length; _i8++) {
        var subchild = _normalizeChildren2[_i8];
        result.push(subchild);
      }
    } else if (child && (child.type === NODE_TYPE.ELEMENT || child.type === NODE_TYPE.TEXT || child.type === NODE_TYPE.COMPONENT)) {
      result.push(child);
    } else {
      throw new TypeError("Unrecognized node type: " + typeof child);
    }
  }

  return result;
}

function normalizeChild(child) {
  var children = normalizeChildren(Array.isArray(child) ? child : [child]);

  if (children.length === 1) {
    return children[0];
  } else if (children.length > 1) {
    return new node_FragmentNode(children);
  }
}

var node_node = function node(element, props) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  // $FlowFixMe
  props = props || {};
  children = normalizeChildren(children);

  if (typeof element === 'string') {
    // $FlowFixMe
    return new node_ElementNode(element, props, children);
  }

  if (typeof element === 'function') {
    // $FlowFixMe
    return new node_ComponentNode(element, props, children);
  }

  throw new TypeError("Expected jsx element to be a string or a function");
};
var Fragment = function Fragment(props, children) {
  if (props && Object.keys(props).length) {
    throw new Error("Do not pass props to Fragment");
  }

  return children;
};
// CONCATENATED MODULE: ./node_modules/jsx-pragmatic/src/util.js
var ALPHA_CHARS = '0123456789abcdef';
function util_uniqueID() {
  return 'xxxxxxxxxx'.replace(/./g, function () {
    return ALPHA_CHARS.charAt(Math.floor(Math.random() * ALPHA_CHARS.length));
  });
}
// CONCATENATED MODULE: ./node_modules/jsx-pragmatic/src/renderers/dom.js
var _ADD_CHILDREN;




var ELEMENT_TAG = {
  HTML: 'html',
  IFRAME: 'iframe',
  SCRIPT: 'script',
  NODE: 'node',
  DEFAULT: 'default'
};
var ELEMENT_PROP = {
  ID: 'id',
  INNER_HTML: 'innerHTML',
  EL: 'el'
};

function dom_fixScripts(el, doc) {
  if (doc === void 0) {
    doc = window.document;
  }

  for (var _i2 = 0, _el$querySelectorAll2 = el.querySelectorAll('script'); _i2 < _el$querySelectorAll2.length; _i2++) {
    var script = _el$querySelectorAll2[_i2];
    var parentNode = script.parentNode;

    if (!parentNode) {
      continue;
    }

    var newScript = doc.createElement('script'); // $FlowFixMe

    newScript.text = script.textContent;
    parentNode.replaceChild(newScript, script);
  }
}

function dom_createElement(doc, node) {
  if (node.props[ELEMENT_PROP.EL]) {
    // $FlowFixMe
    return node.props[ELEMENT_PROP.EL];
  }

  return doc.createElement(node.name);
}

function createTextElement(doc, node) {
  return doc.createTextNode(node.text);
}

function addProps(el, node) {
  var props = node.props;

  for (var _i4 = 0, _Object$keys2 = Object.keys(props); _i4 < _Object$keys2.length; _i4++) {
    var prop = _Object$keys2[_i4];
    var val = props[prop];

    if (val === null || typeof val === 'undefined' || prop === ELEMENT_PROP.EL || prop === ELEMENT_PROP.INNER_HTML) {
      continue;
    }

    if (prop.match(/^on[A-Z][a-z]/) && typeof val === 'function') {
      el.addEventListener(prop.slice(2).toLowerCase(), val);
    } else if (typeof val === 'string' || typeof val === 'number') {
      el.setAttribute(prop, val.toString());
    } else if (typeof val === 'boolean') {
      if (val === true) {
        el.setAttribute(prop, '');
      }
    }
  }

  if (el.tagName.toLowerCase() === ELEMENT_TAG.IFRAME && !props.id) {
    el.setAttribute(ELEMENT_PROP.ID, "jsx-iframe-" + util_uniqueID());
  }
}

var ADD_CHILDREN = (_ADD_CHILDREN = {}, _ADD_CHILDREN[ELEMENT_TAG.IFRAME] = function (el, node) {
  var firstChild = node.children[0];

  if (node.children.length !== 1 || !(firstChild && firstChild.type === NODE_TYPE.ELEMENT) || firstChild.name !== ELEMENT_TAG.HTML) {
    throw new Error("Expected only single html element node as child of " + ELEMENT_TAG.IFRAME + " element");
  }

  el.addEventListener('load', function () {
    // $FlowFixMe
    var win = el.contentWindow;

    if (!win) {
      throw new Error("Expected frame to have contentWindow");
    }

    var doc = win.document;
    var docElement = doc.documentElement;

    while (docElement.children && docElement.children.length) {
      docElement.removeChild(docElement.children[0]);
    } // eslint-disable-next-line no-use-before-define


    var child = firstChild.render(dom({
      doc: doc
    }));

    while (child.children.length) {
      docElement.appendChild(child.children[0]);
    }
  });
}, _ADD_CHILDREN[ELEMENT_TAG.SCRIPT] = function (el, node) {
  var firstChild = node.children[0];

  if (node.children.length !== 1 || !(firstChild && firstChild.type === NODE_TYPE.TEXT)) {
    throw new Error("Expected only single text node as child of " + ELEMENT_TAG.SCRIPT + " element");
  } // $FlowFixMe


  el.text = firstChild.text;
}, _ADD_CHILDREN[ELEMENT_TAG.DEFAULT] = function (el, node, renderer) {
  for (var _i6 = 0, _node$renderChildren2 = node.renderChildren(renderer); _i6 < _node$renderChildren2.length; _i6++) {
    var child = _node$renderChildren2[_i6];
    el.appendChild(child);
  }
}, _ADD_CHILDREN);

function addChildren(el, node, doc, renderer) {
  if (node.props.hasOwnProperty(ELEMENT_PROP.INNER_HTML)) {
    if (node.children.length) {
      throw new Error("Expected no children to be passed when " + ELEMENT_PROP.INNER_HTML + " prop is set");
    }

    var html = node.props[ELEMENT_PROP.INNER_HTML];

    if (typeof html !== 'string') {
      throw new TypeError(ELEMENT_PROP.INNER_HTML + " prop must be string");
    }

    if (node.name === ELEMENT_TAG.SCRIPT) {
      // $FlowFixMe
      el.text = html;
    } else {
      el.innerHTML = html;
      dom_fixScripts(el, doc);
    }
  } else {
    var addChildrenToElement = ADD_CHILDREN[node.name] || ADD_CHILDREN[ELEMENT_TAG.DEFAULT];
    addChildrenToElement(el, node, renderer);
  }
}

function dom(opts) {
  if (opts === void 0) {
    opts = {};
  }

  var _opts = opts,
      _opts$doc = _opts.doc,
      doc = _opts$doc === void 0 ? document : _opts$doc;

  var domRenderer = function domRenderer(node) {
    if (node.type === NODE_TYPE.COMPONENT) {
      return node.renderComponent(domRenderer);
    }

    if (node.type === NODE_TYPE.TEXT) {
      // $FlowFixMe
      return createTextElement(doc, node);
    }

    if (node.type === NODE_TYPE.ELEMENT) {
      var el = dom_createElement(doc, node);
      addProps(el, node);
      addChildren(el, node, doc, domRenderer); // $FlowFixMe

      return el;
    }

    throw new TypeError("Unhandleable node");
  };

  return domRenderer;
}
// CONCATENATED MODULE: ./node_modules/jsx-pragmatic/src/renderers/react.js


// eslint-disable-line import/no-unresolved



function mapReactProps(props) {
  var innerHTML = props.innerHTML,
      className = props.class,
      remainingProps = _objectWithoutPropertiesLoose(props, ["innerHTML", "class"]);

  var dangerouslySetInnerHTML = innerHTML ? {
    __html: innerHTML
  } : null;
  return _extends({
    dangerouslySetInnerHTML: dangerouslySetInnerHTML,
    className: className
  }, remainingProps);
}

function react(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      React = _ref.React;

  if (!React) {
    throw new Error("Must pass React library to react renderer");
  }

  var reactRenderer = function reactRenderer(node) {
    if (node.type === NODE_TYPE.COMPONENT) {
      return React.createElement.apply(React, [function () {
        return node.renderComponent(reactRenderer) || null;
      }, node.props].concat(node.renderChildren(reactRenderer)));
    }

    if (node.type === NODE_TYPE.ELEMENT) {
      return React.createElement.apply(React, [node.name, mapReactProps(node.props)].concat(node.renderChildren(reactRenderer)));
    }

    if (node.type === NODE_TYPE.TEXT) {
      return node.text;
    }

    throw new TypeError("Unhandleable node");
  };

  return reactRenderer;
}
// CONCATENATED MODULE: ./node_modules/jsx-pragmatic/src/renderers/html.js


var html_ELEMENT_PROP = {
  INNER_HTML: 'innerHTML'
};
var SELF_CLOSING_TAGS = {
  br: true
};

function html_htmlEncode(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/\//g, '&#x2F;');
}

function propsToHTML(props) {
  var keys = Object.keys(props).filter(function (key) {
    var val = props[key];

    if (key === html_ELEMENT_PROP.INNER_HTML) {
      return false;
    }

    if (!val) {
      return false;
    }

    if (typeof val === 'string' || typeof val === 'number' || val === true) {
      return true;
    }

    return false;
  });

  if (!keys.length) {
    return '';
  }

  var pairs = keys.map(function (key) {
    var val = props[key];

    if (val === true) {
      return "" + html_htmlEncode(key);
    }

    if (typeof val !== 'string' && typeof val !== 'number') {
      throw new TypeError("Unexpected prop type: " + typeof val);
    }

    return html_htmlEncode(key) + "=\"" + html_htmlEncode(val.toString()) + "\"";
  });
  return " " + pairs.join(' ');
}

function html() {
  var htmlRenderer = function htmlRenderer(node) {
    if (node.type === NODE_TYPE.COMPONENT) {
      return [].concat(node.renderComponent(htmlRenderer)).join('');
    }

    if (node.type === NODE_TYPE.ELEMENT) {
      var renderedProps = propsToHTML(node.props);

      if (SELF_CLOSING_TAGS[node.name]) {
        return "<" + node.name + renderedProps + " />";
      } else {
        var renderedChildren = typeof node.props[html_ELEMENT_PROP.INNER_HTML] === 'string' ? node.props[html_ELEMENT_PROP.INNER_HTML] : node.renderChildren(htmlRenderer).join('');
        return "<" + node.name + renderedProps + ">" + renderedChildren + "</" + node.name + ">";
      }
    }

    if (node.type === NODE_TYPE.TEXT) {
      return html_htmlEncode(node.text);
    }

    throw new TypeError("Unhandleable node: " + node.type);
  };

  return htmlRenderer;
}
// CONCATENATED MODULE: ./node_modules/jsx-pragmatic/src/renderers/preact.js


// eslint-disable-line import/no-unresolved



function mapPreactProps(props) {
  var innerHTML = props.innerHTML,
      remainingProps = _objectWithoutPropertiesLoose(props, ["innerHTML"]);

  var dangerouslySetInnerHTML = innerHTML ? {
    __html: innerHTML
  } : null;
  return _extends({
    dangerouslySetInnerHTML: dangerouslySetInnerHTML
  }, remainingProps);
}

function preact(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      Preact = _ref.Preact;

  if (!Preact) {
    throw new Error("Must pass Preact library to react renderer");
  }

  var reactRenderer = function reactRenderer(node) {
    if (node.type === NODE_TYPE.COMPONENT) {
      return Preact.h.apply(Preact, [function () {
        return node.renderComponent(reactRenderer) || null;
      }, node.props].concat(node.renderChildren(reactRenderer)));
    }

    if (node.type === NODE_TYPE.ELEMENT) {
      return Preact.h.apply(Preact, [node.name, mapPreactProps(node.props)].concat(node.renderChildren(reactRenderer)));
    }

    if (node.type === NODE_TYPE.TEXT) {
      return node.text;
    }

    throw new TypeError("Unhandleable node");
  };

  return reactRenderer;
}
// CONCATENATED MODULE: ./node_modules/jsx-pragmatic/src/renderers/index.js




// CONCATENATED MODULE: ./node_modules/jsx-pragmatic/src/index.js



// CONCATENATED MODULE: ./node_modules/@paypal/common-components/src/ui/spinnerPage.jsx
/** @jsx node */

var spinnerStyle = "\n\n    body {\n        width: 100%;\n        height: 100%;\n        overflow: hidden;\n        position: fixed;\n        top: 0;\n        left: 0;\n        margin: 0;\n    }\n\n    .spinner {\n        height: 100%;\n        width: 100%;\n        position: absolute;\n        z-index: 10\n    }\n\n    .spinner .spinWrap {\n        width: 200px;\n        height: 100px;\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        margin-left: -100px;\n        margin-top: -50px\n    }\n\n    .spinner .loader,\n    .spinner .spinnerImage {\n        height: 100px;\n        width: 100px;\n        position: absolute;\n        top: 0;\n        left: 50%;\n        opacity: 1;\n        filter: alpha(opacity=100)\n    }\n\n    .spinner .spinnerImage {\n        margin: 28px 0 0 -25px;\n        background: url(https://www.paypalobjects.com/images/checkout/hermes/icon_ot_spin_lock_skinny.png) no-repeat\n    }\n\n    .spinner .loader {\n        margin: 0 0 0 -55px;\n        background-color: transparent;\n        animation: rotation .7s infinite linear;\n        border-left: 5px solid #cbcbca;\n        border-right: 5px solid #cbcbca;\n        border-bottom: 5px solid #cbcbca;\n        border-top: 5px solid #2380be;\n        border-radius: 100%\n    }\n\n    @keyframes rotation {\n        from {\n            transform: rotate(0deg)\n        }\n        to {\n            transform: rotate(359deg)\n        }\n    }\n";
function SpinnerPage(_ref, children) {
  var nonce = _ref.nonce;
  return node_node("html", null, node_node("head", null, node_node("title", null, "PayPal"), node_node("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1"
  })), node_node("body", null, node_node("div", {
    class: "preloader spinner"
  }, node_node("style", {
    nonce: nonce,
    innerHTML: spinnerStyle
  }), node_node("div", {
    class: "spinWrap"
  }, node_node("p", {
    class: "spinnerImage"
  }), node_node("p", {
    class: "loader"
  }))), children));
}
// CONCATENATED MODULE: ./node_modules/@paypal/common-components/src/ui/index.js

// CONCATENATED MODULE: ./src/ui/popup.jsx
/** @jsx node */





function openPopup(_ref) {
  var width = _ref.width,
      height = _ref.height;
  var win = assertSameDomain(popup('', {
    width: width,
    height: height
  }));
  var doc = win.document;
  var spinner = node_node(SpinnerPage, {
    nonce: getNonce()
  }).render(dom({
    doc: doc
  }));
  writeElementToWindow(win, spinner);
  return win;
}
// CONCATENATED MODULE: ./src/ui/index.js

// CONCATENATED MODULE: ./src/payment-flows/checkout.js









var CHECKOUT_POPUP_DIMENSIONS = {
  WIDTH: 500,
  HEIGHT: 590
};
var checkoutOpen = false;
var canRenderTop = false;

function getRenderWindow() {
  var top = getTop(window);

  if (canRenderTop && top) {
    return top;
  } else if (utils_getParent()) {
    return utils_getParent();
  } else {
    return window;
  }
}

function setupCheckout(_ref) {
  var components = _ref.components;
  var Checkout = components.Checkout;
  checkoutOpen = false;
  var _ref2 = [utils_getParent(window), getTop(window)],
      parent = _ref2[0],
      top = _ref2[1];
  var tasks = {};

  if (top && parent && parent !== top) {
    tasks.canRenderTo = Checkout.canRenderTo(top).then(function (result) {
      canRenderTop = result;
    });
  }

  return promise_ZalgoPromise.hash(tasks).then(src_util_noop);
}

function isCheckoutEligible() {
  return true;
}

function isCheckoutPaymentEligible() {
  return true;
}

function isVaultAutoSetupEligible(_ref3) {
  var vault = _ref3.vault,
      clientAccessToken = _ref3.clientAccessToken,
      createBillingAgreement = _ref3.createBillingAgreement,
      createSubscription = _ref3.createSubscription,
      fundingSource = _ref3.fundingSource,
      fundingEligibility = _ref3.fundingEligibility;

  if (!clientAccessToken) {
    return false;
  }

  if (createBillingAgreement || createSubscription) {
    return false;
  }

  var fundingSourceEligible = Boolean(fundingEligibility[fundingSource] && fundingEligibility[fundingSource].vaultable);

  if (vault && !fundingSourceEligible) {
    throw new Error("SDK received " + SDK_QUERY_KEYS.VAULT + "=true parameter, but " + fundingSource + " is not vaultable.");
  }

  if (vault) {
    return true;
  }

  if (fundingSourceEligible) {
    return true;
  }

  return false;
}

function enableVaultSetup(_ref4) {
  var orderID = _ref4.orderID,
      vault = _ref4.vault,
      clientAccessToken = _ref4.clientAccessToken,
      createBillingAgreement = _ref4.createBillingAgreement,
      createSubscription = _ref4.createSubscription,
      fundingSource = _ref4.fundingSource,
      fundingEligibility = _ref4.fundingEligibility;
  return promise_ZalgoPromise.try(function () {
    if (!clientAccessToken) {
      return;
    }

    if (isVaultAutoSetupEligible({
      vault: vault,
      clientAccessToken: clientAccessToken,
      createBillingAgreement: createBillingAgreement,
      createSubscription: createSubscription,
      fundingSource: fundingSource,
      fundingEligibility: fundingEligibility
    })) {
      return enableVault({
        orderID: orderID,
        clientAccessToken: clientAccessToken
      }).catch(function (err) {
        if (vault) {
          throw err;
        }
      });
    }
  });
}

function getContext(_ref5) {
  var win = _ref5.win,
      isClick = _ref5.isClick;

  if (win) {
    return CONTEXT.POPUP;
  }

  if (isClick && supportsPopups()) {
    return CONTEXT.POPUP;
  }

  return CONTEXT.IFRAME;
}

function initCheckout(_ref6) {
  var props = _ref6.props,
      components = _ref6.components,
      serviceData = _ref6.serviceData,
      payment = _ref6.payment,
      config = _ref6.config;

  if (checkoutOpen) {
    throw new Error("Checkout already rendered");
  }

  var Checkout = components.Checkout;
  var sessionID = props.sessionID,
      buttonSessionID = props.buttonSessionID,
      _createOrder = props.createOrder,
      _onApprove = props.onApprove,
      _onCancel = props.onCancel,
      onShippingChange = props.onShippingChange,
      locale = props.locale,
      commit = props.commit,
      onError = props.onError,
      vault = props.vault,
      clientAccessToken = props.clientAccessToken,
      createBillingAgreement = props.createBillingAgreement,
      createSubscription = props.createSubscription,
      onClick = props.onClick;
  var button = payment.button,
      win = payment.win,
      fundingSource = payment.fundingSource,
      card = payment.card,
      isClick = payment.isClick,
      buyerAccessToken = payment.buyerAccessToken,
      venmoPayloadID = payment.venmoPayloadID;
  var fundingEligibility = serviceData.fundingEligibility,
      buyerCountry = serviceData.buyerCountry;
  var cspNonce = config.cspNonce;
  var context = getContext({
    win: win,
    isClick: isClick
  });
  var approved = false;
  var restart = memoize(function () {
    return initCheckout({
      props: props,
      components: components,
      serviceData: serviceData,
      config: config,
      payment: {
        button: button,
        win: win,
        fundingSource: fundingSource,
        card: card,
        isClick: false
      }
    }).start().finally(unresolvedPromise);
  });

  var onClose = function onClose() {
    checkoutOpen = false;

    if (!approved) {
      return _onCancel();
    }
  };

  var init = function init() {
    return Checkout({
      window: win,
      sessionID: sessionID,
      buttonSessionID: buttonSessionID,
      clientAccessToken: clientAccessToken,
      buyerAccessToken: buyerAccessToken,
      venmoPayloadID: venmoPayloadID,
      createOrder: function createOrder() {
        return _createOrder().then(function (orderID) {
          return enableVaultSetup({
            orderID: orderID,
            vault: vault,
            clientAccessToken: clientAccessToken,
            fundingEligibility: fundingEligibility,
            fundingSource: fundingSource,
            createBillingAgreement: createBillingAgreement,
            createSubscription: createSubscription
          }).then(function () {
            return orderID;
          });
        });
      },
      onApprove: function onApprove(_ref7) {
        var payerID = _ref7.payerID,
            paymentID = _ref7.paymentID,
            billingToken = _ref7.billingToken,
            subscriptionID = _ref7.subscriptionID;
        approved = true;
        getLogger().info("spb_onapprove_access_token_" + (buyerAccessToken ? 'present' : 'not_present')).flush(); // eslint-disable-next-line no-use-before-define

        return close().then(function () {
          return _onApprove({
            payerID: payerID,
            paymentID: paymentID,
            billingToken: billingToken,
            subscriptionID: subscriptionID,
            buyerAccessToken: buyerAccessToken
          }, {
            restart: restart
          }).catch(src_util_noop);
        });
      },
      onAuth: function onAuth(_ref8) {
        var accessToken = _ref8.accessToken;
        getLogger().info("spb_onauth_access_token_" + (accessToken || buyerAccessToken ? 'present' : 'not_present'));

        if (accessToken) {
          buyerAccessToken = accessToken;
        }
      },
      onCancel: function onCancel() {
        // eslint-disable-next-line no-use-before-define
        return close().then(function () {
          return _onCancel();
        });
      },
      onShippingChange: onShippingChange ? function (data, actions) {
        return onShippingChange(_extends({
          buyerAccessToken: buyerAccessToken
        }, data), actions);
      } : null,
      onError: onError,
      onClose: onClose,
      fundingSource: fundingSource,
      card: card,
      buyerCountry: buyerCountry,
      locale: locale,
      commit: commit,
      cspNonce: cspNonce
    });
  };

  var instance;

  var close = function close() {
    checkoutOpen = false;
    return promise_ZalgoPromise.try(function () {
      if (instance) {
        return instance.close();
      }
    });
  };

  var start = memoize(function () {
    instance = init();
    return instance.renderTo(getRenderWindow(), TARGET_ELEMENT.BODY, context);
  });

  var click = function click() {
    if (!onClick) {
      start();
      return;
    }

    if (supportsPopups()) {
      win = win || openPopup({
        width: CHECKOUT_POPUP_DIMENSIONS.WIDTH,
        height: CHECKOUT_POPUP_DIMENSIONS.HEIGHT
      });
    }

    return promise_ZalgoPromise.try(function () {
      return onClick ? onClick({
        fundingSource: fundingSource
      }) : true;
    }).then(function (valid) {
      if (win && !valid) {
        win.close();
      }
    });
  };

  return {
    click: click,
    start: start,
    close: close
  };
}

var checkout = {
  name: 'checkout',
  setup: setupCheckout,
  isEligible: isCheckoutEligible,
  isPaymentEligible: isCheckoutPaymentEligible,
  init: initCheckout
};
// CONCATENATED MODULE: ./src/payment-flows/card-fields.js








function setupCardFields() {// pass
}

var cardFieldsOpen = false;

function isCardFieldsEligible(_ref) {
  var props = _ref.props,
      serviceData = _ref.serviceData;
  var vault = props.vault,
      onShippingChange = props.onShippingChange,
      enableStandardCardFields = props.enableStandardCardFields;
  var eligibility = serviceData.eligibility;

  if (vault) {
    return false;
  }

  if (onShippingChange) {
    return false;
  } // if merchant opt-in inline guest, they will ALWAYS see inline guest guest


  if (enableStandardCardFields) {
    return true;
  }

  return eligibility.cardFields;
}

function isCardFieldsPaymentEligible(_ref2) {
  var payment = _ref2.payment;

  var _ref3 = payment || {},
      win = _ref3.win,
      fundingSource = _ref3.fundingSource;

  if (win) {
    return false;
  }

  if (fundingSource && fundingSource !== FUNDING.CARD) {
    return false;
  }

  return true;
}

function highlightCard(card) {
  if (!card) {
    return;
  }

  querySelectorAll("[" + DATA_ATTRIBUTES.CARD + "]").forEach(function (el) {
    el.style.opacity = el.getAttribute(DATA_ATTRIBUTES.CARD) === card ? '1' : '0.1';
  });
}

function unhighlightCards() {
  querySelectorAll("[" + DATA_ATTRIBUTES.CARD + "]").forEach(function (el) {
    el.style.opacity = '1';
  });
}

var card_fields_getElements = function getElements() {
  var buttonsContainer = document.querySelector('#buttons-container');
  var cardButtonsContainer = document.querySelector("[" + DATA_ATTRIBUTES.FUNDING_SOURCE + "=\"" + FUNDING.CARD + "\"]");
  var cardFieldsContainer = document.querySelector('#card-fields-container');

  if (!buttonsContainer || !cardButtonsContainer || !cardFieldsContainer) {
    throw new Error("Did not find card fields elements");
  }

  return {
    buttonsContainer: buttonsContainer,
    cardButtonsContainer: cardButtonsContainer,
    cardFieldsContainer: cardFieldsContainer
  };
};

var card_fields_slideUpButtons = function slideUpButtons() {
  var _getElements = card_fields_getElements(),
      buttonsContainer = _getElements.buttonsContainer,
      cardButtonsContainer = _getElements.cardButtonsContainer,
      cardFieldsContainer = _getElements.cardFieldsContainer;

  if (!buttonsContainer || !cardButtonsContainer || !cardFieldsContainer) {
    throw new Error("Required elements not found");
  }

  cardFieldsContainer.style.minHeight = '0px';
  cardFieldsContainer.style.display = 'block';

  var recalculateMargin = function recalculateMargin() {
    buttonsContainer.style.marginTop = buttonsContainer.offsetTop - cardButtonsContainer.offsetTop + "px";
  };

  window.addEventListener('resize', debounce(function () {
    buttonsContainer.style.transitionDuration = '0s';
    recalculateMargin();
  }));
  recalculateMargin();
};

var slideDownButtons = function slideDownButtons() {
  var _getElements2 = card_fields_getElements(),
      buttonsContainer = _getElements2.buttonsContainer;

  unhighlightCards();
  buttonsContainer.style.marginTop = "0px";
};

function initCardFields(_ref4) {
  var props = _ref4.props,
      components = _ref4.components,
      payment = _ref4.payment,
      serviceData = _ref4.serviceData,
      config = _ref4.config;
  var createOrder = props.createOrder,
      _onApprove = props.onApprove,
      onCancel = props.onCancel,
      locale = props.locale,
      commit = props.commit,
      onError = props.onError,
      sessionID = props.sessionID,
      buttonSessionID = props.buttonSessionID;
  var CardFields = components.CardFields;
  var fundingSource = payment.fundingSource,
      card = payment.card;
  var cspNonce = config.cspNonce;
  var buyerCountry = serviceData.buyerCountry;

  if (cardFieldsOpen) {
    highlightCard(card);
    return {
      start: promiseNoop,
      close: promiseNoop
    };
  }

  var restart = memoize(function () {
    return checkout.init({
      props: props,
      components: components,
      payment: _extends({}, payment, {
        isClick: false
      }),
      serviceData: serviceData,
      config: config
    }).start().finally(unresolvedPromise);
  });

  var onClose = function onClose() {
    cardFieldsOpen = false;
  };

  var onCardTypeChange = function onCardTypeChange(_ref5) {
    var cardType = _ref5.card;
    highlightCard(cardType);
  };

  var buyerAccessToken;

  var _CardFields = CardFields({
    createOrder: createOrder,
    fundingSource: fundingSource,
    card: card,
    onApprove: function onApprove(_ref6) {
      var payerID = _ref6.payerID,
          paymentID = _ref6.paymentID,
          billingToken = _ref6.billingToken;
      // eslint-disable-next-line no-use-before-define
      return close().then(function () {
        return _onApprove({
          payerID: payerID,
          paymentID: paymentID,
          billingToken: billingToken,
          buyerAccessToken: buyerAccessToken
        }, {
          restart: restart
        }).catch(src_util_noop);
      });
    },
    onAuth: function onAuth(_ref7) {
      var accessToken = _ref7.accessToken;
      buyerAccessToken = accessToken;
    },
    onCancel: onCancel,
    onError: onError,
    onClose: onClose,
    onCardTypeChange: onCardTypeChange,
    sessionID: sessionID,
    buttonSessionID: buttonSessionID,
    buyerCountry: buyerCountry,
    locale: locale,
    commit: commit,
    cspNonce: cspNonce
  }),
      render = _CardFields.render,
      closeCardFields = _CardFields.close;

  cardFieldsOpen = true;

  var start = function start() {
    cardFieldsOpen = true;
    var renderPromise = render('#card-fields-container');
    card_fields_slideUpButtons();
    highlightCard(card);
    return renderPromise;
  };

  var close = function close() {
    slideDownButtons();
    return closeCardFields();
  };

  return {
    start: start,
    close: close
  };
}

var cardFields = {
  name: 'card_fields',
  setup: setupCardFields,
  isEligible: isCardFieldsEligible,
  isPaymentEligible: isCardFieldsPaymentEligible,
  init: initCardFields,
  inline: true
};
// CONCATENATED MODULE: ./src/payment-flows/vault-capture.js




function setupVaultCapture() {// pass
}

function isVaultCaptureEligible(_ref) {
  var props = _ref.props;
  var onShippingChange = props.onShippingChange;

  if (onShippingChange) {
    return false;
  }

  return true;
}

function isVaultCapturePaymentEligible(_ref2) {
  var payment = _ref2.payment;

  var _ref3 = payment || {},
      win = _ref3.win,
      paymentMethodID = _ref3.paymentMethodID;

  if (win) {
    return false;
  }

  if (!paymentMethodID) {
    return false;
  }

  return true;
}

function handleThreeDomainSecure(_ref4) {
  var ThreeDomainSecure = _ref4.ThreeDomainSecure,
      createOrder = _ref4.createOrder,
      getParent = _ref4.getParent;
  var promise = new promise_ZalgoPromise();
  var instance = ThreeDomainSecure({
    createOrder: createOrder,
    onSuccess: function onSuccess() {
      return promise.resolve();
    },
    onCancel: function onCancel() {
      return promise.reject(new Error("3DS cancelled"));
    },
    onError: function onError(err) {
      return promise.reject(err);
    }
  });
  return instance.renderTo(getParent(), TARGET_ELEMENT.BODY).then(function () {
    return promise;
  }).finally(instance.close);
}

function handleValidateResponse(_ref5) {
  var ThreeDomainSecure = _ref5.ThreeDomainSecure,
      status = _ref5.status,
      body = _ref5.body,
      createOrder = _ref5.createOrder,
      getParent = _ref5.getParent;
  return promise_ZalgoPromise.try(function () {
    if (status === 422 && body.links && body.links.some(function (link) {
      return link.rel === '3ds-contingency-resolution';
    })) {
      return handleThreeDomainSecure({
        ThreeDomainSecure: ThreeDomainSecure,
        createOrder: createOrder,
        getParent: getParent
      });
    }

    if (status !== 200) {
      throw new Error("Validate payment failed with status: " + status);
    }
  });
}

function initVaultCapture(_ref6) {
  var props = _ref6.props,
      components = _ref6.components,
      payment = _ref6.payment;
  var createOrder = props.createOrder,
      onApprove = props.onApprove,
      clientAccessToken = props.clientAccessToken,
      enableThreeDomainSecure = props.enableThreeDomainSecure,
      buttonSessionID = props.buttonSessionID,
      partnerAttributionID = props.partnerAttributionID,
      getParent = props.getParent;
  var ThreeDomainSecure = components.ThreeDomainSecure;
  var paymentMethodID = payment.paymentMethodID;

  if (!paymentMethodID) {
    throw new Error("Payment method id required for vault capture");
  }

  if (!clientAccessToken) {
    throw new Error("Client access token required for vault capture");
  }

  var restart = function restart() {
    return promise_ZalgoPromise.try(function () {
      throw new Error("Vault capture restart not implemented");
    });
  };

  var start = function start() {
    return promise_ZalgoPromise.try(function () {
      return createOrder();
    }).then(function (orderID) {
      return validatePaymentMethod({
        clientAccessToken: clientAccessToken,
        orderID: orderID,
        paymentMethodID: paymentMethodID,
        enableThreeDomainSecure: enableThreeDomainSecure,
        buttonSessionID: buttonSessionID,
        partnerAttributionID: partnerAttributionID
      });
    }).then(function (_ref7) {
      var status = _ref7.status,
          body = _ref7.body;
      return handleValidateResponse({
        ThreeDomainSecure: ThreeDomainSecure,
        status: status,
        body: body,
        createOrder: createOrder,
        getParent: getParent
      });
    }).then(function () {
      return onApprove({}, {
        restart: restart
      });
    });
  };

  return {
    start: start,
    close: function close() {
      return promise_ZalgoPromise.resolve();
    }
  };
}

var vaultCapture = {
  name: 'vault_capture',
  setup: setupVaultCapture,
  isEligible: isVaultCaptureEligible,
  isPaymentEligible: isVaultCapturePaymentEligible,
  init: initVaultCapture,
  spinner: true,
  inline: true
};
// CONCATENATED MODULE: ./src/payment-flows/native.js










var SOURCE_APP = 'paypal_smart_payment_buttons';
var TARGET_APP = 'paypal_native_checkout';
var POST_MESSAGE = {
  AWAIT_REDIRECT: 'awaitRedirect',
  DETECT_APP_SWITCH: 'detectAppSwitch',
  DETECT_WEB_SWITCH: 'detectWebSwitch'
};
var SOCKET_MESSAGE = {
  SET_PROPS: 'setProps',
  GET_PROPS: 'getProps',
  CLOSE: 'close',
  ON_APPROVE: 'onApprove',
  ON_CANCEL: 'onCancel',
  ON_ERROR: 'onError'
};
var NATIVE_DOMAIN = 'https://www.paypal.com';
var NATIVE_POPUP_DOMAIN = 'https://ic.paypal.com';
var getNativeSocket = memoize(function (_ref) {
  var sessionUID = _ref.sessionUID,
      firebaseConfig = _ref.firebaseConfig,
      version = _ref.version;
  return firebaseSocket({
    sessionUID: sessionUID,
    sourceApp: SOURCE_APP,
    sourceAppVersion: version,
    targetApp: TARGET_APP,
    config: firebaseConfig
  });
});

function isIOSSafari() {
  return isIos() && isSafari();
}

function isAndroidChrome() {
  return isAndroid() && isChrome();
}

function useDirectAppSwitch() {
  return isAndroidChrome();
}

function didAppSwitch(popupWin) {
  return !popupWin || isWindowClosed(popupWin);
}

function attemptPopupAppSwitch(url) {
  try {
    return popup(url);
  } catch (err) {
    if (!(err instanceof PopupOpenError)) {
      throw err;
    }
  }
}

function isNativeOptedIn(_ref2) {
  var props = _ref2.props;
  var enableNativeCheckout = props.enableNativeCheckout;

  if (enableNativeCheckout) {
    return true;
  }

  try {
    if (window.localStorage.getItem('__native_checkout__')) {
      return true;
    }
  } catch (err) {// pass
  }

  return false;
}

var native_sessionUID;
var nativeSocket;
var initialPageUrl;

function isNativeEligible(_ref3) {
  var props = _ref3.props,
      config = _ref3.config,
      serviceData = _ref3.serviceData;
  var platform = props.platform,
      onShippingChange = props.onShippingChange,
      createBillingAgreement = props.createBillingAgreement,
      createSubscription = props.createSubscription;
  var firebaseConfig = config.firebase;
  var eligibility = serviceData.eligibility;

  if (platform !== PLATFORM.MOBILE) {
    return false;
  }

  if (onShippingChange) {
    return false;
  }

  if (createBillingAgreement || createSubscription) {
    return false;
  }

  if (!supportsPopups()) {
    return false;
  }

  if (!firebaseConfig) {
    return false;
  }

  if (!isIOSSafari() && !isAndroidChrome()) {
    return false;
  }

  if (isNativeOptedIn({
    props: props
  })) {
    return true;
  }

  if (eligibility.nativeCheckout.paypal || eligibility.nativeCheckout.venmo) {
    return true;
  }

  return false;
}

function isNativePaymentEligible(_ref4) {
  var payment = _ref4.payment,
      props = _ref4.props,
      serviceData = _ref4.serviceData;
  var win = payment.win,
      fundingSource = payment.fundingSource;
  var eligibility = serviceData.eligibility;

  if (win) {
    return false;
  }

  if (!nativeSocket) {
    return false;
  }

  if (!initialPageUrl) {
    return false;
  }

  if (fundingSource === FUNDING.VENMO && !isNativeOptedIn({
    props: props
  })) {
    return false;
  }

  if (isNativeOptedIn({
    props: props
  })) {
    return true;
  }

  if (eligibility.nativeCheckout[fundingSource]) {
    return true;
  }

  return false;
}

function setupNative(_ref5) {
  var config = _ref5.config,
      props = _ref5.props;
  return promise_ZalgoPromise.try(function () {
    var version = config.version,
        firebaseConfig = config.firebase;
    var getPageUrl = props.getPageUrl;
    native_sessionUID = uniqueID();
    nativeSocket = getNativeSocket({
      sessionUID: native_sessionUID,
      firebaseConfig: firebaseConfig,
      version: version
    });
    nativeSocket.onError(function (err) {
      nativeSocket = null;
      getLogger().error('native_socket_error', {
        err: stringifyError(err)
      });
    });
    return getPageUrl().then(function (pageUrl) {
      initialPageUrl = pageUrl;
    });
  });
}

function initNative(_ref6) {
  var props = _ref6.props,
      components = _ref6.components,
      config = _ref6.config,
      payment = _ref6.payment,
      serviceData = _ref6.serviceData;
  var createOrder = props.createOrder,
      onApprove = props.onApprove,
      onCancel = props.onCancel,
      onError = props.onError,
      commit = props.commit,
      getPageUrl = props.getPageUrl,
      buttonSessionID = props.buttonSessionID,
      env = props.env,
      stageHost = props.stageHost,
      apiStageHost = props.apiStageHost,
      onClick = props.onClick;
  var facilitatorAccessToken = serviceData.facilitatorAccessToken,
      sdkMeta = serviceData.sdkMeta;
  var fundingSource = payment.fundingSource;
  var clean = cleanup();

  var close = function close() {
    return clean.all();
  };

  var listen = function listen(popupWin, domain, event, handler) {
    return paypal.postRobot.once(event, {
      window: popupWin,
      domain: domain
    }, handler);
  };

  var fallbackToWebCheckout = function fallbackToWebCheckout(fallbackWin) {
    var checkoutPayment = _extends({}, payment, {
      win: fallbackWin,
      isClick: false
    });

    var instance = checkout.init({
      props: props,
      components: components,
      payment: checkoutPayment,
      config: config,
      serviceData: serviceData
    });
    clean.register(function () {
      return instance.close();
    });
    return instance.start();
  };

  var getNativeUrl = function getNativeUrl(_temp) {
    var _ref7 = _temp === void 0 ? {} : _temp,
        _ref7$pageUrl = _ref7.pageUrl,
        pageUrl = _ref7$pageUrl === void 0 ? initialPageUrl : _ref7$pageUrl;

    return extendUrl("" + NATIVE_DOMAIN + NATIVE_CHECKOUT_URI[fundingSource], {
      query: {
        sdkMeta: sdkMeta,
        sessionUID: native_sessionUID,
        buttonSessionID: buttonSessionID,
        pageUrl: pageUrl
      }
    });
  };

  var getNativePopupUrl = function getNativePopupUrl() {
    return extendUrl("" + NATIVE_POPUP_DOMAIN + NATIVE_CHECKOUT_POPUP_URI[fundingSource], {
      query: {
        sdkMeta: sdkMeta
      }
    });
  };

  var getWebCheckoutUrl = function getWebCheckoutUrl(_ref8) {
    var orderID = _ref8.orderID;
    return extendUrl("" + getDomain() + WEB_CHECKOUT_URI, {
      query: {
        fundingSource: fundingSource,
        facilitatorAccessToken: facilitatorAccessToken,
        token: orderID,
        useraction: commit ? USER_ACTION.COMMIT : USER_ACTION.CONTINUE,
        native_xo: '1',
        venmoOverride: fundingSource === FUNDING.VENMO ? '1' : '0'
      }
    });
  };

  var getSDKProps = function getSDKProps() {
    return promise_ZalgoPromise.hash({
      orderID: createOrder(),
      pageUrl: getPageUrl()
    }).then(function (_ref9) {
      var orderID = _ref9.orderID,
          pageUrl = _ref9.pageUrl;
      var userAgent = getUserAgent();
      var webCheckoutUrl = getWebCheckoutUrl({
        orderID: orderID
      });
      var forceEligible = isNativeOptedIn({
        props: props
      });
      return {
        orderID: orderID,
        facilitatorAccessToken: facilitatorAccessToken,
        pageUrl: pageUrl,
        commit: commit,
        webCheckoutUrl: webCheckoutUrl,
        userAgent: userAgent,
        buttonSessionID: buttonSessionID,
        env: env,
        stageHost: stageHost,
        apiStageHost: apiStageHost,
        forceEligible: forceEligible
      };
    });
  };

  var connectNative = function connectNative() {
    var socket = nativeSocket;

    if (!socket) {
      throw new Error("Native socket connection not established");
    }

    var setNativeProps = once(function () {
      return getSDKProps().then(function (sdkProps) {
        getLogger().info("native_message_setprops").flush();
        return socket.send(SOCKET_MESSAGE.SET_PROPS, sdkProps);
      }).then(function () {
        var _getLogger$info$track;

        getLogger().info("native_response_setprops").track((_getLogger$info$track = {}, _getLogger$info$track[FPTI_KEY.TRANSITION] = FPTI_TRANSITION.NATIVE_APP_SWITCH_ACK, _getLogger$info$track)).flush();
      });
    });
    var closeNative = once(function () {
      getLogger().info("native_message_close").flush();
      return socket.send(SOCKET_MESSAGE.CLOSE).then(function () {
        getLogger().info("native_response_close").flush();
        return close();
      });
    });
    var getPropsListener = socket.on(SOCKET_MESSAGE.GET_PROPS, function () {
      getLogger().info("native_message_getprops").flush();
      return getSDKProps();
    });
    var onApproveListener = socket.on(SOCKET_MESSAGE.ON_APPROVE, function (_ref10) {
      var _ref10$data = _ref10.data,
          payerID = _ref10$data.payerID,
          paymentID = _ref10$data.paymentID,
          billingToken = _ref10$data.billingToken;
      getLogger().info("native_message_onapprove").flush();
      var data = {
        payerID: payerID,
        paymentID: paymentID,
        billingToken: billingToken,
        forceRestAPI: true
      };
      var actions = {
        restart: function restart() {
          return fallbackToWebCheckout();
        }
      };
      return close().then(function () {
        return onApprove(data, actions);
      });
    });
    var onCancelListener = socket.on(SOCKET_MESSAGE.ON_CANCEL, function () {
      getLogger().info("native_message_oncancel").flush();
      return close().then(function () {
        return onCancel();
      });
    });
    var onErrorListener = socket.on(SOCKET_MESSAGE.ON_ERROR, function (_ref11) {
      var message = _ref11.data.message;
      getLogger().info("native_message_onerror", {
        err: message
      }).flush();
      return close().then(function () {
        return onError(new Error(message));
      });
    });
    clean.register(getPropsListener.cancel);
    clean.register(onApproveListener.cancel);
    clean.register(onCancelListener.cancel);
    clean.register(onErrorListener.cancel);
    clean.register(closeNative);
    socket.reconnect();
    return {
      setProps: setNativeProps,
      close: closeNative
    };
  };

  var open = function open() {
    var nativeUrl = getNativeUrl();
    var nativePopupUrl = getNativePopupUrl();
    var popupWin;

    if (useDirectAppSwitch()) {
      popupWin = attemptPopupAppSwitch(nativeUrl);
    } else {
      popupWin = popup(nativePopupUrl);
    }

    clean.register(function () {
      if (popupWin) {
        popupWin.close();
      }
    });
    return popupWin;
  };

  var detectAppSwitch = once(function () {
    var _getLogger$info$track2;

    getLogger().info("native_detect_app_switch").track((_getLogger$info$track2 = {}, _getLogger$info$track2[FPTI_KEY.TRANSITION] = FPTI_TRANSITION.NATIVE_DETECT_APP_SWITCH, _getLogger$info$track2)).flush();
    return connectNative().setProps();
  });
  var detectWebSwitch = once(function (fallbackWin) {
    var _getLogger$info$track3;

    getLogger().info("native_detect_web_switch").track((_getLogger$info$track3 = {}, _getLogger$info$track3[FPTI_KEY.TRANSITION] = FPTI_TRANSITION.NATIVE_DETECT_WEB_SWITCH, _getLogger$info$track3)).flush();
    return fallbackToWebCheckout(fallbackWin);
  });

  var initDirectAppSwitch = function initDirectAppSwitch(popupWin) {
    var detectWebSwitchListener = listen(popupWin, NATIVE_DOMAIN, POST_MESSAGE.DETECT_WEB_SWITCH, function () {
      getLogger().info("native_post_message_detect_wev_switch").flush();
      return detectWebSwitch(popupWin);
    });
    clean.register(detectWebSwitchListener.cancel);
    return createOrder().then(function () {
      if (didAppSwitch(popupWin)) {
        return detectAppSwitch();
      } else if (popupWin) {
        return detectWebSwitch(popupWin);
      } else {
        throw new Error("No window found");
      }
    });
  };

  var initPopupAppSwitch = function initPopupAppSwitch(popupWin) {
    var awaitRedirectListener = listen(popupWin, NATIVE_POPUP_DOMAIN, POST_MESSAGE.AWAIT_REDIRECT, function (_ref12) {
      var pageUrl = _ref12.data.pageUrl;
      getLogger().info("native_post_message_await_redirect").flush();
      return {
        redirectUrl: getNativeUrl({
          pageUrl: pageUrl
        })
      };
    });
    var detectAppSwitchListener = listen(popupWin, NATIVE_POPUP_DOMAIN, POST_MESSAGE.DETECT_APP_SWITCH, function () {
      getLogger().info("native_post_message_detect_app_switch").flush();
      return detectAppSwitch();
    });
    var detectWebSwitchListener = listen(popupWin, NATIVE_DOMAIN, POST_MESSAGE.DETECT_WEB_SWITCH, function () {
      getLogger().info("native_post_message_detect_web_switch").flush();
      return detectWebSwitch(popupWin);
    });
    clean.register(awaitRedirectListener.cancel);
    clean.register(detectAppSwitchListener.cancel);
    clean.register(detectWebSwitchListener.cancel);
    return awaitRedirectListener.then(function () {
      return promiseOne([detectAppSwitchListener, detectWebSwitchListener]);
    });
  };

  var win;

  var click = function click() {
    win = open();
    return promise_ZalgoPromise.try(function () {
      return onClick ? onClick({
        fundingSource: fundingSource
      }) : true;
    }).then(function (valid) {
      if (!valid) {
        setTimeout(function () {
          if (didAppSwitch(win)) {
            connectNative();
          }

          close();
        }, 500);
      }
    }, function (err) {
      close();
      throw err;
    });
  };

  var start = memoize(function () {
    return promise_ZalgoPromise.try(function () {
      return useDirectAppSwitch() ? initDirectAppSwitch(win) : initPopupAppSwitch(win);
    }).catch(function (err) {
      var _getLogger$info$track4;

      getLogger().info("native_error", {
        err: stringifyError(err)
      }).track((_getLogger$info$track4 = {}, _getLogger$info$track4[FPTI_KEY.TRANSITION] = FPTI_TRANSITION.NATIVE_ERROR, _getLogger$info$track4[FPTI_KEY.ERROR_CODE] = 'native_error', _getLogger$info$track4[FPTI_KEY.ERROR_DESC] = stringifyErrorMessage(err), _getLogger$info$track4)).flush();

      if (didAppSwitch(win)) {
        connectNative();
      }

      return close().then(function () {
        throw err;
      });
    });
  });
  return {
    click: click,
    start: start,
    close: close
  };
}

var native_native = {
  name: 'native',
  setup: setupNative,
  isEligible: isNativeEligible,
  isPaymentEligible: isNativePaymentEligible,
  init: initNative,
  spinner: true
};
// CONCATENATED MODULE: ./src/payment-flows/popup-bridge.js







var parentPopupBridge;

function setupPopupBridge(_ref) {
  var props = _ref.props;
  return promise_ZalgoPromise.try(function () {
    var getPopupBridge = props.getPopupBridge;

    if (getPopupBridge) {
      return getPopupBridge().then(function (bridge) {
        parentPopupBridge = bridge;
      });
    }
  });
}

function isPopupBridgeEligible(_ref2) {
  var props = _ref2.props;
  var onShippingChange = props.onShippingChange;

  if (onShippingChange) {
    return false;
  }

  return true;
}

function isPopupBridgePaymentEligible(_ref3) {
  var payment = _ref3.payment;
  var win = payment.win;

  if (win) {
    return false;
  }

  if (!parentPopupBridge) {
    return false;
  }

  return true;
}

function initPopupBridge(_ref4) {
  var props = _ref4.props,
      payment = _ref4.payment;
  var createOrder = props.createOrder,
      onApprove = props.onApprove,
      onCancel = props.onCancel,
      commit = props.commit;
  var fundingSource = payment.fundingSource;

  var start = function start() {
    return createOrder().then(function (orderID) {
      if (!parentPopupBridge) {
        throw new Error("Popup bridge required");
      }

      var url = extendUrl("" + getDomain() + WEB_CHECKOUT_URI, {
        query: {
          fundingSource: fundingSource,
          token: orderID,
          useraction: commit ? USER_ACTION.COMMIT : USER_ACTION.CONTINUE,
          redirect_uri: parentPopupBridge.nativeUrl
        }
      });
      return parentPopupBridge.start(url);
    }).then(function (_ref5) {
      var opType = _ref5.opType,
          payerID = _ref5.PayerID,
          paymentID = _ref5.paymentId,
          billingToken = _ref5.ba_token;

      if (opType === POPUP_BRIDGE_OPTYPE.PAYMENT) {
        return onApprove({
          payerID: payerID,
          paymentID: paymentID,
          billingToken: billingToken
        }, {
          restart: start
        });
      }

      if (opType === POPUP_BRIDGE_OPTYPE.CANCEL) {
        return onCancel();
      }

      throw new Error("Unhandleable opType: " + opType);
    });
  };

  return {
    start: start,
    close: promiseNoop
  };
}

var popupBridge = {
  name: 'popup_bridge',
  setup: setupPopupBridge,
  isEligible: isPopupBridgeEligible,
  isPaymentEligible: isPopupBridgePaymentEligible,
  init: initPopupBridge,
  spinner: true
};
// CONCATENATED MODULE: ./src/payment-flows/types.js

// export something to force webpack to see this as an ES module
var payment_flows_types_TYPES = true;
// CONCATENATED MODULE: ./src/payment-flows/index.js






// CONCATENATED MODULE: ./src/button/orders.js







function updateButtonClientConfig(_ref) {
  var orderID = _ref.orderID,
      fundingSource = _ref.fundingSource,
      _ref$inline = _ref.inline,
      inline = _ref$inline === void 0 ? false : _ref$inline;
  return updateClientConfig({
    orderID: orderID,
    fundingSource: fundingSource,
    integrationArtifact: INTEGRATION_ARTIFACT.PAYPAL_JS_SDK,
    userExperienceFlow: inline ? USER_EXPERIENCE_FLOW.INLINE : USER_EXPERIENCE_FLOW.INCONTEXT,
    productFlow: PRODUCT_FLOW.SMART_PAYMENT_BUTTONS
  });
}
function validateOrder(orderID, _ref2) {
  var clientID = _ref2.clientID,
      merchantID = _ref2.merchantID;
  // $FlowFixMe
  return promise_ZalgoPromise.all([callGraphQL({
    query: "\n                query GetCheckoutDetails($orderID: String!) {\n                    checkoutSession(token: $orderID) {\n                        cart {\n                            intent\n                            amounts {\n                                total {\n                                    currencyCode\n                                }\n                            }\n                        }\n                    }\n                }\n            ",
    variables: {
      orderID: orderID
    }
  }), getPayee(orderID)]).then(function (_ref3) {
    var gql = _ref3[0],
        payee = _ref3[1];
    var cart = gql.checkoutSession.cart;
    var intent = cart.intent.toLowerCase() === 'sale' ? INTENT.CAPTURE : cart.intent.toLowerCase();
    var currency = cart.amounts && cart.amounts.total.currencyCode;
    var expectedIntent = intent;
    var expectedCurrency = currency;

    if (intent !== expectedIntent) {
      throw new Error("Expected intent from order api call to be " + expectedIntent + ", got " + intent + ". Please ensure you are passing " + SDK_QUERY_KEYS.INTENT + "=" + intent + " to the sdk");
    }

    if (currency && currency !== expectedCurrency) {
      throw new Error("Expected currency from order api call to be " + expectedCurrency + ", got " + currency + ". Please ensure you are passing " + SDK_QUERY_KEYS.CURRENCY + "=" + currency + " to the sdk");
    }

    var payeeMerchantID = payee && payee.merchant && payee.merchant.id;
    var actualMerchantID = merchantID && merchantID.length && merchantID[0];

    if (!actualMerchantID) {
      throw new Error("Could not determine correct merchant id");
    }

    if (!payeeMerchantID) {
      throw new Error("No payee found in transaction. Expected " + actualMerchantID);
    }

    if (payeeMerchantID !== actualMerchantID) {
      if (clientID && CLIENT_ID_PAYEE_NO_MATCH.indexOf(clientID) === -1) {
        getLogger().info("client_id_payee_no_match_" + clientID).flush(); // throw new Error(`Payee passed in transaction does not match expected merchant id: ${ actualMerchantID }`);
      }
    }

    var xpropMerchantID = window.xprops.merchantID && window.xprops.merchantID[0];

    if (xpropMerchantID && payeeMerchantID !== xpropMerchantID) {
      throw new Error("Payee passed in transaction does not match expected merchant id: " + xpropMerchantID);
    }
  });
}
// CONCATENATED MODULE: ./src/button/pay.js








var PAYMENT_FLOWS = [vaultCapture, cardFields, popupBridge, native_native, checkout];
function setupPaymentFlows(_ref) {
  var props = _ref.props,
      config = _ref.config,
      serviceData = _ref.serviceData,
      components = _ref.components;
  return promise_ZalgoPromise.all(PAYMENT_FLOWS.map(function (flow) {
    return flow.isEligible({
      props: props,
      config: config,
      serviceData: serviceData,
      components: components
    }) ? flow.setup({
      props: props,
      config: config,
      serviceData: serviceData,
      components: components
    }) : null;
  })).then(src_util_noop);
}
function getPaymentFlow(_ref2) {
  var props = _ref2.props,
      payment = _ref2.payment,
      config = _ref2.config,
      components = _ref2.components,
      serviceData = _ref2.serviceData;

  for (var _i2 = 0; _i2 < PAYMENT_FLOWS.length; _i2++) {
    var flow = PAYMENT_FLOWS[_i2];

    if (flow.isEligible({
      props: props,
      config: config,
      components: components,
      serviceData: serviceData
    }) && flow.isPaymentEligible({
      props: props,
      payment: payment,
      config: config,
      components: components,
      serviceData: serviceData
    })) {
      return flow;
    }
  }

  throw new Error("Could not find eligible payment flow");
}

var pay_sendPersonalizationBeacons = function sendPersonalizationBeacons(personalization) {
  if (personalization && personalization.tagline && personalization.tagline.tracking) {
    sendBeacon(personalization.tagline.tracking.click);
  }

  if (personalization && personalization.buttonText && personalization.buttonText.tracking) {
    sendBeacon(personalization.buttonText.tracking.click);
  }
};

function initiatePaymentFlow(_ref3) {
  var payment = _ref3.payment,
      serviceData = _ref3.serviceData,
      config = _ref3.config,
      components = _ref3.components,
      props = _ref3.props;
  var button = payment.button,
      fundingSource = payment.fundingSource,
      _payment$decorateCrea = payment.decorateCreateOrder,
      decorateCreateOrder = _payment$decorateCrea === void 0 ? identity : _payment$decorateCrea;
  return promise_ZalgoPromise.try(function () {
    var _getLogger$info$info$;

    var personalization = serviceData.personalization,
        merchantID = serviceData.merchantID;
    var clientID = props.clientID,
        onClick = props.onClick,
        createOrder = props.createOrder;
    createOrder = decorateCreateOrder(createOrder);
    pay_sendPersonalizationBeacons(personalization);

    var _getPaymentFlow = getPaymentFlow({
      props: props,
      payment: payment,
      config: config,
      components: components,
      serviceData: serviceData
    }),
        name = _getPaymentFlow.name,
        init = _getPaymentFlow.init,
        inline = _getPaymentFlow.inline,
        spinner = _getPaymentFlow.spinner;

    var _init = init({
      props: props,
      config: config,
      serviceData: serviceData,
      components: components,
      payment: payment
    }),
        _init$click = _init.click,
        click = _init$click === void 0 ? promiseNoop : _init$click,
        start = _init.start,
        close = _init.close;

    var clickPromise = click();
    getLogger().info("button_click").info("pay_flow_" + name).track((_getLogger$info$info$ = {}, _getLogger$info$info$[FPTI_KEY.TRANSITION] = FPTI_TRANSITION.BUTTON_CLICK, _getLogger$info$info$[FPTI_KEY.CHOSEN_FUNDING] = fundingSource, _getLogger$info$info$[FPTI_KEY.PAYMENT_FLOW] = name, _getLogger$info$info$)).flush();
    return promise_ZalgoPromise.hash({
      valid: onClick ? onClick({
        fundingSource: fundingSource
      }) : true
    }).then(function (_ref4) {
      var valid = _ref4.valid;

      if (!valid) {
        return;
      }

      if (spinner) {
        enableLoadingSpinner(button);
      }

      createOrder().then(function (orderID) {
        return updateButtonClientConfig({
          orderID: orderID,
          fundingSource: fundingSource,
          inline: inline
        });
      }).catch(function (err) {
        return getLogger().error('update_client_config_error', {
          err: stringifyError(err)
        });
      });
      return start().then(function () {
        return createOrder();
      }).then(function (orderID) {
        return validateOrder(orderID, {
          clientID: clientID,
          merchantID: merchantID
        });
      }).then(function () {
        return clickPromise;
      }).catch(function (err) {
        return promise_ZalgoPromise.all([close(), promise_ZalgoPromise.reject(err)]);
      }).then(src_util_noop);
    });
  }).finally(function () {
    disableLoadingSpinner(button);
  });
}
// CONCATENATED MODULE: ./src/menu/interface.js


function renderSmartMenu(_ref) {
  var clientID = _ref.clientID;
  var _paypal = paypal,
      Menu = _paypal.Menu;

  if (!Menu) {
    throw new Error("Menu component not found");
  }

  var _Menu = Menu({
    clientID: clientID
  }),
      renderTo = _Menu.renderTo,
      updateProps = _Menu.updateProps,
      show = _Menu.show,
      hide = _Menu.hide;

  var render = memoize(function () {
    return renderTo(window.xprops.getParent(), '#smart-menu');
  });

  var display = function display(_ref2) {
    var choices = _ref2.choices,
        verticalOffset = _ref2.verticalOffset,
        _onChoose = _ref2.onChoose;
    return render().then(function () {
      return updateProps({
        verticalOffset: verticalOffset,
        choices: choices,
        onChoose: function onChoose(_ref3) {
          var id = _ref3.id,
              win = _ref3.win;
          hide();
          return _onChoose({
            id: id,
            win: win
          });
        }
      });
    }).then(function () {
      return show();
    });
  };

  hide();
  render();
  return {
    display: display
  };
}
// CONCATENATED MODULE: ./src/button/menu.js









var MENU_CHOICE = {
  DELETE_VAULT: 'DELETE_VAULT',
  SELECT_FUNDING_SHIPPING: 'SELECT_FUNDING_SHIPPING',
  CHANGE_ACCOUNT: 'CHANGE_ACCOUNT'
};
var menu_popup = {
  width: CHECKOUT_POPUP_DIMENSIONS.WIDTH,
  height: CHECKOUT_POPUP_DIMENSIONS.HEIGHT
};
var smartMenu;
function renderButtonDropdown(_ref) {
  var props = _ref.props,
      payment = _ref.payment,
      content = _ref.content,
      initiatePayment = _ref.initiatePayment;
  var clientID = props.clientID,
      clientAccessToken = props.clientAccessToken,
      enableThreeDomainSecure = props.enableThreeDomainSecure,
      buttonSessionID = props.buttonSessionID,
      partnerAttributionID = props.partnerAttributionID;
  var button = payment.button,
      fundingSource = payment.fundingSource,
      paymentMethodID = payment.paymentMethodID;
  var menuToggle = button.querySelector("[" + DATA_ATTRIBUTES.MENU + "]");
  var buttonParent = button.parentElement;

  if (clientID && buttonParent && menuToggle && paymentMethodID && clientAccessToken) {
    smartMenu = smartMenu || renderSmartMenu({
      clientID: clientID
    });
    dom_onClick(menuToggle, function (event) {
      event.preventDefault();
      event.stopPropagation();
      var PAYPAL_CHOICES = [
      /*
      {
          id:    MENU_CHOICE.SELECT_FUNDING_SHIPPING,
          label: content.chooseCardOrShipping,
          popup
      },
      */
      {
        id: MENU_CHOICE.CHANGE_ACCOUNT,
        label: content.useDifferentAccount,
        popup: menu_popup
      }
      /* ,
      {
        id:    MENU_CHOICE.DELETE_VAULT,
        label: content.deleteVaultedAccount
      }
      */
      ];
      var CARD_CHOICES = [{
        id: MENU_CHOICE.DELETE_VAULT,
        label: content.deleteVaultedCard
      }];
      var choices = fundingSource === FUNDING.PAYPAL ? PAYPAL_CHOICES : CARD_CHOICES;
      var verticalOffset = button.getBoundingClientRect().bottom;
      var loadingTimeout = setTimeout(function () {
        return enableLoadingSpinner(button);
      }, 50);
      smartMenu.display({
        choices: choices,
        verticalOffset: verticalOffset,
        onChoose: function onChoose(_ref2) {
          var id = _ref2.id,
              win = _ref2.win;

          if (id === MENU_CHOICE.CHANGE_ACCOUNT) {
            return initiatePayment({
              payment: _extends({}, payment, {
                win: win
              })
            });
          } else if (id === MENU_CHOICE.DELETE_VAULT) {
            if (!clientAccessToken || !paymentMethodID) {
              throw new Error("Can not delete vault without client access token and payment method id");
            }

            enableLoadingSpinner(button);
            return deleteVault({
              paymentMethodID: paymentMethodID,
              clientAccessToken: clientAccessToken
            }).then(function () {
              disableLoadingSpinner(button);
              destroyElement(button);

              if (buttonParent.querySelectorAll("[" + DATA_ATTRIBUTES.PAYMENT_METHOD_ID + "]").length === 0) {
                var payInstantlyHeader = buttonParent.querySelector('.paypal-vault-header');

                if (payInstantlyHeader) {
                  destroyElement(payInstantlyHeader);
                }
              }
            });
          } else if (id === MENU_CHOICE.SELECT_FUNDING_SHIPPING) {
            if (!clientAccessToken || !paymentMethodID) {
              throw new Error("Can not change funding or shipping without client access token and payment method id");
            }

            var decorateCreateOrder = function decorateCreateOrder(createOrder) {
              return memoize(function () {
                return createOrder().then(function (orderID) {
                  return validatePaymentMethod({
                    clientAccessToken: clientAccessToken,
                    orderID: orderID,
                    paymentMethodID: paymentMethodID,
                    enableThreeDomainSecure: enableThreeDomainSecure,
                    buttonSessionID: buttonSessionID,
                    partnerAttributionID: partnerAttributionID
                  }).then(function (_ref3) {
                    var status = _ref3.status;

                    if (status !== 200) {
                      throw new Error("Validate payment failed with status: " + status);
                    }

                    return orderID;
                  });
                });
              });
            };

            return initiatePayment({
              payment: _extends({}, payment, {
                win: win,
                decorateCreateOrder: decorateCreateOrder
              })
            });
          }
        }
      }).then(function () {
        clearTimeout(loadingTimeout);
        disableLoadingSpinner(button);
      });
    });
  }
}
// CONCATENATED MODULE: ./src/button/button.js











function setupButton(opts) {
  if (!window.paypal) {
    throw new Error("PayPal SDK not loaded");
  }

  var facilitatorAccessToken = opts.facilitatorAccessToken,
      eligibility = opts.eligibility,
      fundingEligibility = opts.fundingEligibility,
      buyerGeoCountry = opts.buyerCountry,
      content = opts.content,
      sdkMeta = opts.sdkMeta,
      serverCSPNonce = opts.cspNonce,
      serverMerchantID = opts.merchantID,
      personalization = opts.personalization,
      isCardFieldsExperimentEnabled = opts.isCardFieldsExperimentEnabled,
      firebaseConfig = opts.firebaseConfig;
  var clientID = window.xprops.clientID;
  var serviceData = getServiceData({
    eligibility: eligibility,
    facilitatorAccessToken: facilitatorAccessToken,
    buyerGeoCountry: buyerGeoCountry,
    serverMerchantID: serverMerchantID,
    fundingEligibility: fundingEligibility,
    personalization: personalization,
    isCardFieldsExperimentEnabled: isCardFieldsExperimentEnabled,
    sdkMeta: sdkMeta
  });
  var merchantID = serviceData.merchantID;
  var props = getProps({
    facilitatorAccessToken: facilitatorAccessToken
  });
  var _props = props,
      env = _props.env,
      sessionID = _props.sessionID,
      partnerAttributionID = _props.partnerAttributionID,
      commit = _props.commit,
      correlationID = _props.correlationID,
      locale = _props.locale,
      buttonSessionID = _props.buttonSessionID,
      merchantDomain = _props.merchantDomain,
      onInit = _props.onInit,
      getPrerenderDetails = _props.getPrerenderDetails,
      rememberFunding = _props.rememberFunding,
      style = _props.style;
  var config = getConfig({
    serverCSPNonce: serverCSPNonce,
    firebaseConfig: firebaseConfig
  });
  var version = config.version;
  var components = getComponents();
  setupLogger({
    env: env,
    version: version,
    sessionID: sessionID,
    clientID: clientID,
    partnerAttributionID: partnerAttributionID,
    commit: commit,
    correlationID: correlationID,
    locale: locale,
    merchantID: merchantID,
    buttonSessionID: buttonSessionID,
    merchantDomain: merchantDomain
  });

  var _onInit = onInit(),
      initPromise = _onInit.initPromise,
      isEnabled = _onInit.isEnabled;

  var paymentProcessing = false;

  function initiatePayment(_ref) {
    var payment = _ref.payment;
    return promise_ZalgoPromise.try(function () {
      if (paymentProcessing) {
        return;
      }

      props = getProps({
        facilitatorAccessToken: facilitatorAccessToken
      });
      var win = payment.win,
          fundingSource = payment.fundingSource;
      var _props2 = props,
          onClick = _props2.onClick;

      if (onClick) {
        onClick({
          fundingSource: fundingSource
        });
      }

      if (isEnabled()) {
        paymentProcessing = true;
        return initiatePaymentFlow({
          payment: payment,
          config: config,
          serviceData: serviceData,
          components: components,
          props: props
        }).finally(function () {
          paymentProcessing = false;
        });
      } else {
        if (win) {
          win.close();
        }
      }
    }).catch(function (err) {
      var _getLogger$info$track;

      getLogger().info('smart_buttons_payment_error', {
        err: stringifyError(err)
      }).track((_getLogger$info$track = {}, _getLogger$info$track[FPTI_KEY.ERROR_CODE] = 'smart_buttons_payment_error', _getLogger$info$track[FPTI_KEY.ERROR_DESC] = stringifyErrorMessage(err), _getLogger$info$track));
      throw err;
    });
  }

  getButtons().forEach(function (button) {
    var _getSelectedFunding = getSelectedFunding(button),
        fundingSource = _getSelectedFunding.fundingSource,
        card = _getSelectedFunding.card,
        paymentMethodID = _getSelectedFunding.paymentMethodID;

    var payment = {
      button: button,
      fundingSource: fundingSource,
      card: card,
      paymentMethodID: paymentMethodID,
      isClick: true
    };
    fixClickFocus(button);
    renderButtonDropdown({
      props: props,
      payment: payment,
      content: content,
      initiatePayment: initiatePayment
    });
    dom_onClick(button, function (event) {
      event.preventDefault();
      event.stopPropagation();
      var payPromise = initiatePayment({
        payment: payment
      }); // $FlowFixMe

      button.payPromise = payPromise;
    });
  });
  var setupPrerenderTask = initPromise.then(function () {
    return promise_ZalgoPromise.hash({
      prerenderDetails: getPrerenderDetails(),
      initPromise: initPromise
    }).then(function (_ref2) {
      var prerenderDetails = _ref2.prerenderDetails;

      if (!prerenderDetails) {
        return;
      }

      var win = prerenderDetails.win,
          fundingSource = prerenderDetails.fundingSource,
          card = prerenderDetails.card;
      var button = document.querySelector("[" + DATA_ATTRIBUTES.FUNDING_SOURCE + "=" + fundingSource + "]");

      if (!button) {
        throw new Error("Can not find button element");
      }

      var payment = {
        win: win,
        button: button,
        fundingSource: fundingSource,
        card: card
      };
      var payPromise = initiatePayment({
        payment: payment
      }); // $FlowFixMe

      button.payPromise = payPromise;
    });
  });
  var setupRememberTask = setupRemember({
    rememberFunding: rememberFunding,
    fundingEligibility: fundingEligibility
  });
  var setupButtonLogsTask = setupButtonLogs({
    style: style
  });
  var setupPaymentFlowsTask = setupPaymentFlows({
    props: props,
    config: config,
    serviceData: serviceData,
    components: components
  });
  return promise_ZalgoPromise.hash({
    initPromise: initPromise,
    facilitatorAccessToken: facilitatorAccessToken,
    setupButtonLogsTask: setupButtonLogsTask,
    setupPrerenderTask: setupPrerenderTask,
    setupRememberTask: setupRememberTask,
    setupPaymentFlowsTask: setupPaymentFlowsTask
  }).then(src_util_noop);
}
// CONCATENATED MODULE: ./src/button/index.js
/* concated harmony reexport setupButton */__webpack_require__.d(__webpack_exports__, "setupButton", function() { return setupButton; });
/* concated harmony reexport TYPES */__webpack_require__.d(__webpack_exports__, "TYPES", function() { return props_types_TYPES; });
/* concated harmony reexport getProps */__webpack_require__.d(__webpack_exports__, "getProps", function() { return getProps; });
/* concated harmony reexport getComponents */__webpack_require__.d(__webpack_exports__, "getComponents", function() { return getComponents; });
/* concated harmony reexport getConfig */__webpack_require__.d(__webpack_exports__, "getConfig", function() { return getConfig; });
/* concated harmony reexport getServiceData */__webpack_require__.d(__webpack_exports__, "getServiceData", function() { return getServiceData; });
/* concated harmony reexport buildXCreateOrderData */__webpack_require__.d(__webpack_exports__, "buildXCreateOrderData", function() { return buildXCreateOrderData; });
/* concated harmony reexport buildOrderActions */__webpack_require__.d(__webpack_exports__, "buildOrderActions", function() { return buildOrderActions; });
/* concated harmony reexport buildPaymentActions */__webpack_require__.d(__webpack_exports__, "buildPaymentActions", function() { return buildPaymentActions; });
/* concated harmony reexport buildXCreateOrderActions */__webpack_require__.d(__webpack_exports__, "buildXCreateOrderActions", function() { return buildXCreateOrderActions; });
/* concated harmony reexport getCreateOrder */__webpack_require__.d(__webpack_exports__, "getCreateOrder", function() { return getCreateOrder; });
/* concated harmony reexport buildXCreateBillingAgreementData */__webpack_require__.d(__webpack_exports__, "buildXCreateBillingAgreementData", function() { return buildXCreateBillingAgreementData; });
/* concated harmony reexport buildXCreateBillingAgreementActions */__webpack_require__.d(__webpack_exports__, "buildXCreateBillingAgreementActions", function() { return buildXCreateBillingAgreementActions; });
/* concated harmony reexport getCreateBillingAgreement */__webpack_require__.d(__webpack_exports__, "getCreateBillingAgreement", function() { return getCreateBillingAgreement; });
/* concated harmony reexport buildXCreateSubscriptionData */__webpack_require__.d(__webpack_exports__, "buildXCreateSubscriptionData", function() { return buildXCreateSubscriptionData; });
/* concated harmony reexport buildXCreateSubscriptionActions */__webpack_require__.d(__webpack_exports__, "buildXCreateSubscriptionActions", function() { return buildXCreateSubscriptionActions; });
/* concated harmony reexport getCreateSubscription */__webpack_require__.d(__webpack_exports__, "getCreateSubscription", function() { return getCreateSubscription; });
/* concated harmony reexport getOnApprove */__webpack_require__.d(__webpack_exports__, "getOnApprove", function() { return getOnApprove; });
/* concated harmony reexport buildXOnInitData */__webpack_require__.d(__webpack_exports__, "buildXOnInitData", function() { return buildXOnInitData; });
/* concated harmony reexport buildXOnInitActions */__webpack_require__.d(__webpack_exports__, "buildXOnInitActions", function() { return buildXOnInitActions; });
/* concated harmony reexport getOnInit */__webpack_require__.d(__webpack_exports__, "getOnInit", function() { return getOnInit; });
/* concated harmony reexport buildXOnCancelData */__webpack_require__.d(__webpack_exports__, "buildXOnCancelData", function() { return buildXOnCancelData; });
/* concated harmony reexport buildXOnCancelActions */__webpack_require__.d(__webpack_exports__, "buildXOnCancelActions", function() { return buildXOnCancelActions; });
/* concated harmony reexport getOnCancel */__webpack_require__.d(__webpack_exports__, "getOnCancel", function() { return getOnCancel; });
/* concated harmony reexport buildXOnShippingChangeData */__webpack_require__.d(__webpack_exports__, "buildXOnShippingChangeData", function() { return buildXOnShippingChangeData; });
/* concated harmony reexport buildXShippingChangeActions */__webpack_require__.d(__webpack_exports__, "buildXShippingChangeActions", function() { return buildXShippingChangeActions; });
/* concated harmony reexport getOnShippingChange */__webpack_require__.d(__webpack_exports__, "getOnShippingChange", function() { return getOnShippingChange; });
/* concated harmony reexport CLICK_VALID */__webpack_require__.d(__webpack_exports__, "CLICK_VALID", function() { return CLICK_VALID; });
/* concated harmony reexport buildXOnClickData */__webpack_require__.d(__webpack_exports__, "buildXOnClickData", function() { return buildXOnClickData; });
/* concated harmony reexport buildXOnClickActions */__webpack_require__.d(__webpack_exports__, "buildXOnClickActions", function() { return buildXOnClickActions; });
/* concated harmony reexport getOnClick */__webpack_require__.d(__webpack_exports__, "getOnClick", function() { return getOnClick; });
/* concated harmony reexport getOnError */__webpack_require__.d(__webpack_exports__, "getOnError", function() { return getOnError; });
/* concated harmony reexport POPUP_BRIDGE_OPTYPE */__webpack_require__.d(__webpack_exports__, "POPUP_BRIDGE_OPTYPE", function() { return POPUP_BRIDGE_OPTYPE; });
/* concated harmony reexport getRememberFunding */__webpack_require__.d(__webpack_exports__, "getRememberFunding", function() { return getRememberFunding; });
/* concated harmony reexport getGetPageUrl */__webpack_require__.d(__webpack_exports__, "getGetPageUrl", function() { return getGetPageUrl; });



/***/ })
/******/ ]);
//# sourceMappingURL=smart-payment-buttons.js.map