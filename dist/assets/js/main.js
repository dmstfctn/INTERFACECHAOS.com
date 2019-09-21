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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*! @vimeo/player v2.10.0 | (c) 2019 Vimeo | MIT License | https://github.com/vimeo/player.js */
!function(e,t){ true?module.exports=t():undefined}(this,function(){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var e="undefined"!=typeof global&&"[object global]"==={}.toString.call(global);function i(e,t){return 0===e.indexOf(t.toLowerCase())?e:"".concat(t.toLowerCase()).concat(e.substr(0,1).toUpperCase()).concat(e.substr(1))}function s(e){return/^(https?:)?\/\/((player|www)\.)?vimeo\.com(?=$|\/)/.test(e)}function l(){var e,t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},n=t.id,r=t.url,o=n||r;if(!o)throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");if(e=o,!isNaN(parseFloat(e))&&isFinite(e)&&Math.floor(e)==e)return"https://vimeo.com/".concat(o);if(s(o))return o.replace("http:","https:");if(n)throw new TypeError("“".concat(n,"” is not a valid video id."));throw new TypeError("“".concat(o,"” is not a vimeo.com url."))}var t=void 0!==Array.prototype.indexOf,n="undefined"!=typeof window&&void 0!==window.postMessage;if(!(e||t&&n))throw new Error("Sorry, the Vimeo Player API is not available in this browser.");var o="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};!function(e){if(!e.WeakMap){var n=Object.prototype.hasOwnProperty,o=function(e,t,n){Object.defineProperty?Object.defineProperty(e,t,{configurable:!0,writable:!0,value:n}):e[t]=n};e.WeakMap=function(){function e(){if(void 0===this)throw new TypeError("Constructor WeakMap requires 'new'");if(o(this,"_id","_WeakMap"+"_"+t()+"."+t()),0<arguments.length)throw new TypeError("WeakMap iterable is not supported")}function r(e,t){if(!i(e)||!n.call(e,"_id"))throw new TypeError(t+" method called on incompatible receiver "+typeof e)}function t(){return Math.random().toString().substring(2)}return o(e.prototype,"delete",function(e){if(r(this,"delete"),!i(e))return!1;var t=e[this._id];return!(!t||t[0]!==e)&&(delete e[this._id],!0)}),o(e.prototype,"get",function(e){if(r(this,"get"),i(e)){var t=e[this._id];return t&&t[0]===e?t[1]:void 0}}),o(e.prototype,"has",function(e){if(r(this,"has"),!i(e))return!1;var t=e[this._id];return!(!t||t[0]!==e)}),o(e.prototype,"set",function(e,t){if(r(this,"set"),!i(e))throw new TypeError("Invalid value used as weak map key");var n=e[this._id];return n&&n[0]===e?n[1]=t:o(e,this._id,[e,t]),this}),o(e,"_polyfill",!0),e}()}function i(e){return Object(e)===e}}("undefined"!=typeof self?self:"undefined"!=typeof window?window:o);var a,f=(function(e){var t,n,r;r=function(){var t,a,n,e=Object.prototype.toString,r="undefined"!=typeof setImmediate?function(e){return setImmediate(e)}:setTimeout;try{Object.defineProperty({},"x",{}),t=function(e,t,n,r){return Object.defineProperty(e,t,{value:n,writable:!0,configurable:!1!==r})}}catch(e){t=function(e,t,n){return e[t]=n,e}}function i(e,t){n.add(e,t),a||(a=r(n.drain))}function u(e){var t,n=typeof e;return null==e||"object"!=n&&"function"!=n||(t=e.then),"function"==typeof t&&t}function c(){for(var e=0;e<this.chain.length;e++)o(this,1===this.state?this.chain[e].success:this.chain[e].failure,this.chain[e]);this.chain.length=0}function o(e,t,n){var r,o;try{!1===t?n.reject(e.msg):(r=!0===t?e.msg:t.call(void 0,e.msg))===n.promise?n.reject(TypeError("Promise-chain cycle")):(o=u(r))?o.call(r,n.resolve,n.reject):n.resolve(r)}catch(e){n.reject(e)}}function s(e){var t=this;t.triggered||(t.triggered=!0,t.def&&(t=t.def),t.msg=e,t.state=2,0<t.chain.length&&i(c,t))}function l(e,n,r,o){for(var t=0;t<n.length;t++)!function(t){e.resolve(n[t]).then(function(e){r(t,e)},o)}(t)}function f(e){this.def=e,this.triggered=!1}function d(e){this.promise=e,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function h(e){if("function"!=typeof e)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var r=new d(this);this.then=function(e,t){var n={success:"function"!=typeof e||e,failure:"function"==typeof t&&t};return n.promise=new this.constructor(function(e,t){if("function"!=typeof e||"function"!=typeof t)throw TypeError("Not a function");n.resolve=e,n.reject=t}),r.chain.push(n),0!==r.state&&i(c,r),n.promise},this.catch=function(e){return this.then(void 0,e)};try{e.call(void 0,function(e){(function e(n){var r,o=this;if(!o.triggered){o.triggered=!0,o.def&&(o=o.def);try{(r=u(n))?i(function(){var t=new f(o);try{r.call(n,function(){e.apply(t,arguments)},function(){s.apply(t,arguments)})}catch(e){s.call(t,e)}}):(o.msg=n,o.state=1,0<o.chain.length&&i(c,o))}catch(e){s.call(new f(o),e)}}}).call(r,e)},function(e){s.call(r,e)})}catch(e){s.call(r,e)}}n=function(){var n,r,o;function i(e,t){this.fn=e,this.self=t,this.next=void 0}return{add:function(e,t){o=new i(e,t),r?r.next=o:n=o,r=o,o=void 0},drain:function(){var e=n;for(n=r=a=void 0;e;)e.fn.call(e.self),e=e.next}}}();var v=t({},"constructor",h,!1);return t(h.prototype=v,"__NPO__",0,!1),t(h,"resolve",function(n){return n&&"object"==typeof n&&1===n.__NPO__?n:new this(function(e,t){if("function"!=typeof e||"function"!=typeof t)throw TypeError("Not a function");e(n)})}),t(h,"reject",function(n){return new this(function(e,t){if("function"!=typeof e||"function"!=typeof t)throw TypeError("Not a function");t(n)})}),t(h,"all",function(t){var a=this;return"[object Array]"!=e.call(t)?a.reject(TypeError("Not an array")):0===t.length?a.resolve([]):new a(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");var r=t.length,o=Array(r),i=0;l(a,t,function(e,t){o[e]=t,++i===r&&n(o)},e)})}),t(h,"race",function(t){var r=this;return"[object Array]"!=e.call(t)?r.reject(TypeError("Not an array")):new r(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");l(r,t,function(e,t){n(t)},e)})}),h},(n=o)[t="Promise"]=n[t]||r(),e.exports&&(e.exports=n[t])}(a={exports:{}},a.exports),a.exports),d=new WeakMap;function u(e,t,n){var r=d.get(e.element)||{};t in r||(r[t]=[]),r[t].push(n),d.set(e.element,r)}function c(e,t){return(d.get(e.element)||{})[t]||[]}function h(e,t,n){var r=d.get(e.element)||{};if(!r[t])return!0;if(!n)return r[t]=[],d.set(e.element,r),!0;var o=r[t].indexOf(n);return-1!==o&&r[t].splice(o,1),d.set(e.element,r),r[t]&&0===r[t].length}var v=["autopause","autoplay","background","byline","color","controls","dnt","height","id","loop","maxheight","maxwidth","muted","playsinline","portrait","responsive","speed","texttrack","title","transparent","url","width"];function p(r){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};return v.reduce(function(e,t){var n=r.getAttribute("data-vimeo-".concat(t));return(n||""===n)&&(e[t]=""===n?1:n),e},e)}function y(e,t){var n=e.html;if(!t)throw new TypeError("An element must be provided");if(null!==t.getAttribute("data-vimeo-initialized"))return t.querySelector("iframe");var r=document.createElement("div");return r.innerHTML=n,t.appendChild(r.firstChild),t.setAttribute("data-vimeo-initialized","true"),t.querySelector("iframe")}function m(i){var a=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},u=2<arguments.length?arguments[2]:void 0;return new Promise(function(t,n){if(!s(i))throw new TypeError("“".concat(i,"” is not a vimeo.com url."));var e="https://vimeo.com/api/oembed.json?url=".concat(encodeURIComponent(i));for(var r in a)a.hasOwnProperty(r)&&(e+="&".concat(r,"=").concat(encodeURIComponent(a[r])));var o="XDomainRequest"in window?new XDomainRequest:new XMLHttpRequest;o.open("GET",e,!0),o.onload=function(){if(404!==o.status)if(403!==o.status)try{var e=JSON.parse(o.responseText);if(403===e.domain_status_code)return y(e,u),void n(new Error("“".concat(i,"” is not embeddable.")));t(e)}catch(e){n(e)}else n(new Error("“".concat(i,"” is not embeddable.")));else n(new Error("“".concat(i,"” was not found.")))},o.onerror=function(){var e=o.status?" (".concat(o.status,")"):"";n(new Error("There was an error fetching the embed code from Vimeo".concat(e,".")))},o.send()})}function g(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){return console.warn(e),{}}return e}function w(e,t,n){if(e.element.contentWindow&&e.element.contentWindow.postMessage){var r={method:t};void 0!==n&&(r.value=n);var o=parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/,"$1"));8<=o&&o<10&&(r=JSON.stringify(r)),e.element.contentWindow.postMessage(r,e.origin)}}function b(n,r){var t,e=[];if((r=g(r)).event){if("error"===r.event)c(n,r.data.method).forEach(function(e){var t=new Error(r.data.message);t.name=r.data.name,e.reject(t),h(n,r.data.method,e)});e=c(n,"event:".concat(r.event)),t=r.data}else if(r.method){var o=function(e,t){var n=c(e,t);if(n.length<1)return!1;var r=n.shift();return h(e,t,r),r}(n,r.method);o&&(e.push(o),t=r.value)}e.forEach(function(e){try{if("function"==typeof e)return void e.call(n,t);e.resolve(t)}catch(e){}})}var k=new WeakMap,E=new WeakMap,Player=function(){function Player(u){var e,c=this,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Player),window.jQuery&&u instanceof jQuery&&(1<u.length&&window.console&&console.warn&&console.warn("A jQuery object with multiple elements was passed, using the first element."),u=u[0]),"undefined"!=typeof document&&"string"==typeof u&&(u=document.getElementById(u)),e=u,!Boolean(e&&1===e.nodeType&&"nodeName"in e&&e.ownerDocument&&e.ownerDocument.defaultView))throw new TypeError("You must pass either a valid element or a valid id.");var r=u.ownerDocument.defaultView;if("IFRAME"!==u.nodeName){var t=u.querySelector("iframe");t&&(u=t)}if("IFRAME"===u.nodeName&&!s(u.getAttribute("src")||""))throw new Error("The player element passed isn’t a Vimeo embed.");if(k.has(u))return k.get(u);this.element=u,this.origin="*";var o=new f(function(i,a){var e=function(e){if(s(e.origin)&&c.element.contentWindow===e.source){"*"===c.origin&&(c.origin=e.origin);var t=g(e.data);if(t&&"error"===t.event&&t.data&&"ready"===t.data.method){var n=new Error(t.data.message);return n.name=t.data.name,void a(n)}var r=t&&"ready"===t.event,o=t&&"ping"===t.method;if(r||o)return c.element.setAttribute("data-ready","true"),void i();b(c,t)}};if(r.addEventListener?r.addEventListener("message",e,!1):r.attachEvent&&r.attachEvent("onmessage",e),"IFRAME"!==c.element.nodeName){var t=p(u,n);m(l(t),t,u).then(function(e){var t,n,r,o=y(e,u);return c.element=o,c._originalElement=u,t=u,n=o,r=d.get(t),d.set(n,r),d.delete(t),k.set(c.element,c),e}).catch(a)}});return E.set(this,o),k.set(this.element,this),"IFRAME"===this.element.nodeName&&w(this,"ping"),this}var e,t,n;return e=Player,(t=[{key:"callMethod",value:function(n){var r=this,o=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};return new f(function(e,t){return r.ready().then(function(){u(r,n,{resolve:e,reject:t}),w(r,n,o)}).catch(t)})}},{key:"get",value:function(n){var r=this;return new f(function(e,t){return n=i(n,"get"),r.ready().then(function(){u(r,n,{resolve:e,reject:t}),w(r,n)}).catch(t)})}},{key:"set",value:function(n,r){var o=this;return new f(function(e,t){if(n=i(n,"set"),null==r)throw new TypeError("There must be a value to set.");return o.ready().then(function(){u(o,n,{resolve:e,reject:t}),w(o,n,r)}).catch(t)})}},{key:"on",value:function(e,t){if(!e)throw new TypeError("You must pass an event name.");if(!t)throw new TypeError("You must pass a callback function.");if("function"!=typeof t)throw new TypeError("The callback must be a function.");0===c(this,"event:".concat(e)).length&&this.callMethod("addEventListener",e).catch(function(){}),u(this,"event:".concat(e),t)}},{key:"off",value:function(e,t){if(!e)throw new TypeError("You must pass an event name.");if(t&&"function"!=typeof t)throw new TypeError("The callback must be a function.");h(this,"event:".concat(e),t)&&this.callMethod("removeEventListener",e).catch(function(e){})}},{key:"loadVideo",value:function(e){return this.callMethod("loadVideo",e)}},{key:"ready",value:function(){var e=E.get(this)||new f(function(e,t){t(new Error("Unknown player. Probably unloaded."))});return f.resolve(e)}},{key:"addCuePoint",value:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};return this.callMethod("addCuePoint",{time:e,data:t})}},{key:"removeCuePoint",value:function(e){return this.callMethod("removeCuePoint",e)}},{key:"enableTextTrack",value:function(e,t){if(!e)throw new TypeError("You must pass a language.");return this.callMethod("enableTextTrack",{language:e,kind:t})}},{key:"disableTextTrack",value:function(){return this.callMethod("disableTextTrack")}},{key:"pause",value:function(){return this.callMethod("pause")}},{key:"play",value:function(){return this.callMethod("play")}},{key:"unload",value:function(){return this.callMethod("unload")}},{key:"destroy",value:function(){var t=this;return new f(function(e){E.delete(t),k.delete(t.element),t._originalElement&&(k.delete(t._originalElement),t._originalElement.removeAttribute("data-vimeo-initialized")),t.element&&"IFRAME"===t.element.nodeName&&t.element.parentNode&&t.element.parentNode.removeChild(t.element),e()})}},{key:"getAutopause",value:function(){return this.get("autopause")}},{key:"setAutopause",value:function(e){return this.set("autopause",e)}},{key:"getBuffered",value:function(){return this.get("buffered")}},{key:"getColor",value:function(){return this.get("color")}},{key:"setColor",value:function(e){return this.set("color",e)}},{key:"getCuePoints",value:function(){return this.get("cuePoints")}},{key:"getCurrentTime",value:function(){return this.get("currentTime")}},{key:"setCurrentTime",value:function(e){return this.set("currentTime",e)}},{key:"getDuration",value:function(){return this.get("duration")}},{key:"getEnded",value:function(){return this.get("ended")}},{key:"getLoop",value:function(){return this.get("loop")}},{key:"setLoop",value:function(e){return this.set("loop",e)}},{key:"setMuted",value:function(e){return this.set("muted",e)}},{key:"getMuted",value:function(){return this.get("muted")}},{key:"getPaused",value:function(){return this.get("paused")}},{key:"getPlaybackRate",value:function(){return this.get("playbackRate")}},{key:"setPlaybackRate",value:function(e){return this.set("playbackRate",e)}},{key:"getPlayed",value:function(){return this.get("played")}},{key:"getSeekable",value:function(){return this.get("seekable")}},{key:"getSeeking",value:function(){return this.get("seeking")}},{key:"getTextTracks",value:function(){return this.get("textTracks")}},{key:"getVideoEmbedCode",value:function(){return this.get("videoEmbedCode")}},{key:"getVideoId",value:function(){return this.get("videoId")}},{key:"getVideoTitle",value:function(){return this.get("videoTitle")}},{key:"getVideoWidth",value:function(){return this.get("videoWidth")}},{key:"getVideoHeight",value:function(){return this.get("videoHeight")}},{key:"getVideoUrl",value:function(){return this.get("videoUrl")}},{key:"getVolume",value:function(){return this.get("volume")}},{key:"setVolume",value:function(e){return this.set("volume",e)}}])&&r(e.prototype,t),n&&r(e,n),Player}();return e||(function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:document,t=[].slice.call(e.querySelectorAll("[data-vimeo-id], [data-vimeo-url]")),n=function(e){"console"in window&&console.error&&console.error("There was an error creating an embed: ".concat(e))};t.forEach(function(t){try{if(null!==t.getAttribute("data-vimeo-defer"))return;var e=p(t);m(l(e),e,t).then(function(e){return y(e,t)}).catch(n)}catch(e){n(e)}})}(),function(){var r=0<arguments.length&&void 0!==arguments[0]?arguments[0]:document;if(!window.VimeoPlayerResizeEmbeds_){window.VimeoPlayerResizeEmbeds_=!0;var e=function(e){if(s(e.origin)&&e.data&&"spacechange"===e.data.event)for(var t=r.querySelectorAll("iframe"),n=0;n<t.length;n++)if(t[n].contentWindow===e.source){t[n].parentElement.style.paddingBottom="".concat(e.data.data[0].bottom,"px");break}};window.addEventListener?window.addEventListener("message",e,!1):window.attachEvent&&window.attachEvent("onmessage",e)}}()),Player});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0), __webpack_require__(2).setImmediate))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(3);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(0), __webpack_require__(4)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/modules/CONFIG.js
var CONFIG = {
  BREAKPOINT: 640
};
/* harmony default export */ var modules_CONFIG = (CONFIG);
// CONCATENATED MODULE: ./src/modules/Text.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



var Text_Text = function Text(_$ele, _duration) {
  var _this = this;

  this.TYPE = 'text';
  this.$ele = _$ele;
  this.$content = this.$ele.querySelector('.screen--content');
  this.duration = _duration;
  this.timerStep = 50;
  this.progressStep = 1 / (this.duration / this.timerStep);
  this.timer = false;
  this.progress = 0;
  this.time = 0;
  this.fadeThreshold = 0.4;
  this.isPlaying = false;
  this.isActive = false;
  this.deactivateTime = 1500;
  this.deactivateTimer;
  this.$ele.addEventListener('wheel', function (e) {
    if (_this.isActive && window.innerWidth > modules_CONFIG.BREAKPOINT) {
      _this.pauseAndAutoResume(500);

      _this.progress += e.deltaY / 1000;

      _this.step();

      _this.time = _this.progress * _this.duration;
    }
  }, {
    passive: true
  });

  this.activate = function () {
    _this.isActive = true;

    _this.play();

    _this.$ele.classList.add('active');
  };

  this.deactivate = function () {
    clearTimeout(_this.deactivateTimer);
    _this.isActive = false;

    _this.pause();

    _this.$ele.classList.remove('active');

    setTimeout(function () {
      _this.progress = 0;
      _this.time = 0;
    }, _this.deactivateTime);
  };

  this._onComplete = function () {
    if (_typeof(_this.onComplete === 'function')) {
      _this.onComplete();
    }
  };

  this._onProgress = function () {
    if (typeof _this.onProgress === 'function') {
      _this.onProgress();
    }
  };

  this.pause = function () {
    _this.isPlaying = false;
    clearInterval(_this.timer);
  };

  this.play = function () {
    clearInterval(_this.timer);
    _this.isPlaying = true;
    _this.timer = setInterval(function () {
      _this.progress += _this.progressStep;
      _this.time += _this.timerStep;

      _this.step();
    }, _this.timerStep);
  };

  this.pauseAndAutoResume = function (_delay) {
    var delay = _delay || 500;

    if (_this.isPlaying) {
      _this.pause();

      clearInterval(_this.restartTimer);
      _this.restartTimer = setInterval(function () {
        _this.play();
      }, delay);
    }
  };

  this.togglePlay = function () {
    if (_this.isPlaying) {
      _this.pause();
    } else {
      _this.play();
    }
  };

  this.step = function () {
    if (_this.progress < 0) {
      _this.progress = 0;
    }

    if (_this.progress >= 1) {
      _this.progress = 1;
      clearInterval(_this.timer);
      clearInterval(_this.restartTimer);

      _this._onComplete();
    }

    _this._onProgress();

    _this.update();
  };

  this.update = function () {
    if (_this.progress > _this.fadeThreshold) {
      _this.$content.style.opacity = (1 - _this.fadeThreshold - (_this.progress - _this.fadeThreshold)) * (1 / (1 - _this.fadeThreshold));
    } else {
      _this.$content.style.opacity = 1;
    }
  };
};

/* harmony default export */ var modules_Text = (Text_Text);
// EXTERNAL MODULE: ./node_modules/@vimeo/player/dist/player.min.js
var player_min = __webpack_require__(1);

// CONCATENATED MODULE: ./src/modules/Video.js
function Video_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Video_typeof = function _typeof(obj) { return typeof obj; }; } else { Video_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Video_typeof(obj); }




var Video_Video = function Video(_$ele) {
  var _this = this;

  this.TYPE = 'video';
  this.$ele = _$ele;
  this.$content = this.$ele.querySelector('.screen--content');
  this.$overlay = this.$ele.querySelector('.video-overlay');
  this.duration = this.$content.dataset.video_length;
  this.progress = 0;
  this.time = 0;
  this.muted = true;
  this.volume = 1;
  this.scrollProgress = 0.5;
  this.isActive = false;
  this.isPlaying = false;
  this.vimeo = new player_min(this.$content, {
    id: this.$content.dataset.vimeo_id,
    width: window.innerWidth,
    autoplay: false,
    controls: false,
    autopause: true
  });
  this.vimeo.getDuration().then(function (duration) {
    return _this.duration = duration * 1000;
  });
  this.$content = this.$ele.querySelector('.screen--content');
  this.$ele.addEventListener('wheel', function (e) {
    if (_this.isActive && window.innerWidth > modules_CONFIG.BREAKPOINT) {
      _this.scrollProgress += e.deltaY / 1000;

      if (_this.scrollProgress > 1) {
        _this.scrollProgress = 1;
      }

      if (_this.scrollProgress < 0) {
        _this.scrollProgress = 0;

        _this._onScrollUp();
      }
    }
  }, {
    passive: true
  });
  this.isPreactivating = false;

  this.preactivate = function (_callback) {
    _this.isPreactivating = true;
    console.log('preactivate');

    _this.vimeo.play().then(function () {
      if (_this.isPreactivating) {
        console.log('preactivated');

        _this.vimeo.pause();

        if (typeof _callback === 'function') {
          _callback();
        }

        ;
      }
    });
  };

  this.activate = function () {
    _this.isPreactivating = false;
    _this.volume = 1;
    _this.isActive = true;

    _this.play();

    _this.$ele.classList.add('active');
  };

  this.deactivate = function () {
    _this.isActive = false;

    _this.pause();

    _this.progress = 0;
    _this.time = 0;

    _this.vimeo.setCurrentTime(1);

    _this.$ele.classList.remove('active');
  };

  this._onComplete = function () {
    if (Video_typeof(_this.onComplete === 'function')) {
      _this.onComplete();
    }
  };

  this._onScrollUp = function () {
    if (Video_typeof(_this.onScrollUp === 'function')) {
      _this.onScrollUp();
    }
  };

  this._onProgress = function () {
    if (typeof _this.onProgress === 'function') {
      _this.onProgress();
    }
  };

  this.play = function () {
    console.log('video play');
    _this.isPreactivating = false;
    _this.isPlaying = true;

    _this.$content.classList.add('playing');

    _this.vimeo.play();

    _this.unmute();
  };

  this.pause = function () {
    console.log('video pause');
    _this.isPlaying = false;

    _this.$content.classList.remove('playing');

    _this.vimeo.pause();
  };

  this.togglePlay = function () {
    if (_this.isPlaying) {
      _this.pause();
    } else {
      _this.play();
    }
  };

  this.mute = function () {
    _this.muted = true;

    _this.vimeo.setVolume(0);
  };

  this.unmute = function () {
    _this.muted = false;

    _this.vimeo.setVolume(_this.volume);
  };

  this.fadeIn = function (_time, _callback) {
    var time = _time || 100;

    var callback = _callback || function () {};

    clearInterval(_this.fadeLoop);
    var change = 1 - _this.volume;
    var step = change / (time / 10);
    _this.fadeLoop = setInterval(function () {
      _this.volume += step;

      if (_this.volume >= 1) {
        _this.volume = 1;
        callback();
        clearInterval(_this.fadeLoop);
      }

      if (!_this.muted) {
        _this.vimeo.setVolume(_this.volume);
      }
    }, 10);
  };

  this.fadeOut = function (_time, _callback) {
    var time = _time || 100;

    var callback = _callback || function () {};

    clearInterval(_this.fadeLoop);
    var change = -_this.volume;
    var step = change / (time / 10);
    _this.fadeLoop = setInterval(function () {
      _this.volume += step;

      if (_this.volume <= 0) {
        _this.volume = 0;
        callback();
        clearInterval(_this.fadeLoop);
      }

      if (!_this.muted) {
        _this.vimeo.setVolume(_this.volume);
      }
    }, 10);
  };

  this.vimeo.on('timeupdate', function (t) {
    _this.time = t.seconds * 1000;
    _this.progress = t.seconds / t.duration;
    _this.duration = t.duration * 1000;

    _this._onProgress();

    if (t.seconds >= t.duration - 2) {
      _this._onComplete();
    }
  });
  this.$overlay.addEventListener('click', function () {
    _this.volume = 1;

    _this.unmute();

    _this.togglePlay();
  });
};

/* harmony default export */ var modules_Video = (Video_Video);
// CONCATENATED MODULE: ./src/modules/Stage.js



var Stage_Stage = function Stage(_$ele, _opts) {
  var _this = this;

  this.$ele = _$ele;
  this.opts = Object.assign({
    textDuration: 15000
  }, _opts);
  this.isActive = false;
  this.text = new modules_Text(this.$ele.querySelector('.screen__text'), this.opts.textDuration);
  this.video = new modules_Video(this.$ele.querySelector('.screen__video'));
  this.progress = 0;
  this.$progress = this.$ele.querySelector('.progress--indicator');
  this.current = this.text;

  this.text.onComplete = function () {
    _this.text.deactivate();

    _this.current = _this.video;

    _this.video.activate();

    _this._onChangeCurrent();
  };

  this.video.onComplete = function () {
    _this.deactivate();

    _this.current = _this.text;

    _this._onComplete();

    _this._onChangeCurrent();
  };

  this.video.onScrollUp = function () {
    _this.video.deactivate();

    _this.video.fadeOut(1500, function () {
      _this.current = _this.text;

      _this.text.activate();

      _this._onChangeCurrent();
    });
  };

  this.text.onProgress = function () {
    var length = _this.text.duration + _this.video.duration;
    _this.progress = _this.text.time / length;

    _this.update();
  };

  this.video.onProgress = function () {
    var length = _this.text.duration + _this.video.duration;
    var textProp = _this.text.duration / length;
    var videoProp = _this.video.time / length;
    _this.progress = textProp + videoProp;

    _this.update();
  };

  this.activate = function () {
    _this.current = _this.text;

    _this.$ele.classList.add('active');

    _this.text.activate();

    _this.video.preactivate(function () {
      _this.video.deactivate();
    });
  };

  this.deactivate = function () {
    _this.$ele.classList.remove('active');

    _this.text.deactivate();

    _this.video.deactivate();
  };

  this._onComplete = function () {
    if (typeof _this.onComplete === 'function') {
      _this.onComplete();
    }
  };

  this._onChangeCurrent = function () {
    if (typeof _this.onChangeCurrent === 'function') {
      _this.onChangeCurrent();
    }
  };

  this.update = function () {
    _this.$progress.style.width = _this.progress * 100 + '%';
  };
};

/* harmony default export */ var modules_Stage = (Stage_Stage);
// CONCATENATED MODULE: ./src/modules/CreditsStage.js
var CreditsStage = function CreditsStage(_$ele) {
  var _this = this;

  this.$ele = _$ele;
  this.$credits = this.$ele.querySelector('.screen');
  this.$credits_contents = this.$credits.querySelector('.screen--content');
  this.$progress = this.$ele.querySelector('.progress--indicator');
  this.progress = 0;
  this.isAuto = true;
  this.autoScrollStep = 1;
  this.timer;
  this.current = {
    type: 'credits'
  };
  this.$credits.scrollTop = 0;

  this.setAuto = function () {
    _this.isAuto = true;
    clearInterval(_this.timer);
    _this.timer = setInterval(function () {
      if (_this.isAuto) {
        _this.$credits.scrollTop += _this.autoScrollStep;
      }
    }, 100);
  };

  this.stopAuto = function () {
    _this.isAuto = false;
    clearInterval(_this.timer);
  };

  this.$credits.addEventListener('scroll', function (e) {
    _this.progress = _this.$credits.scrollTop / (_this.$credits.scrollHeight - _this.$credits.offsetHeight);

    _this.update();
  });

  this.activate = function () {
    _this.$credits.scrollTop = 0;

    _this.setAuto();

    _this.$credits.classList.add('active');

    _this.$ele.classList.add('active');
  };

  this.deactivate = function () {
    _this.stopAuto();

    _this.$credits.classList.remove('active');

    _this.$ele.classList.remove('active');
  };

  this.update = function () {
    _this.$progress.style.width = _this.progress * 100 + '%';
  };

  this.update();
};

/* harmony default export */ var modules_CreditsStage = (CreditsStage);
// CONCATENATED MODULE: ./src/main.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }




var navSetActive = function navSetActive() {
  $stage_titles.forEach(function ($title) {
    $title.querySelector('a').classList.remove('current');
  });
  $stage_titles[currentStageIndex].querySelector('a').classList.add('current');
};

var $progress = document.querySelector('.progress');
var $stage_titles = $progress.querySelectorAll('.progress--stage');
var currentStageIndex = -1;
var textDurations = [14000, 15000, 15000];

var stages = _toConsumableArray(document.querySelectorAll('.stage__excerpt')).map(function (s, i) {
  return new modules_Stage(s, {
    textDuration: textDurations[i]
  });
});

stages.push(new modules_CreditsStage(document.querySelector('.stage__credits')));
stages.forEach(function (stage, index) {
  stage.onComplete = function () {
    if (typeof stages[index + 1] !== 'undefined') {
      stages[index].deactivate();
      stages[index + 1].activate();
      currentStageIndex = index + 1;
      navSetActive();
    }
  };

  stage.onChangeCurrent = function () {
    showHideControls();
  };
});
$stage_titles.forEach(function ($title, index) {
  $title.querySelector('a').addEventListener('click', function (e) {
    e.preventDefault();
    document.body.classList.remove('state__landing');
    stages.forEach(function (stage) {
      stage.deactivate();
    });
    currentStageIndex = index;
    stages[index].activate();
    showHideControls();
    navSetActive();
  });
});
document.addEventListener('keyup', function (e) {
  if (e.which === 32) {
    stages[currentStageIndex].current.togglePlay();
  }
});
var $fullscreen_btn = document.querySelector('.control__fullscreen');
var $fullscreen_label = $fullscreen_btn.querySelector('.control--label');
document.addEventListener('fullscreenchange', function (event) {
  if (document.fullscreenElement) {
    document.body.classList.add('state__fullscreen');
    $fullscreen_btn.classList.add('state__fullscreen-active');
    $fullscreen_label.innerText = 'exit fullscreen';
  } else {
    document.body.classList.remove('state__fullscreen');
    $fullscreen_btn.classList.remove('state__fullscreen-active');
    $fullscreen_label.innerText = 'fullscreen';
  }
});
$fullscreen_btn.addEventListener('click', function () {
  if (!document.fullscreenElement) {
    document.querySelector('.site-wrap').requestFullscreen({
      navigationUI: "hide"
    })["catch"](function (err) {
      console.log('Could not enter fullscreen');
    });
  } else {
    document.exitFullscreen();
  }
});
var controlTimeout;
var controlsHidden = false;

var hideControls = function hideControls() {
  clearTimeout(controlTimeout);
  controlTimeout = setTimeout(function () {
    document.body.classList.add('state__hide-controls');
    document.querySelector('.progress--bar').classList.add('state__hidden');
    document.querySelector('.control__fullscreen').classList.add('state__hidden');
    document.querySelectorAll('.progress--indicator').forEach(function (indicator) {
      return indicator.classList.add('state__hidden');
    });
  }, 3000);
};

var showControls = function showControls() {
  clearTimeout(controlTimeout);
  document.body.classList.remove('state__hide-controls');
  document.querySelector('.progress--bar').classList.remove('state__hidden');
  document.querySelector('.control__fullscreen').classList.remove('state__hidden');
  document.querySelectorAll('.progress--indicator').forEach(function (indicator) {
    return indicator.classList.remove('state__hidden');
  });
};

var showHideControls = function showHideControls() {
  showControls();

  if (currentStageIndex >= 0) {
    if (stages[currentStageIndex].current.TYPE === 'video') {
      hideControls();
    }
  }
};

document.addEventListener('wheel', function () {
  showHideControls();
});
document.addEventListener('mousemove', function () {
  showHideControls();
});

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map