!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=5)}([function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){(function(t,n){/*! @vimeo/player v2.10.0 | (c) 2019 Vimeo | MIT License | https://github.com/vimeo/player.js */
e.exports=function(){"use strict";function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var i=void 0!==t&&"[object global]"==={}.toString.call(t);function r(e,t){return 0===e.indexOf(t.toLowerCase())?e:"".concat(t.toLowerCase()).concat(e.substr(0,1).toUpperCase()).concat(e.substr(1))}function o(e){return/^(https?:)?\/\/((player|www)\.)?vimeo\.com(?=$|\/)/.test(e)}function s(){var e,t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},n=t.id,i=t.url,r=n||i;if(!r)throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");if(e=r,!isNaN(parseFloat(e))&&isFinite(e)&&Math.floor(e)==e)return"https://vimeo.com/".concat(r);if(o(r))return r.replace("http:","https:");if(n)throw new TypeError("“".concat(n,"” is not a valid video id."));throw new TypeError("“".concat(r,"” is not a vimeo.com url."))}var a=void 0!==Array.prototype.indexOf,c="undefined"!=typeof window&&void 0!==window.postMessage;if(!(i||a&&c))throw new Error("Sorry, the Vimeo Player API is not available in this browser.");var u="undefined"!=typeof window?window:void 0!==t?t:"undefined"!=typeof self?self:{};!function(e){if(!e.WeakMap){var t=Object.prototype.hasOwnProperty,n=function(e,t,n){Object.defineProperty?Object.defineProperty(e,t,{configurable:!0,writable:!0,value:n}):e[t]=n};e.WeakMap=function(){function e(){if(void 0===this)throw new TypeError("Constructor WeakMap requires 'new'");if(n(this,"_id","_WeakMap_"+o()+"."+o()),0<arguments.length)throw new TypeError("WeakMap iterable is not supported")}function r(e,n){if(!i(e)||!t.call(e,"_id"))throw new TypeError(n+" method called on incompatible receiver "+typeof e)}function o(){return Math.random().toString().substring(2)}return n(e.prototype,"delete",(function(e){if(r(this,"delete"),!i(e))return!1;var t=e[this._id];return!(!t||t[0]!==e||(delete e[this._id],0))})),n(e.prototype,"get",(function(e){if(r(this,"get"),i(e)){var t=e[this._id];return t&&t[0]===e?t[1]:void 0}})),n(e.prototype,"has",(function(e){if(r(this,"has"),!i(e))return!1;var t=e[this._id];return!(!t||t[0]!==e)})),n(e.prototype,"set",(function(e,t){if(r(this,"set"),!i(e))throw new TypeError("Invalid value used as weak map key");var o=e[this._id];return o&&o[0]===e?o[1]=t:n(e,this._id,[e,t]),this})),n(e,"_polyfill",!0),e}()}function i(e){return Object(e)===e}}("undefined"!=typeof self?self:"undefined"!=typeof window?window:u);var l,h=(function(e){var t,i,r;r=function(){var e,t,i,r=Object.prototype.toString,o=void 0!==n?function(e){return n(e)}:setTimeout;try{Object.defineProperty({},"x",{}),e=function(e,t,n,i){return Object.defineProperty(e,t,{value:n,writable:!0,configurable:!1!==i})}}catch(r){e=function(e,t,n){return e[t]=n,e}}function s(e,n){i.add(e,n),t||(t=o(i.drain))}function a(e){var t,n=typeof e;return null==e||"object"!=n&&"function"!=n||(t=e.then),"function"==typeof t&&t}function c(){for(var e=0;e<this.chain.length;e++)u(this,1===this.state?this.chain[e].success:this.chain[e].failure,this.chain[e]);this.chain.length=0}function u(e,t,n){var i,r;try{!1===t?n.reject(e.msg):(i=!0===t?e.msg:t.call(void 0,e.msg))===n.promise?n.reject(TypeError("Promise-chain cycle")):(r=a(i))?r.call(i,n.resolve,n.reject):n.resolve(i)}catch(e){n.reject(e)}}function l(e){var t=this;t.triggered||(t.triggered=!0,t.def&&(t=t.def),t.msg=e,t.state=2,0<t.chain.length&&s(c,t))}function h(e,t,n,i){for(var r=0;r<t.length;r++)!function(r){e.resolve(t[r]).then((function(e){n(r,e)}),i)}(r)}function d(e){this.def=e,this.triggered=!1}function f(e){this.promise=e,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function v(e){if("function"!=typeof e)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var t=new f(this);this.then=function(e,n){var i={success:"function"!=typeof e||e,failure:"function"==typeof n&&n};return i.promise=new this.constructor((function(e,t){if("function"!=typeof e||"function"!=typeof t)throw TypeError("Not a function");i.resolve=e,i.reject=t})),t.chain.push(i),0!==t.state&&s(c,t),i.promise},this.catch=function(e){return this.then(void 0,e)};try{e.call(void 0,(function(e){(function e(t){var n,i=this;if(!i.triggered){i.triggered=!0,i.def&&(i=i.def);try{(n=a(t))?s((function(){var r=new d(i);try{n.call(t,(function(){e.apply(r,arguments)}),(function(){l.apply(r,arguments)}))}catch(e){l.call(r,e)}})):(i.msg=t,i.state=1,0<i.chain.length&&s(c,i))}catch(e){l.call(new d(i),e)}}}).call(t,e)}),(function(e){l.call(t,e)}))}catch(e){l.call(t,e)}}i=function(){var e,n,i;function r(e,t){this.fn=e,this.self=t,this.next=void 0}return{add:function(t,o){i=new r(t,o),n?n.next=i:e=i,n=i,i=void 0},drain:function(){var i=e;for(e=n=t=void 0;i;)i.fn.call(i.self),i=i.next}}}();var m=e({},"constructor",v,!1);return e(v.prototype=m,"__NPO__",0,!1),e(v,"resolve",(function(e){return e&&"object"==typeof e&&1===e.__NPO__?e:new this((function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");t(e)}))})),e(v,"reject",(function(e){return new this((function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");n(e)}))})),e(v,"all",(function(e){var t=this;return"[object Array]"!=r.call(e)?t.reject(TypeError("Not an array")):0===e.length?t.resolve([]):new t((function(n,i){if("function"!=typeof n||"function"!=typeof i)throw TypeError("Not a function");var r=e.length,o=Array(r),s=0;h(t,e,(function(e,t){o[e]=t,++s===r&&n(o)}),i)}))})),e(v,"race",(function(e){var t=this;return"[object Array]"!=r.call(e)?t.reject(TypeError("Not an array")):new t((function(n,i){if("function"!=typeof n||"function"!=typeof i)throw TypeError("Not a function");h(t,e,(function(e,t){n(t)}),i)}))})),v},(i=u)[t="Promise"]=i[t]||r(),e.exports&&(e.exports=i[t])}(l={exports:{}}),l.exports),d=new WeakMap;function f(e,t,n){var i=d.get(e.element)||{};t in i||(i[t]=[]),i[t].push(n),d.set(e.element,i)}function v(e,t){return(d.get(e.element)||{})[t]||[]}function m(e,t,n){var i=d.get(e.element)||{};if(!i[t])return!0;if(!n)return i[t]=[],d.set(e.element,i),!0;var r=i[t].indexOf(n);return-1!==r&&i[t].splice(r,1),d.set(e.element,i),i[t]&&0===i[t].length}var p=["autopause","autoplay","background","byline","color","controls","dnt","height","id","loop","maxheight","maxwidth","muted","playsinline","portrait","responsive","speed","texttrack","title","transparent","url","width"];function g(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};return p.reduce((function(t,n){var i=e.getAttribute("data-vimeo-".concat(n));return(i||""===i)&&(t[n]=""===i?1:i),t}),t)}function y(e,t){var n=e.html;if(!t)throw new TypeError("An element must be provided");if(null!==t.getAttribute("data-vimeo-initialized"))return t.querySelector("iframe");var i=document.createElement("div");return i.innerHTML=n,t.appendChild(i.firstChild),t.setAttribute("data-vimeo-initialized","true"),t.querySelector("iframe")}function w(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=2<arguments.length?arguments[2]:void 0;return new Promise((function(i,r){if(!o(e))throw new TypeError("“".concat(e,"” is not a vimeo.com url."));var s="https://vimeo.com/api/oembed.json?url=".concat(encodeURIComponent(e));for(var a in t)t.hasOwnProperty(a)&&(s+="&".concat(a,"=").concat(encodeURIComponent(t[a])));var c="XDomainRequest"in window?new XDomainRequest:new XMLHttpRequest;c.open("GET",s,!0),c.onload=function(){if(404!==c.status)if(403!==c.status)try{var t=JSON.parse(c.responseText);if(403===t.domain_status_code)return y(t,n),void r(new Error("“".concat(e,"” is not embeddable.")));i(t)}catch(t){r(t)}else r(new Error("“".concat(e,"” is not embeddable.")));else r(new Error("“".concat(e,"” was not found.")))},c.onerror=function(){var e=c.status?" (".concat(c.status,")"):"";r(new Error("There was an error fetching the embed code from Vimeo".concat(e,".")))},c.send()}))}function T(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){return console.warn(e),{}}return e}function b(e,t,n){if(e.element.contentWindow&&e.element.contentWindow.postMessage){var i={method:t};void 0!==n&&(i.value=n);var r=parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/,"$1"));8<=r&&r<10&&(i=JSON.stringify(i)),e.element.contentWindow.postMessage(i,e.origin)}}function _(e,t){var n,i=[];if((t=T(t)).event)"error"===t.event&&v(e,t.data.method).forEach((function(n){var i=new Error(t.data.message);i.name=t.data.name,n.reject(i),m(e,t.data.method,n)})),i=v(e,"event:".concat(t.event)),n=t.data;else if(t.method){var r=function(e,t){var n=v(e,t);if(n.length<1)return!1;var i=n.shift();return m(e,t,i),i}(e,t.method);r&&(i.push(r),n=t.value)}i.forEach((function(t){try{if("function"==typeof t)return void t.call(e,n);t.resolve(n)}catch(t){}}))}var S=new WeakMap,E=new WeakMap,P=function(){function t(e){var n,i=this,r=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),window.jQuery&&e instanceof jQuery&&(1<e.length&&window.console&&console.warn&&console.warn("A jQuery object with multiple elements was passed, using the first element."),e=e[0]),"undefined"!=typeof document&&"string"==typeof e&&(e=document.getElementById(e)),n=e,!Boolean(n&&1===n.nodeType&&"nodeName"in n&&n.ownerDocument&&n.ownerDocument.defaultView))throw new TypeError("You must pass either a valid element or a valid id.");var a=e.ownerDocument.defaultView;if("IFRAME"!==e.nodeName){var c=e.querySelector("iframe");c&&(e=c)}if("IFRAME"===e.nodeName&&!o(e.getAttribute("src")||""))throw new Error("The player element passed isn’t a Vimeo embed.");if(S.has(e))return S.get(e);this.element=e,this.origin="*";var u=new h((function(t,n){var c=function(e){if(o(e.origin)&&i.element.contentWindow===e.source){"*"===i.origin&&(i.origin=e.origin);var r=T(e.data);if(r&&"error"===r.event&&r.data&&"ready"===r.data.method){var s=new Error(r.data.message);return s.name=r.data.name,void n(s)}var a=r&&"ready"===r.event,c=r&&"ping"===r.method;if(a||c)return i.element.setAttribute("data-ready","true"),void t();_(i,r)}};if(a.addEventListener?a.addEventListener("message",c,!1):a.attachEvent&&a.attachEvent("onmessage",c),"IFRAME"!==i.element.nodeName){var u=g(e,r);w(s(u),u,e).then((function(t){var n,r,o,s=y(t,e);return i.element=s,i._originalElement=e,n=e,r=s,o=d.get(n),d.set(r,o),d.delete(n),S.set(i.element,i),t})).catch(n)}}));return E.set(this,u),S.set(this.element,this),"IFRAME"===this.element.nodeName&&b(this,"ping"),this}var n,i;return n=t,(i=[{key:"callMethod",value:function(e){var t=this,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};return new h((function(i,r){return t.ready().then((function(){f(t,e,{resolve:i,reject:r}),b(t,e,n)})).catch(r)}))}},{key:"get",value:function(e){var t=this;return new h((function(n,i){return e=r(e,"get"),t.ready().then((function(){f(t,e,{resolve:n,reject:i}),b(t,e)})).catch(i)}))}},{key:"set",value:function(e,t){var n=this;return new h((function(i,o){if(e=r(e,"set"),null==t)throw new TypeError("There must be a value to set.");return n.ready().then((function(){f(n,e,{resolve:i,reject:o}),b(n,e,t)})).catch(o)}))}},{key:"on",value:function(e,t){if(!e)throw new TypeError("You must pass an event name.");if(!t)throw new TypeError("You must pass a callback function.");if("function"!=typeof t)throw new TypeError("The callback must be a function.");0===v(this,"event:".concat(e)).length&&this.callMethod("addEventListener",e).catch((function(){})),f(this,"event:".concat(e),t)}},{key:"off",value:function(e,t){if(!e)throw new TypeError("You must pass an event name.");if(t&&"function"!=typeof t)throw new TypeError("The callback must be a function.");m(this,"event:".concat(e),t)&&this.callMethod("removeEventListener",e).catch((function(e){}))}},{key:"loadVideo",value:function(e){return this.callMethod("loadVideo",e)}},{key:"ready",value:function(){var e=E.get(this)||new h((function(e,t){t(new Error("Unknown player. Probably unloaded."))}));return h.resolve(e)}},{key:"addCuePoint",value:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};return this.callMethod("addCuePoint",{time:e,data:t})}},{key:"removeCuePoint",value:function(e){return this.callMethod("removeCuePoint",e)}},{key:"enableTextTrack",value:function(e,t){if(!e)throw new TypeError("You must pass a language.");return this.callMethod("enableTextTrack",{language:e,kind:t})}},{key:"disableTextTrack",value:function(){return this.callMethod("disableTextTrack")}},{key:"pause",value:function(){return this.callMethod("pause")}},{key:"play",value:function(){return this.callMethod("play")}},{key:"unload",value:function(){return this.callMethod("unload")}},{key:"destroy",value:function(){var e=this;return new h((function(t){E.delete(e),S.delete(e.element),e._originalElement&&(S.delete(e._originalElement),e._originalElement.removeAttribute("data-vimeo-initialized")),e.element&&"IFRAME"===e.element.nodeName&&e.element.parentNode&&e.element.parentNode.removeChild(e.element),t()}))}},{key:"getAutopause",value:function(){return this.get("autopause")}},{key:"setAutopause",value:function(e){return this.set("autopause",e)}},{key:"getBuffered",value:function(){return this.get("buffered")}},{key:"getColor",value:function(){return this.get("color")}},{key:"setColor",value:function(e){return this.set("color",e)}},{key:"getCuePoints",value:function(){return this.get("cuePoints")}},{key:"getCurrentTime",value:function(){return this.get("currentTime")}},{key:"setCurrentTime",value:function(e){return this.set("currentTime",e)}},{key:"getDuration",value:function(){return this.get("duration")}},{key:"getEnded",value:function(){return this.get("ended")}},{key:"getLoop",value:function(){return this.get("loop")}},{key:"setLoop",value:function(e){return this.set("loop",e)}},{key:"setMuted",value:function(e){return this.set("muted",e)}},{key:"getMuted",value:function(){return this.get("muted")}},{key:"getPaused",value:function(){return this.get("paused")}},{key:"getPlaybackRate",value:function(){return this.get("playbackRate")}},{key:"setPlaybackRate",value:function(e){return this.set("playbackRate",e)}},{key:"getPlayed",value:function(){return this.get("played")}},{key:"getSeekable",value:function(){return this.get("seekable")}},{key:"getSeeking",value:function(){return this.get("seeking")}},{key:"getTextTracks",value:function(){return this.get("textTracks")}},{key:"getVideoEmbedCode",value:function(){return this.get("videoEmbedCode")}},{key:"getVideoId",value:function(){return this.get("videoId")}},{key:"getVideoTitle",value:function(){return this.get("videoTitle")}},{key:"getVideoWidth",value:function(){return this.get("videoWidth")}},{key:"getVideoHeight",value:function(){return this.get("videoHeight")}},{key:"getVideoUrl",value:function(){return this.get("videoUrl")}},{key:"getVolume",value:function(){return this.get("volume")}},{key:"setVolume",value:function(e){return this.set("volume",e)}}])&&e(n.prototype,i),t}();return i||(function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:document,t=[].slice.call(e.querySelectorAll("[data-vimeo-id], [data-vimeo-url]")),n=function(e){"console"in window&&console.error&&console.error("There was an error creating an embed: ".concat(e))};t.forEach((function(e){try{if(null!==e.getAttribute("data-vimeo-defer"))return;var t=g(e);w(s(t),t,e).then((function(t){return y(t,e)})).catch(n)}catch(t){n(t)}}))}(),function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:document;if(!window.VimeoPlayerResizeEmbeds_){window.VimeoPlayerResizeEmbeds_=!0;var t=function(t){if(o(t.origin)&&t.data&&"spacechange"===t.data.event)for(var n=e.querySelectorAll("iframe"),i=0;i<n.length;i++)if(n[i].contentWindow===t.source){n[i].parentElement.style.paddingBottom="".concat(t.data.data[0].bottom,"px");break}};window.addEventListener?window.addEventListener("message",t,!1):window.attachEvent&&window.attachEvent("onmessage",t)}}()),P}()}).call(this,n(0),n(2).setImmediate)},function(e,t,n){(function(e){var i=void 0!==e&&e||"undefined"!=typeof self&&self||window,r=Function.prototype.apply;function o(e,t){this._id=e,this._clearFn=t}t.setTimeout=function(){return new o(r.call(setTimeout,i,arguments),clearTimeout)},t.setInterval=function(){return new o(r.call(setInterval,i,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},o.prototype.unref=o.prototype.ref=function(){},o.prototype.close=function(){this._clearFn.call(i,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout((function(){e._onTimeout&&e._onTimeout()}),t))},n(3),t.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==e&&e.clearImmediate||this&&this.clearImmediate}).call(this,n(0))},function(e,t,n){(function(e,t){!function(e,n){"use strict";if(!e.setImmediate){var i,r,o,s,a,c=1,u={},l=!1,h=e.document,d=Object.getPrototypeOf&&Object.getPrototypeOf(e);d=d&&d.setTimeout?d:e,"[object process]"==={}.toString.call(e.process)?i=function(e){t.nextTick((function(){v(e)}))}:!function(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}()?e.MessageChannel?((o=new MessageChannel).port1.onmessage=function(e){v(e.data)},i=function(e){o.port2.postMessage(e)}):h&&"onreadystatechange"in h.createElement("script")?(r=h.documentElement,i=function(e){var t=h.createElement("script");t.onreadystatechange=function(){v(e),t.onreadystatechange=null,r.removeChild(t),t=null},r.appendChild(t)}):i=function(e){setTimeout(v,0,e)}:(s="setImmediate$"+Math.random()+"$",a=function(t){t.source===e&&"string"==typeof t.data&&0===t.data.indexOf(s)&&v(+t.data.slice(s.length))},e.addEventListener?e.addEventListener("message",a,!1):e.attachEvent("onmessage",a),i=function(t){e.postMessage(s+t,"*")}),d.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var r={callback:e,args:t};return u[c]=r,i(c),c++},d.clearImmediate=f}function f(e){delete u[e]}function v(e){if(l)setTimeout(v,0,e);else{var t=u[e];if(t){l=!0;try{!function(e){var t=e.callback,i=e.args;switch(i.length){case 0:t();break;case 1:t(i[0]);break;case 2:t(i[0],i[1]);break;case 3:t(i[0],i[1],i[2]);break;default:t.apply(n,i)}}(t)}finally{f(e),l=!1}}}}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,n(0),n(4))},function(e,t){var n,i,r=e.exports={};function o(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(e){if(n===setTimeout)return setTimeout(e,0);if((n===o||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:o}catch(e){n=o}try{i="function"==typeof clearTimeout?clearTimeout:s}catch(e){i=s}}();var c,u=[],l=!1,h=-1;function d(){l&&c&&(l=!1,c.length?u=c.concat(u):h=-1,u.length&&f())}function f(){if(!l){var e=a(d);l=!0;for(var t=u.length;t;){for(c=u,u=[];++h<t;)c&&c[h].run();h=-1,t=u.length}c=null,l=!1,function(e){if(i===clearTimeout)return clearTimeout(e);if((i===s||!i)&&clearTimeout)return i=clearTimeout,clearTimeout(e);try{i(e)}catch(t){try{return i.call(null,e)}catch(t){return i.call(this,e)}}}(e)}}function v(e,t){this.fun=e,this.array=t}function m(){}r.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new v(e,t)),1!==u.length||l||a(f)},v.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=m,r.addListener=m,r.once=m,r.off=m,r.removeListener=m,r.removeAllListeners=m,r.emit=m,r.prependListener=m,r.prependOnceListener=m,r.listeners=function(e){return[]},r.binding=function(e){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(e){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}},function(e,t,n){"use strict";n.r(t);var i=n(1),r=function(e,t){var n=this;this.$ele=t,this.$overlay=this.$ele.parentElement.querySelector(".video-overlay");var r={id:e,width:window.innerWidth,autoplay:!1,controls:!1,autopause:!0};this.vimeo=new i(t,r),this.muted=!0,this.volume=0,this.vimeo.setVolume(this.volume),this.progress=0,this.length=0,this.vimeo.getDuration().then((function(e){return n.length=e})),this.fadeLoop=!1,this.isPlaying=!1,this.vimeo.on("ended",(function(){n._onEnded()})),this.vimeo.on("timeupdate",(function(e){n.progress=e.seconds/e.duration,"function"==typeof n.onProgress&&n.onProgress(),e.seconds>=e.duration-2&&n._onEnded()})),this.$overlay.addEventListener("click",(function(){window.innerWidth<=640&&(console.log("smallscreen unmute"),n.volume=1,n.unmute()),n.togglePlay()}))},o=r.prototype;o._onEnded=function(){"function"==typeof this.onEnded&&this.onEnded()},o.togglePlay=function(){this.isPlaying?this.pause():this.play()},o.play=function(){this.isPlaying=!0,this.$ele.classList.add("playing"),this.vimeo.play()},o.pause=function(){this.isPlaying=!1,this.$ele.classList.remove("playing"),this.vimeo.pause()},o.mute=function(){this.muted=!0,this.vimeo.setVolume(0)},o.unmute=function(){this.muted=!1,this.vimeo.setVolume(this.volume)},o.getProgress=function(){return this.progress},o._onFadedIn=function(){"function"==typeof this.onFadedIn&&this.onFadedIn()},o.fadeIn=function(e,t){var n=this,i=e||100,r=t||function(){};clearInterval(this.fadeLoop);var o=(1-this.volume)/(i/10);this.fadeLoop=setInterval((function(){n.volume+=o,n.volume>=1&&(n.volume=1,n._onFadedIn(),r(),clearInterval(n.fadeLoop)),n.muted||n.vimeo.setVolume(n.volume)}),10)},o._onFadedOut=function(){"function"==typeof this.onFadedOut&&this.onFadedOut()},o.fadeOut=function(e,t){var n=this,i=e||100,r=t||function(){};clearInterval(this.fadeLoop);var o=-this.volume/(i/10);this.fadeLoop=setInterval((function(){n.volume+=o,n.volume<=0&&(n.volume=0,n._onFadedOut(),r(),clearInterval(n.fadeLoop)),n.muted||n.vimeo.setVolume(n.volume)}),10)},o.update=function(e){};var s=r,a=function(e,t){this.duration=e,this.timer=!1,this.restartTimer=!1,this.time=0,this.initProgress=t||0,this.progress=this.initProgress||0,this.timeStep=50,this.progressStep=1/(this.duration/this.timeStep),this.isPaused=!1},c=a.prototype;c.updateProgress=function(e){e<=1&&e>=0&&(this.progress=e)},c.pauseAndAutoResume=function(e){var t=this,n=e||500;this.isActive&&(this.pause(),clearInterval(this.restartTimer),this.restartTimer=setInterval((function(){t.play()}),n))},c.pause=function(){this.isPaused=!0,clearInterval(this.timer)},c.reset=function(){this.progress=this.initProgress},c.start=function(){this.isActive=!0,this.reset(),this.play()},c.stop=function(){this.isActive=!1,clearInterval(this.restartTimer),this.pause()},c.play=function(){var e=this;clearInterval(this.timer),this.isPaused=!1,this.timer=setInterval((function(){e.progress+=e.progressStep,e._onProgress(),e.progress>=1&&(clearInterval(e.timer),e._onEnded())}),this.timeStep)},c._onEnded=function(){this.reset(),"function"==typeof this.onEnded&&this.onEnded()},c._onProgress=function(){"function"==typeof this.onProgress&&this.onProgress()};var u=a,l=function(e){var t=this;this.$ele=e,this.$content=e.querySelector(".screen--content"),this.active=!1,this.type="",this.contentScrollProgressFrac=0,this.scrollMax="credits"===this.type?this.$content.scrollHeight:.6*this.$ele.offsetHeight,this.scrollMin="credits"===this.type?-.1*this.$ele.offsetHeight:0,this.scrollProgress=.2*this.scrollMax,this.scrollProgressFrac=0,this.$ele.classList.contains("screen__text__credits")?(this.type="credits",this.autoScreen=new u(18e4,.2),this.$ele.addEventListener("scroll",(function(e){t.contentScrollProgressFrac=t.$ele.scrollTop/(t.$ele.scrollHeight-t.$ele.offsetHeight),t._onProgress(),t.autoScreen.updateProgress(t.contentScrollProgressFrac),console.log(t.autoScreen.progress),t.autoScreen.progress<.1&&(t.deactivate(),t.screenBefore.activate())})),this.autoScreen.onProgress=function(){t.contentScrollProgressFrac=t.autoScreen.progress,t.$ele.scrollTop=t.contentScrollProgressFrac*(t.$ele.scrollHeight-t.$ele.offsetHeight)}):this.$ele.classList.contains("screen__video")?(this.type="video",this.video=new s(this.$content.dataset.vimeo_id,this.$content),this.video.onProgress=function(){t._onProgress()},this.video.onEnded=function(){t.deactivate(),t.screenAfter.activate()}):(this.type="text",this.autoScreen=new u(15e3),this.autoScreen.onProgress=function(){t.scrollProgressFrac=t.autoScreen.progress,t.update(),t._onProgress()},this.autoScreen.onEnded=function(){t.deactivate(),t.screenAfter.activate()})},h=l.prototype;h.linkToOthers=function(e,t){this.screenBefore=e,this.screenAfter=t},h._onProgress=function(){"function"==typeof this.onProgress&&this.active&&this.onProgress()},h._onActivated=function(){"function"==typeof this.onActivated&&this.onActivated(this)},h._onActivateStart=function(){"function"==typeof this.onActivateStart&&this.onActivateStart(this)},h.preload=function(){"video"===this.type&&this.video.play()},h.setMuteState=function(e){"video"===this.type&&(this.video.muted=e)},h.activate=function(e){var t=this,n=e||function(){};this._onActivateStart(),this.active=!0,this.$ele.classList.add("active"),this.scrollProgress=.2*this.scrollMax,this.scrollProgressFrac=0,"video"===this.type?(this.video.vimeo.setCurrentTime(0),this.video.play(),this.video.fadeIn(1500,(function(){t._onActivated(),n()}))):"credits"===this.type?(this.$ele.scrollTop=this.autoScreen.initProgress*(this.$ele.scrollHeight-this.$ele.offsetHeight)+10,this.autoScreen.start(),this._onActivated(),n()):(this.autoScreen.start(),this._onActivated(),n()),this.update()},h.deactivate=function(e){var t=this,n=e||function(){};this.active=!1,this.$ele.classList.remove("active"),"video"===this.type?this.video.fadeOut(1500,(function(){t.video.pause(),n()})):(this.type,this.autoScreen.stop(),n())},h.scroll=function(e){var t=this;"text"!==this.type&&"credits"!==this.type||this.autoScreen.pauseAndAutoResume(),this.active&&"credits"!==this.type&&(this.scrollProgress+=e,this.scrollProgress<this.scrollMin-10?this.scrollProgress=this.scrollMin-10:this.scrollProgress>this.scrollMax+10&&(this.scrollProgress=this.scrollMax+10),this.scrollProgressFrac=this.scrollProgress/this.scrollMax,this.scrollProgressFrac>.75&&this.screenAfter?this.deactivate((function(){t.screenAfter.activate()})):this.scrollProgressFrac<this.scrollMin/this.scrollMax&&this.screenBefore&&this.deactivate((function(){t.screenBefore.activate()})),this.scrollProgressFrac>.25&&"video"===this.screenAfter.type&&this.screenAfter.preload(),"text"!==this.type&&"credits"!==this.type||this.autoScreen.updateProgress(this.scrollProgressFrac))},h.resize=function(){this.scrollProgressFrac=this.scrollProgress/this.scrollMax,this.scrollMax="credits"===this.type?this.$ele.scrollHeight:this.$ele.offsetHeight,this.scrollProgress=this.scrollProgressFrac*this.scrollMax},h.update=function(){"video"===this.type?(this.video.update(this.scrollProgressFrac),this.scrollProgressFrac>.75?this.$content.style.opacity=4*(.25-(this.scrollProgressFrac-.75)):this.$content.style.opacity=1):"text"===this.type&&(this.scrollProgressFrac>.3?this.$content.style.opacity=(.7-(this.scrollProgressFrac-.3))*(1/.7):this.$content.style.opacity=1)};var d=l,f=function(e,t,n){this.$ele=e,this.$indicator=this.$ele.querySelector(".progress--indicator"),this.$stages=this.$ele.querySelectorAll(".progress--stage"),this.hideTimeout=!1,this.hideDelay=3e3,this.indicatorMinWidth=this.$indicator.offsetWidth,this.setCurrent(t,n),this.initInteraction()},v=f.prototype;v.hide=function(e){var t=this;clearTimeout(this.hideTimeout),e?this.hideTimeout=setTimeout((function(){t.$ele.classList.add("state__hidden")}),e):this.$ele.classList.add("state__hidden")},v.show=function(){clearTimeout(this.hideTimeout),this.$ele.classList.remove("state__hidden")},v._onStageSelect=function(e,t){"function"==typeof this.onStageSelect&&this.onStageSelect(e,t)},v.initInteraction=function(){var e=this;this.$ele.querySelectorAll("a").forEach((function(t,n){t.addEventListener("click",(function(){var i=t.href.replace(window.location.origin,"").replace("/","").replace("#","");e._onStageSelect(n,i)}))})),document.addEventListener("mousemove",(function(){clearTimeout(e.hideTimeout),e.show(),"video"===e.currentScreen.type&&e.hide(e.hideDelay)})),document.addEventListener("wheel",(function(t){clearTimeout(e.hideTimeout),e.show(),"video"===e.currentScreen.type&&e.hide(e.hideDelay)}))},v.setCurrent=function(e,t){var n=this;this.currentScreen=e,this.$currentStage=this.$stages[t],this.moveIndicator(),"video"===this.currentScreen.type?(this.hide(this.hideDelay),this.currentScreen.onProgress=function(){n.moveIndicator()}):(this.currentScreen.type,this.show(),this.currentScreen.onProgress=function(){n.moveIndicator()})},v.moveIndicator=function(){var e=0,t=this.$currentStage.querySelector(".progress--stage--title").offsetWidth;if("video"===this.currentScreen.type){var n=this.currentScreen.video.getProgress();e=this.$currentStage.offsetLeft+t+this.indicatorMinWidth+n*(this.$currentStage.offsetWidth-this.indicatorMinWidth-t),this.$indicator.classList.add("indicator-active")}else if("credits"===this.currentScreen.type){var i=this.currentScreen.contentScrollProgressFrac;e=this.$currentStage.offsetLeft+i*(this.$currentStage.offsetWidth-this.indicatorMinWidth),this.$indicator.classList.add("indicator-active")}else{var r=this.currentScreen.autoScreen.progress;this.currentScreen.autoScreen.isPaused&&(r=this.currentScreen.scrollProgressFrac),e=this.$currentStage.offsetLeft+r*(t+this.indicatorMinWidth),this.$indicator.classList.add("indicator-active")}this.$indicator.style.width=e+this.indicatorMinWidth};var m=f,p=function(e){this.$fullscreen=document.querySelector(".control__fullscreen"),this.$mute=document.querySelector(".control__mute"),this.$fullscreen_label=this.$fullscreen.querySelector(".control--label"),this.$mute_label=this.$mute.querySelector(".control--label"),this.setCurrent(e),this.initFullscreen(),this.initMute(),this.hideTimeout=!1,this.hideDelay=3e3,this.initHideShow()},g=p.prototype;g.hide=function(e){var t=this;clearTimeout(this.hideTimeout),e?this.hideTimeout=setTimeout((function(){t.$fullscreen.classList.add("state__hidden"),t.$mute.classList.add("state__hidden"),document.body.style.cursor="none"}),e):(this.$fullscreen.classList.add("state__hidden"),this.$mute.classList.add("state__hidden"),document.body.style.cursor="none")},g.show=function(){clearTimeout(this.hideTimeout),this.$fullscreen.classList.remove("state__hidden"),this.$mute.classList.remove("state__hidden"),document.body.style.cursor="auto"},g.initHideShow=function(){var e=this;document.addEventListener("mousemove",(function(){clearTimeout(e.hideTimeout),e.show(),"video"===e.currentScreen.type?(e.showMute(),!1===e.currentScreen.video.muted&&e.hide(e.hideDelay)):e.hideMute()})),document.addEventListener("wheel",(function(t){clearTimeout(e.hideTimeout),e.show(),"video"===e.currentScreen.type?(e.showMute(),!1===e.currentScreen.video.muted&&e.hide(e.hideDelay)):e.hideMute()}))},g.setCurrent=function(e){this.currentScreen=e,"video"===this.currentScreen.type?(this.showMute(),this.currentScreen.video.muted?this.mute():(this.unmute(),this.hide(this.hideDelay))):(this.show(),this.hideMute())},g._onMute=function(){this.isMuted=!0,this.$mute_label.innerText="unmute",this.$mute.classList.add("state--muted"),"function"==typeof this.onMute&&this.onMute()},g._onUnMute=function(){this.isMuted=!1,this.$mute_label.innerText="mute",this.$mute.classList.remove("state--muted"),"function"==typeof this.onUnMute&&this.onUnMute()},g.mute=function(){this._onMute(),this.isMuted=!0},g.unmute=function(){this._onUnMute(),this.isMuted=!1},g.toggleMute=function(){this.isMuted=!this.isMuted,this.isMuted?this.mute():this.unmute()},g.initMute=function(){var e=this;this.isMuted=!1,this.$mute.addEventListener("click",(function(){e.toggleMute()}))},g.setMuteState=function(e){!0===e?this.mute():this.unmute()},g.showMute=function(){this.$mute.style.display="block"},g.hideMute=function(){this.$mute.style.display="none"},g.initFullscreen=function(){var e=this;document.addEventListener("fullscreenchange",(function(t){document.fullscreenElement?(e.$fullscreen.classList.add("state__fullscreen-active"),e.$fullscreen_label.innerText="exit fullscreen"):(e.$fullscreen.classList.remove("state__fullscreen-active"),e.$fullscreen_label.innerText="fullscreen")})),this.$fullscreen.addEventListener("click",(function(){document.fullscreenElement?document.exitFullscreen():document.querySelector(".site-wrap").requestFullscreen({navigationUI:"hide"}).catch((function(e){console.log("Could not enter fullscreen")}))}))};var y=p,w=[];document.querySelectorAll(".screen").forEach((function(e){w.push(new d(e))}));for(var T=0;T<w.length;T++){var b=T>0&&w[T-1],_=T<w.length-1&&w[T+1];w[T].linkToOthers(b,_)}var S=0,E=0,P=Math.floor(S/2),M=w[S],k=new m(document.querySelector(".progress--bar"),M,P),$=new y(M);$.onMute=function(){M.video&&M.video.mute()},$.onUnMute=function(){M.video&&M.video.unmute()},$.setMuteState(!0),$.hideMute();var L,A=!1;k.onStageSelect=function(e,t){2*e!==S&&(clearTimeout(A),M.deactivate(),A=setTimeout((function(){P=e,(M=w[S=2*e]).activate(),k.setCurrent(M,P),$.setCurrent(M)}),300))},M.activate();for(var I=0;I<w.length;I++)w[I].update(),function(e){w[e].onActivateStart=function(t){S=e,P=Math.floor(S/2),(M=w[e]).setMuteState($.isMuted),k.setCurrent(M,P),$.setCurrent(M)},w[e].onActivated=function(e){"video"===e.type?(k.hide(3e3),e.video.muted||$.hide(3e3)):(k.show(),$.show())}}(I);var x=!1;document.addEventListener("wheel",(function(e){window.innerWidth>640&&function(e){window.clearTimeout(L),L=setTimeout((function(){x=!1}),200),!x&&window.innerWidth>640&&(M.scroll(e.deltaY),M.update());for(var t=0;t<w.length;t++)w[t].active&&(S=t,P=Math.floor(S/2),M=w[t]);S!==E&&(k.setCurrent(M,P),$.setCurrent(M),x=!0),k.moveIndicator(),E=S}(e)}));var F=document.querySelector(".mini-progress").querySelector(".progress--bar"),j=function(){var e=F.offsetWidth,t=document.body.scrollHeight,n=(w[0].$ele.offsetHeight+w[1].$ele.offsetHeight)/t,i=(w[2].$ele.offsetHeight+w[3].$ele.offsetHeight)/t,r=(w[4].$ele.offsetHeight+w[5].$ele.offsetHeight)/t,o=w[6].$ele.offsetHeight/t,s=document.querySelectorAll(".mini-progress .progress--stage");s[0].style.width=n*e,s[1].style.width=i*e,s[2].style.width=r*e,s[3].style.width=o*e},O=function(){for(var e=0;e<w.length;e++)"text"!==w[e].type&&"credits"!==w[e].type||w[e].autoScreen.stop()};window.addEventListener("resize",(function(){window.innerWidth<=640&&(j(),O())})),document.addEventListener("scroll",(function(e){var t,n,i,r;window.innerWidth<=640&&(t=F.offsetWidth,n=document.body.scrollTop/document.body.scrollHeight*(t-window.innerWidth)*-1,i=document.querySelectorAll(".mini-progress .progress--stage"),r=-1*(i[0].offsetWidth+i[1].offsetWidth+i[2].offsetWidth),n<r&&(n=r),F.style.transform="translateX("+n+"px)")})),window.innerWidth<=640&&(j(),O())}]);
//# sourceMappingURL=main.js.map