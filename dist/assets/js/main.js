!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=5)}([function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){(function(t,n){/*! @vimeo/player v2.10.0 | (c) 2019 Vimeo | MIT License | https://github.com/vimeo/player.js */
e.exports=function(){"use strict";function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var o=void 0!==t&&"[object global]"==={}.toString.call(t);function r(e,t){return 0===e.indexOf(t.toLowerCase())?e:"".concat(t.toLowerCase()).concat(e.substr(0,1).toUpperCase()).concat(e.substr(1))}function i(e){return/^(https?:)?\/\/((player|www)\.)?vimeo\.com(?=$|\/)/.test(e)}function a(){var e,t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},n=t.id,o=t.url,r=n||o;if(!r)throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");if(e=r,!isNaN(parseFloat(e))&&isFinite(e)&&Math.floor(e)==e)return"https://vimeo.com/".concat(r);if(i(r))return r.replace("http:","https:");if(n)throw new TypeError("“".concat(n,"” is not a valid video id."));throw new TypeError("“".concat(r,"” is not a vimeo.com url."))}var s=void 0!==Array.prototype.indexOf,c="undefined"!=typeof window&&void 0!==window.postMessage;if(!(o||s&&c))throw new Error("Sorry, the Vimeo Player API is not available in this browser.");var u="undefined"!=typeof window?window:void 0!==t?t:"undefined"!=typeof self?self:{};!function(e){if(!e.WeakMap){var t=Object.prototype.hasOwnProperty,n=function(e,t,n){Object.defineProperty?Object.defineProperty(e,t,{configurable:!0,writable:!0,value:n}):e[t]=n};e.WeakMap=function(){function e(){if(void 0===this)throw new TypeError("Constructor WeakMap requires 'new'");if(n(this,"_id","_WeakMap_"+i()+"."+i()),0<arguments.length)throw new TypeError("WeakMap iterable is not supported")}function r(e,n){if(!o(e)||!t.call(e,"_id"))throw new TypeError(n+" method called on incompatible receiver "+typeof e)}function i(){return Math.random().toString().substring(2)}return n(e.prototype,"delete",(function(e){if(r(this,"delete"),!o(e))return!1;var t=e[this._id];return!(!t||t[0]!==e||(delete e[this._id],0))})),n(e.prototype,"get",(function(e){if(r(this,"get"),o(e)){var t=e[this._id];return t&&t[0]===e?t[1]:void 0}})),n(e.prototype,"has",(function(e){if(r(this,"has"),!o(e))return!1;var t=e[this._id];return!(!t||t[0]!==e)})),n(e.prototype,"set",(function(e,t){if(r(this,"set"),!o(e))throw new TypeError("Invalid value used as weak map key");var i=e[this._id];return i&&i[0]===e?i[1]=t:n(e,this._id,[e,t]),this})),n(e,"_polyfill",!0),e}()}function o(e){return Object(e)===e}}("undefined"!=typeof self?self:"undefined"!=typeof window?window:u);var l,d=(function(e){var t,o,r;r=function(){var e,t,o,r=Object.prototype.toString,i=void 0!==n?function(e){return n(e)}:setTimeout;try{Object.defineProperty({},"x",{}),e=function(e,t,n,o){return Object.defineProperty(e,t,{value:n,writable:!0,configurable:!1!==o})}}catch(r){e=function(e,t,n){return e[t]=n,e}}function a(e,n){o.add(e,n),t||(t=i(o.drain))}function s(e){var t,n=typeof e;return null==e||"object"!=n&&"function"!=n||(t=e.then),"function"==typeof t&&t}function c(){for(var e=0;e<this.chain.length;e++)u(this,1===this.state?this.chain[e].success:this.chain[e].failure,this.chain[e]);this.chain.length=0}function u(e,t,n){var o,r;try{!1===t?n.reject(e.msg):(o=!0===t?e.msg:t.call(void 0,e.msg))===n.promise?n.reject(TypeError("Promise-chain cycle")):(r=s(o))?r.call(o,n.resolve,n.reject):n.resolve(o)}catch(e){n.reject(e)}}function l(e){var t=this;t.triggered||(t.triggered=!0,t.def&&(t=t.def),t.msg=e,t.state=2,0<t.chain.length&&a(c,t))}function d(e,t,n,o){for(var r=0;r<t.length;r++)!function(r){e.resolve(t[r]).then((function(e){n(r,e)}),o)}(r)}function f(e){this.def=e,this.triggered=!1}function h(e){this.promise=e,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function v(e){if("function"!=typeof e)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var t=new h(this);this.then=function(e,n){var o={success:"function"!=typeof e||e,failure:"function"==typeof n&&n};return o.promise=new this.constructor((function(e,t){if("function"!=typeof e||"function"!=typeof t)throw TypeError("Not a function");o.resolve=e,o.reject=t})),t.chain.push(o),0!==t.state&&a(c,t),o.promise},this.catch=function(e){return this.then(void 0,e)};try{e.call(void 0,(function(e){(function e(t){var n,o=this;if(!o.triggered){o.triggered=!0,o.def&&(o=o.def);try{(n=s(t))?a((function(){var r=new f(o);try{n.call(t,(function(){e.apply(r,arguments)}),(function(){l.apply(r,arguments)}))}catch(e){l.call(r,e)}})):(o.msg=t,o.state=1,0<o.chain.length&&a(c,o))}catch(e){l.call(new f(o),e)}}}).call(t,e)}),(function(e){l.call(t,e)}))}catch(e){l.call(t,e)}}o=function(){var e,n,o;function r(e,t){this.fn=e,this.self=t,this.next=void 0}return{add:function(t,i){o=new r(t,i),n?n.next=o:e=o,n=o,o=void 0},drain:function(){var o=e;for(e=n=t=void 0;o;)o.fn.call(o.self),o=o.next}}}();var m=e({},"constructor",v,!1);return e(v.prototype=m,"__NPO__",0,!1),e(v,"resolve",(function(e){return e&&"object"==typeof e&&1===e.__NPO__?e:new this((function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");t(e)}))})),e(v,"reject",(function(e){return new this((function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");n(e)}))})),e(v,"all",(function(e){var t=this;return"[object Array]"!=r.call(e)?t.reject(TypeError("Not an array")):0===e.length?t.resolve([]):new t((function(n,o){if("function"!=typeof n||"function"!=typeof o)throw TypeError("Not a function");var r=e.length,i=Array(r),a=0;d(t,e,(function(e,t){i[e]=t,++a===r&&n(i)}),o)}))})),e(v,"race",(function(e){var t=this;return"[object Array]"!=r.call(e)?t.reject(TypeError("Not an array")):new t((function(n,o){if("function"!=typeof n||"function"!=typeof o)throw TypeError("Not a function");d(t,e,(function(e,t){n(t)}),o)}))})),v},(o=u)[t="Promise"]=o[t]||r(),e.exports&&(e.exports=o[t])}(l={exports:{}}),l.exports),f=new WeakMap;function h(e,t,n){var o=f.get(e.element)||{};t in o||(o[t]=[]),o[t].push(n),f.set(e.element,o)}function v(e,t){return(f.get(e.element)||{})[t]||[]}function m(e,t,n){var o=f.get(e.element)||{};if(!o[t])return!0;if(!n)return o[t]=[],f.set(e.element,o),!0;var r=o[t].indexOf(n);return-1!==r&&o[t].splice(r,1),f.set(e.element,o),o[t]&&0===o[t].length}var p=["autopause","autoplay","background","byline","color","controls","dnt","height","id","loop","maxheight","maxwidth","muted","playsinline","portrait","responsive","speed","texttrack","title","transparent","url","width"];function y(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};return p.reduce((function(t,n){var o=e.getAttribute("data-vimeo-".concat(n));return(o||""===o)&&(t[n]=""===o?1:o),t}),t)}function g(e,t){var n=e.html;if(!t)throw new TypeError("An element must be provided");if(null!==t.getAttribute("data-vimeo-initialized"))return t.querySelector("iframe");var o=document.createElement("div");return o.innerHTML=n,t.appendChild(o.firstChild),t.setAttribute("data-vimeo-initialized","true"),t.querySelector("iframe")}function w(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=2<arguments.length?arguments[2]:void 0;return new Promise((function(o,r){if(!i(e))throw new TypeError("“".concat(e,"” is not a vimeo.com url."));var a="https://vimeo.com/api/oembed.json?url=".concat(encodeURIComponent(e));for(var s in t)t.hasOwnProperty(s)&&(a+="&".concat(s,"=").concat(encodeURIComponent(t[s])));var c="XDomainRequest"in window?new XDomainRequest:new XMLHttpRequest;c.open("GET",a,!0),c.onload=function(){if(404!==c.status)if(403!==c.status)try{var t=JSON.parse(c.responseText);if(403===t.domain_status_code)return g(t,n),void r(new Error("“".concat(e,"” is not embeddable.")));o(t)}catch(t){r(t)}else r(new Error("“".concat(e,"” is not embeddable.")));else r(new Error("“".concat(e,"” was not found.")))},c.onerror=function(){var e=c.status?" (".concat(c.status,")"):"";r(new Error("There was an error fetching the embed code from Vimeo".concat(e,".")))},c.send()}))}function b(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){return console.warn(e),{}}return e}function T(e,t,n){if(e.element.contentWindow&&e.element.contentWindow.postMessage){var o={method:t};void 0!==n&&(o.value=n);var r=parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/,"$1"));8<=r&&r<10&&(o=JSON.stringify(o)),e.element.contentWindow.postMessage(o,e.origin)}}function _(e,t){var n,o=[];if((t=b(t)).event)"error"===t.event&&v(e,t.data.method).forEach((function(n){var o=new Error(t.data.message);o.name=t.data.name,n.reject(o),m(e,t.data.method,n)})),o=v(e,"event:".concat(t.event)),n=t.data;else if(t.method){var r=function(e,t){var n=v(e,t);if(n.length<1)return!1;var o=n.shift();return m(e,t,o),o}(e,t.method);r&&(o.push(r),n=t.value)}o.forEach((function(t){try{if("function"==typeof t)return void t.call(e,n);t.resolve(n)}catch(t){}}))}var E=new WeakMap,k=new WeakMap,P=function(){function t(e){var n,o=this,r=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),window.jQuery&&e instanceof jQuery&&(1<e.length&&window.console&&console.warn&&console.warn("A jQuery object with multiple elements was passed, using the first element."),e=e[0]),"undefined"!=typeof document&&"string"==typeof e&&(e=document.getElementById(e)),n=e,!Boolean(n&&1===n.nodeType&&"nodeName"in n&&n.ownerDocument&&n.ownerDocument.defaultView))throw new TypeError("You must pass either a valid element or a valid id.");var s=e.ownerDocument.defaultView;if("IFRAME"!==e.nodeName){var c=e.querySelector("iframe");c&&(e=c)}if("IFRAME"===e.nodeName&&!i(e.getAttribute("src")||""))throw new Error("The player element passed isn’t a Vimeo embed.");if(E.has(e))return E.get(e);this.element=e,this.origin="*";var u=new d((function(t,n){var c=function(e){if(i(e.origin)&&o.element.contentWindow===e.source){"*"===o.origin&&(o.origin=e.origin);var r=b(e.data);if(r&&"error"===r.event&&r.data&&"ready"===r.data.method){var a=new Error(r.data.message);return a.name=r.data.name,void n(a)}var s=r&&"ready"===r.event,c=r&&"ping"===r.method;if(s||c)return o.element.setAttribute("data-ready","true"),void t();_(o,r)}};if(s.addEventListener?s.addEventListener("message",c,!1):s.attachEvent&&s.attachEvent("onmessage",c),"IFRAME"!==o.element.nodeName){var u=y(e,r);w(a(u),u,e).then((function(t){var n,r,i,a=g(t,e);return o.element=a,o._originalElement=e,n=e,r=a,i=f.get(n),f.set(r,i),f.delete(n),E.set(o.element,o),t})).catch(n)}}));return k.set(this,u),E.set(this.element,this),"IFRAME"===this.element.nodeName&&T(this,"ping"),this}var n,o;return n=t,(o=[{key:"callMethod",value:function(e){var t=this,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};return new d((function(o,r){return t.ready().then((function(){h(t,e,{resolve:o,reject:r}),T(t,e,n)})).catch(r)}))}},{key:"get",value:function(e){var t=this;return new d((function(n,o){return e=r(e,"get"),t.ready().then((function(){h(t,e,{resolve:n,reject:o}),T(t,e)})).catch(o)}))}},{key:"set",value:function(e,t){var n=this;return new d((function(o,i){if(e=r(e,"set"),null==t)throw new TypeError("There must be a value to set.");return n.ready().then((function(){h(n,e,{resolve:o,reject:i}),T(n,e,t)})).catch(i)}))}},{key:"on",value:function(e,t){if(!e)throw new TypeError("You must pass an event name.");if(!t)throw new TypeError("You must pass a callback function.");if("function"!=typeof t)throw new TypeError("The callback must be a function.");0===v(this,"event:".concat(e)).length&&this.callMethod("addEventListener",e).catch((function(){})),h(this,"event:".concat(e),t)}},{key:"off",value:function(e,t){if(!e)throw new TypeError("You must pass an event name.");if(t&&"function"!=typeof t)throw new TypeError("The callback must be a function.");m(this,"event:".concat(e),t)&&this.callMethod("removeEventListener",e).catch((function(e){}))}},{key:"loadVideo",value:function(e){return this.callMethod("loadVideo",e)}},{key:"ready",value:function(){var e=k.get(this)||new d((function(e,t){t(new Error("Unknown player. Probably unloaded."))}));return d.resolve(e)}},{key:"addCuePoint",value:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};return this.callMethod("addCuePoint",{time:e,data:t})}},{key:"removeCuePoint",value:function(e){return this.callMethod("removeCuePoint",e)}},{key:"enableTextTrack",value:function(e,t){if(!e)throw new TypeError("You must pass a language.");return this.callMethod("enableTextTrack",{language:e,kind:t})}},{key:"disableTextTrack",value:function(){return this.callMethod("disableTextTrack")}},{key:"pause",value:function(){return this.callMethod("pause")}},{key:"play",value:function(){return this.callMethod("play")}},{key:"unload",value:function(){return this.callMethod("unload")}},{key:"destroy",value:function(){var e=this;return new d((function(t){k.delete(e),E.delete(e.element),e._originalElement&&(E.delete(e._originalElement),e._originalElement.removeAttribute("data-vimeo-initialized")),e.element&&"IFRAME"===e.element.nodeName&&e.element.parentNode&&e.element.parentNode.removeChild(e.element),t()}))}},{key:"getAutopause",value:function(){return this.get("autopause")}},{key:"setAutopause",value:function(e){return this.set("autopause",e)}},{key:"getBuffered",value:function(){return this.get("buffered")}},{key:"getColor",value:function(){return this.get("color")}},{key:"setColor",value:function(e){return this.set("color",e)}},{key:"getCuePoints",value:function(){return this.get("cuePoints")}},{key:"getCurrentTime",value:function(){return this.get("currentTime")}},{key:"setCurrentTime",value:function(e){return this.set("currentTime",e)}},{key:"getDuration",value:function(){return this.get("duration")}},{key:"getEnded",value:function(){return this.get("ended")}},{key:"getLoop",value:function(){return this.get("loop")}},{key:"setLoop",value:function(e){return this.set("loop",e)}},{key:"setMuted",value:function(e){return this.set("muted",e)}},{key:"getMuted",value:function(){return this.get("muted")}},{key:"getPaused",value:function(){return this.get("paused")}},{key:"getPlaybackRate",value:function(){return this.get("playbackRate")}},{key:"setPlaybackRate",value:function(e){return this.set("playbackRate",e)}},{key:"getPlayed",value:function(){return this.get("played")}},{key:"getSeekable",value:function(){return this.get("seekable")}},{key:"getSeeking",value:function(){return this.get("seeking")}},{key:"getTextTracks",value:function(){return this.get("textTracks")}},{key:"getVideoEmbedCode",value:function(){return this.get("videoEmbedCode")}},{key:"getVideoId",value:function(){return this.get("videoId")}},{key:"getVideoTitle",value:function(){return this.get("videoTitle")}},{key:"getVideoWidth",value:function(){return this.get("videoWidth")}},{key:"getVideoHeight",value:function(){return this.get("videoHeight")}},{key:"getVideoUrl",value:function(){return this.get("videoUrl")}},{key:"getVolume",value:function(){return this.get("volume")}},{key:"setVolume",value:function(e){return this.set("volume",e)}}])&&e(n.prototype,o),t}();return o||(function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:document,t=[].slice.call(e.querySelectorAll("[data-vimeo-id], [data-vimeo-url]")),n=function(e){"console"in window&&console.error&&console.error("There was an error creating an embed: ".concat(e))};t.forEach((function(e){try{if(null!==e.getAttribute("data-vimeo-defer"))return;var t=y(e);w(a(t),t,e).then((function(t){return g(t,e)})).catch(n)}catch(t){n(t)}}))}(),function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:document;if(!window.VimeoPlayerResizeEmbeds_){window.VimeoPlayerResizeEmbeds_=!0;var t=function(t){if(i(t.origin)&&t.data&&"spacechange"===t.data.event)for(var n=e.querySelectorAll("iframe"),o=0;o<n.length;o++)if(n[o].contentWindow===t.source){n[o].parentElement.style.paddingBottom="".concat(t.data.data[0].bottom,"px");break}};window.addEventListener?window.addEventListener("message",t,!1):window.attachEvent&&window.attachEvent("onmessage",t)}}()),P}()}).call(this,n(0),n(2).setImmediate)},function(e,t,n){(function(e){var o=void 0!==e&&e||"undefined"!=typeof self&&self||window,r=Function.prototype.apply;function i(e,t){this._id=e,this._clearFn=t}t.setTimeout=function(){return new i(r.call(setTimeout,o,arguments),clearTimeout)},t.setInterval=function(){return new i(r.call(setInterval,o,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},i.prototype.unref=i.prototype.ref=function(){},i.prototype.close=function(){this._clearFn.call(o,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout((function(){e._onTimeout&&e._onTimeout()}),t))},n(3),t.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==e&&e.clearImmediate||this&&this.clearImmediate}).call(this,n(0))},function(e,t,n){(function(e,t){!function(e,n){"use strict";if(!e.setImmediate){var o,r,i,a,s,c=1,u={},l=!1,d=e.document,f=Object.getPrototypeOf&&Object.getPrototypeOf(e);f=f&&f.setTimeout?f:e,"[object process]"==={}.toString.call(e.process)?o=function(e){t.nextTick((function(){v(e)}))}:!function(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}()?e.MessageChannel?((i=new MessageChannel).port1.onmessage=function(e){v(e.data)},o=function(e){i.port2.postMessage(e)}):d&&"onreadystatechange"in d.createElement("script")?(r=d.documentElement,o=function(e){var t=d.createElement("script");t.onreadystatechange=function(){v(e),t.onreadystatechange=null,r.removeChild(t),t=null},r.appendChild(t)}):o=function(e){setTimeout(v,0,e)}:(a="setImmediate$"+Math.random()+"$",s=function(t){t.source===e&&"string"==typeof t.data&&0===t.data.indexOf(a)&&v(+t.data.slice(a.length))},e.addEventListener?e.addEventListener("message",s,!1):e.attachEvent("onmessage",s),o=function(t){e.postMessage(a+t,"*")}),f.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var r={callback:e,args:t};return u[c]=r,o(c),c++},f.clearImmediate=h}function h(e){delete u[e]}function v(e){if(l)setTimeout(v,0,e);else{var t=u[e];if(t){l=!0;try{!function(e){var t=e.callback,o=e.args;switch(o.length){case 0:t();break;case 1:t(o[0]);break;case 2:t(o[0],o[1]);break;case 3:t(o[0],o[1],o[2]);break;default:t.apply(n,o)}}(t)}finally{h(e),l=!1}}}}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,n(0),n(4))},function(e,t){var n,o,r=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function s(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{o="function"==typeof clearTimeout?clearTimeout:a}catch(e){o=a}}();var c,u=[],l=!1,d=-1;function f(){l&&c&&(l=!1,c.length?u=c.concat(u):d=-1,u.length&&h())}function h(){if(!l){var e=s(f);l=!0;for(var t=u.length;t;){for(c=u,u=[];++d<t;)c&&c[d].run();d=-1,t=u.length}c=null,l=!1,function(e){if(o===clearTimeout)return clearTimeout(e);if((o===a||!o)&&clearTimeout)return o=clearTimeout,clearTimeout(e);try{o(e)}catch(t){try{return o.call(null,e)}catch(t){return o.call(this,e)}}}(e)}}function v(e,t){this.fun=e,this.array=t}function m(){}r.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new v(e,t)),1!==u.length||l||s(h)},v.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=m,r.addListener=m,r.once=m,r.off=m,r.removeListener=m,r.removeAllListeners=m,r.emit=m,r.prependListener=m,r.prependOnceListener=m,r.listeners=function(e){return[]},r.binding=function(e){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(e){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}},function(e,t,n){"use strict";n.r(t);var o={BREAKPOINT:640};function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var i=function(e,t){var n=this;this.TYPE="text",this.$ele=e,this.$content=this.$ele.querySelector(".screen--content"),this.duration=t,this.timerStep=50,this.progressStep=1/(this.duration/this.timerStep),this.timer=!1,this.progress=0,this.time=0,this.fadeThreshold=.3,this.isPlaying=!1,this.isActive=!1,this.deactivateTime=1500,this.deactivateTimer,this.$ele.addEventListener("wheel",(function(e){n.isActive&&window.innerWidth>o.BREAKPOINT&&(n.pauseAndAutoResume(500),n.progress+=e.deltaY/1e3,n.step(),n.time=n.progress*n.duration)}),{passive:!0}),this.activate=function(){clearTimeout(n.deactivateTimer),n.isActive=!0,n.play(),n.$ele.classList.add("active")},this.deactivate=function(){clearTimeout(n.deactivateTimer),n.isActive=!1,n.pause(),n.$ele.classList.remove("active"),n.deactivateTimer=setTimeout((function(){n.progress=0,n.time=0}),n.deactivateTime)},this._onComplete=function(){r("function"===n.onComplete)&&n.onComplete()},this._onProgress=function(){"function"==typeof n.onProgress&&n.onProgress()},this.pause=function(){n.isPlaying=!1,clearInterval(n.timer)},this.play=function(){clearInterval(n.timer),n.isPlaying=!0,n.timer=setInterval((function(){n.progress+=n.progressStep,n.time+=n.timerStep,n.step()}),n.timerStep)},this.pauseAndAutoResume=function(e){var t=e||500;n.isPlaying&&(n.pause(),clearInterval(n.restartTimer),n.restartTimer=setInterval((function(){n.play()}),t))},this.togglePlay=function(){n.isPlaying?n.pause():n.play()},this.step=function(){n.progress<0&&(n.progress=0),n.progress>=1&&(n.progress=1,clearInterval(n.timer),clearInterval(n.restartTimer),n._onComplete()),n._onProgress(),n.update()},this.update=function(){n.progress>n.fadeThreshold?n.$content.style.opacity=(1-n.fadeThreshold-(n.progress-n.fadeThreshold))*(1/(1-n.fadeThreshold)):n.$content.style.opacity=1}},a=n(1);function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var c=function(e){var t=this;this.TYPE="video",this.$ele=e,this.$content=this.$ele.querySelector(".screen--content"),this.$overlay=this.$ele.querySelector(".video-overlay"),this.duration=this.$content.dataset.video_length,this.progress=0,this.time=0,this.muted=!0,this.volume=1,this.scrollProgress=.5,this.isActive=!1,this.isPlaying=!1,this.vimeo=new a(this.$content,{id:this.$content.dataset.vimeo_id,width:window.innerWidth,autoplay:!1,controls:!1,autopause:!0}),this.vimeo.getDuration().then((function(e){return t.duration=1e3*e})),this.$content=this.$ele.querySelector(".screen--content"),this.$ele.addEventListener("wheel",(function(e){t.isActive&&window.innerWidth>o.BREAKPOINT&&(t.scrollProgress+=e.deltaY/1e3,t.scrollProgress>1&&(t.scrollProgress=1),t.scrollProgress<0&&(t.scrollProgress=0,t._onScrollUp()))}),{passive:!0}),this.isPreactivating=!1,this.preactivate=function(e){t.isPreactivating=!0,console.log("preactivate"),t.vimeo.play().then((function(){t.isPreactivating&&(console.log("preactivated"),t.vimeo.pause(),"function"==typeof e&&e())}))},this.activate=function(){t.isPreactivating=!1,t.volume=1,t.isActive=!0,t.play(),t.$ele.classList.add("active")},this.deactivate=function(){t.isActive=!1,t.pause(),t.progress=0,t.time=0,t.vimeo.setCurrentTime(1),t.$ele.classList.remove("active")},this._onComplete=function(){s("function"===t.onComplete)&&t.onComplete()},this._onScrollUp=function(){s("function"===t.onScrollUp)&&t.onScrollUp()},this._onProgress=function(){t.isPreactivating||"function"==typeof t.onProgress&&t.onProgress()},this.play=function(){console.log("video play"),t.isPreactivating=!1,t.isPlaying=!0,t.$content.classList.add("playing"),t.vimeo.play().then((function(){console.log("playback has begun")})),t.unmute()},this.pause=function(){console.log("video pause"),t.isPlaying=!1,t.$content.classList.remove("playing"),t.vimeo.pause()},this.togglePlay=function(){t.isPlaying?t.pause():t.play()},this.mute=function(){t.muted=!0,t.vimeo.setVolume(0)},this.unmute=function(){t.muted=!1,t.vimeo.setVolume(t.volume)},this.fadeIn=function(e,n){var o=e||100,r=n||function(){};clearInterval(t.fadeLoop);var i=(1-t.volume)/(o/10);t.fadeLoop=setInterval((function(){t.volume+=i,t.volume>=1&&(t.volume=1,r(),clearInterval(t.fadeLoop)),t.muted||t.vimeo.setVolume(t.volume)}),10)},this.fadeOut=function(e,n){var o=e||100,r=n||function(){};clearInterval(t.fadeLoop);var i=-t.volume/(o/10);t.fadeLoop=setInterval((function(){t.volume+=i,t.volume<=0&&(t.volume=0,r(),clearInterval(t.fadeLoop)),t.muted||t.vimeo.setVolume(t.volume)}),10)},this.vimeo.on("timeupdate",(function(e){t.time=1e3*e.seconds,t.progress=e.seconds/e.duration,t.duration=1e3*e.duration,t._onProgress(),e.seconds>=e.duration-2&&t._onComplete()})),this.$overlay.addEventListener("click",(function(){t.volume=1,t.unmute(),t.togglePlay()})),window.innerWidth<=o.BREAKPOINT&&this.preactivate((function(){t.vimeo.setCurrentTime(1)}))},u=function(e,t){var n=this;this.$ele=e,this.opts=Object.assign({textDuration:15e3},t),this.isActive=!1,this.text=new i(this.$ele.querySelector(".screen__text"),this.opts.textDuration),this.video=new c(this.$ele.querySelector(".screen__video")),this.progress=0,this.$progress=this.$ele.querySelector(".progress--indicator"),this.current=this.text,this.text.onComplete=function(){n.text.deactivate(),n.current=n.video,n.video.activate(),n._onChangeCurrent()},this.video.onComplete=function(){n.deactivate(),n.current=n.text,n._onComplete(),n._onChangeCurrent()},this.text.onProgress=function(){var e=n.text.duration+n.video.duration;n.progress=n.text.time/e,n.update()},this.video.onProgress=function(){var e=n.text.duration+n.video.duration,t=n.text.duration/e,o=n.video.time/e;n.progress=t+o,n.update()},this.activate=function(){n.current=n.text,n.$ele.classList.add("active"),n.text.activate(),n.video.preactivate((function(){n.video.deactivate()}))},this.deactivate=function(){n.$ele.classList.remove("active"),n.text.deactivate(),n.video.deactivate()},this._onComplete=function(){"function"==typeof n.onComplete&&n.onComplete()},this._onChangeCurrent=function(){"function"==typeof n.onChangeCurrent&&n.onChangeCurrent()},this.update=function(){n.$progress.style.width=100*n.progress+"%"}},l=function(e){var t=this;this.$ele=e,this.$credits=this.$ele.querySelector(".screen"),this.$credits_contents=this.$credits.querySelector(".screen--content"),this.$progress=this.$ele.querySelector(".progress--indicator"),this.progress=0,this.isAuto=!0,this.autoScrollStep=1,this.timer,this.current={type:"credits",togglePlay:function(){t.isAuto?t.stopAuto():t.setAuto()}},this.$credits.scrollTop=0,this.setAuto=function(){t.isAuto=!0,clearInterval(t.timer),t.timer=setInterval((function(){t.isAuto&&(t.$credits.scrollTop+=t.autoScrollStep)}),100)},this.stopAuto=function(){t.isAuto=!1,clearInterval(t.timer)},this.$credits.addEventListener("scroll",(function(e){t.progress=t.$credits.scrollTop/(t.$credits.scrollHeight-t.$credits.offsetHeight),t.update()})),this.activate=function(){t.$credits.scrollTop=0,t.setAuto(),t.$credits.classList.add("active"),t.$ele.classList.add("active")},this.deactivate=function(){t.stopAuto(),t.$credits.classList.remove("active"),t.$ele.classList.remove("active")},this.update=function(){t.$progress.style.width=100*t.progress+"%"},this.update()};var d,f=function(){h.forEach((function(e){e.querySelector("a").classList.remove("current")})),h[v].querySelector("a").classList.add("current")},h=document.querySelector(".progress").querySelectorAll(".progress--stage"),v=-1,m=[14e3,16e3,17e3],p=(d=document.querySelectorAll(".stage__excerpt"),function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(d)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(d)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()).map((function(e,t){return new u(e,{textDuration:m[t]})}));p.push(new l(document.querySelector(".stage__credits"))),p.forEach((function(e,t){e.onComplete=function(){void 0!==p[t+1]&&(p[t].deactivate(),p[t+1].activate(),v=t+1,f())},e.onChangeCurrent=function(){b()}})),h.forEach((function(e,t){e.querySelector("a").addEventListener("click",(function(e){e.preventDefault(),document.body.classList.remove("state__landing"),p.forEach((function(e){e.deactivate()})),v=t,p[t].activate(),b(),f()}))})),document.addEventListener("keyup",(function(e){32===e.which&&p[v].current.togglePlay()}));var y,g=document.querySelector(".control__fullscreen"),w=g.querySelector(".control--label");document.addEventListener("fullscreenchange",(function(e){document.fullscreenElement?(document.body.classList.add("state__fullscreen"),g.classList.add("state__fullscreen-active"),w.innerText="exit fullscreen"):(document.body.classList.remove("state__fullscreen"),g.classList.remove("state__fullscreen-active"),w.innerText="fullscreen")})),g.addEventListener("click",(function(){document.fullscreenElement?document.exitFullscreen():document.querySelector(".site-wrap").requestFullscreen({navigationUI:"hide"}).catch((function(e){console.log("Could not enter fullscreen")}))}));var b=function(){clearTimeout(y),document.body.classList.remove("state__hide-controls"),document.querySelector(".progress--bar").classList.remove("state__hidden"),document.querySelector(".control__fullscreen").classList.remove("state__hidden"),document.querySelectorAll(".progress--indicator").forEach((function(e){return e.classList.remove("state__hidden")})),v>=0&&"video"===p[v].current.TYPE&&(clearTimeout(y),y=setTimeout((function(){document.body.classList.add("state__hide-controls"),document.querySelector(".progress--bar").classList.add("state__hidden"),document.querySelector(".control__fullscreen").classList.add("state__hidden"),document.querySelectorAll(".progress--indicator").forEach((function(e){return e.classList.add("state__hidden")}))}),3e3))};document.addEventListener("wheel",(function(){b()})),document.addEventListener("mousemove",(function(){b()}))}]);
//# sourceMappingURL=main.js.map