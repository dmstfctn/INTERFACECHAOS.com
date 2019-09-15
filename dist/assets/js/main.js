!function(n){var e={};function t(c){if(e[c])return e[c].exports;var l=e[c]={i:c,l:!1,exports:{}};return n[c].call(l.exports,l,l.exports,t),l.l=!0,l.exports}t.m=n,t.c=e,t.d=function(n,e,c){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:c})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var c=Object.create(null);if(t.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var l in n)t.d(c,l,function(e){return n[e]}.bind(null,l));return c},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=0)}([function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n\n// CONCATENATED MODULE: ./src/modules/Video.js\n//ensure <script src=\"https://player.vimeo.com/api/player.js\"><\/script> is included on page\n\nlet Video = function( id, $ele ){\n  let opts = {\n    id: id,\n    width: window.innerWidth,\n    autoplay: false,\n    controls: false\n  };\n  this.vimeo = new Vimeo.Player( $ele, opts );\n  this.volume = 0;\n  this.vimeo.setVolume( this.volume );\n  this.progress = 0;\n  this.length = 0;\n  this.vimeo.getDuration().then(duration => this.length = duration);  \n  this.fadeLoop = false;\n  this.vimeo.on('ended', ( ) => {\n    console.log('vimeo says ended')\n    this._onEnded();\n  });\n  this.vimeo.on('timeupdate', ( t ) => {\n    this.progress = t.seconds / t.duration;\n    if( typeof this.onProgress === 'function' ){\n      this.onProgress();\n    }\n    if( t.seconds >= t.duration - 2 ){\n      console.log( 'less than 2 seconds to end' );\n      this._onEnded();\n    }\n  });\n}\n\nlet proto = Video.prototype;\n\nproto._onEnded = function(){\n  console.log('Video() - _onEnded()');\n  if( typeof this.onEnded === 'function' ){\n    this.onEnded();\n  }\n}\n\nproto.play = function(){\n  this.vimeo.play();\n}\n\nproto.pause = function(){\n  this.vimeo.pause();\n}\n\nproto.getProgress = function(){\n  return this.progress;\n}\n\nproto._onFadedIn = function(){\n  if( typeof this.onFadedIn === 'function' ){\n    this.onFadedIn();\n  }\n}\n\nproto.fadeIn = function( _time, _callback ){  \n  let time = _time || 100;\n  let callback = _callback || function(){};\n  clearInterval( this.fadeLoop );\n  let change = 1 - this.volume;\n  let step = change / (time / 10);\n  this.fadeLoop = setInterval(() => {\n    this.volume += step;\n    if( this.volume >= 1 ){\n      this.volume = 1; \n      this._onFadedIn();\n      callback();\n      clearInterval( this.fadeLoop );\n    }    \n    this.vimeo.setVolume( this.volume );\n  }, 10 );\n};\n\nproto._onFadedOut = function(){\n  if( typeof this.onFadedOut === 'function' ){\n    this.onFadedOut();\n  }\n}\n\nproto.fadeOut = function( _time, _callback ){  \n  let time = _time || 100;\n  let callback = _callback || function(){};  \n  clearInterval( this.fadeLoop );\n  let change = -this.volume;\n  let step = change / (time / 10);  \n  console.log( 'from', this.volume, ' fadeout: ', change, step );\n  this.fadeLoop = setInterval(() => {\n    this.volume += step;\n    if( this.volume <= 0 ){\n      this.volume = 0; \n      this._onFadedOut();\n      callback();\n      clearInterval( this.fadeLoop );\n    }\n    this.vimeo.setVolume( this.volume );\n  }, 10 );\n};\n\nproto.update = function( fraction ){\n\n}\n/* harmony default export */ var modules_Video = (Video);\n// CONCATENATED MODULE: ./src/modules/Screen.js\n\n\nlet Screen = function( $ele ){\n  this.$ele = $ele;\n  this.$content = $ele.querySelector('.screen--content');\n  this.active = false;\n  this.type = '';\n  if( this.$ele.classList.contains( 'screen__text__credits' ) ){\n      this.type = 'credits';\n  } else if( this.$ele.classList.contains( 'screen__video' ) ){\n    this.type = 'video';    \n    this.video = new modules_Video( this.$content.dataset.vimeo_id, this.$content );\n    this.video.onProgress = () => {\n      this._onProgress();\n    };\n    this.video.onEnded = () => {\n      this.deactivate();\n      this.screenAfter.activate();\n    }\n  } else {\n    this.type = 'text';\n  }\n  this.scrollProgress = 0;\n  this.scrollProgressFrac = 0;\n  this.scrollMax = ( this.type === 'credits' ) ? this.$ele.scrollHeight : this.$ele.offsetHeight/2;  \n  this.scrollMin = ( this.type === 'credits' ) ? this.$ele.offsetHeight * -0.1 : 0;\n}\n\nlet Screen_proto = Screen.prototype;\n\nScreen_proto.linkToOthers = function( before, after ){\n  this.screenBefore = before;\n  this.screenAfter = after;\n}\n\nScreen_proto._onProgress = function(){\n  if( typeof this.onProgress === 'function' && this.active ){\n    this.onProgress();\n  }\n}\n\nScreen_proto.preload = function(){\n  if( this.type === 'video' ){\n    this.video.play();    \n  }\n}\n\nScreen_proto.activate = function(){\n  this.active = true;\n  this.$ele.classList.add( 'active' );\n  this.scrollProgress = 0;\n  this.scrollProgressFrac = 0;\n  if( this.type === 'video' ){\n    this.video.play();\n    this.video.fadeIn(1500);\n  }\n  if( this.type === 'credits' ){\n    this.$content.scrollTop = 0;\n  }\n  this.update();\n}\n\nScreen_proto.deactivate = function(){\n  this.active = false;\n  this.$ele.classList.remove('active');\n  if( this.type === 'video' ){\n    this.video.fadeOut(1500, () => {\n      this.video.pause();\n    });\n  }\n}\n\n\nScreen_proto.scroll = function( delta ){\n  if( this.active ){\n    this.scrollProgress += delta;\n    if( this.scrollProgress < this.scrollMin -10 ){\n      this.scrollProgress = this.scrollMin -10;\n    } else if( this.scrollProgress > this.scrollMax + 10 ){\n      this.scrollProgress = this.scrollMax + 10;\n    }\n    this.scrollProgressFrac = this.scrollProgress/this.scrollMax;\n    if( this.scrollProgressFrac > 1 && this.screenAfter ){\n      this.deactivate()\n      this.screenAfter.activate();\n    } else if( this.scrollProgressFrac < this.scrollMin / this.scrollMax && this.screenBefore ){\n      this.deactivate();\n      this.screenBefore.activate();\n    }\n    if( this.scrollProgressFrac > 0.25 && this.screenAfter.type === 'video' ){\n      this.screenAfter.preload();\n    } \n  }\n}\n\nScreen_proto.resize = function(){\n  this.scrollProgressFrac = this.scrollProgress/this.scrollMax;\n  this.scrollMax = ( this.type === 'credits' ) ? this.$ele.scrollHeight : this.$ele.offsetHeight;\n  this.scrollProgress = this.scrollProgressFrac * this.scrollMax;\n}\n\nScreen_proto.update = function(){\n  if( this.type === 'video' ){\n    this.video.update( this.scrollProgressFrac );\n  }  \n\n  this.$content.style.opacity = (1 - this.scrollProgressFrac);\n}\n\n/* harmony default export */ var modules_Screen = (Screen);\n// CONCATENATED MODULE: ./src/modules/Progress.js\nlet Progress = function( $ele, currentScreen, stageIndex ){\n  this.$ele = $ele;\n  this.$indicator = this.$ele.querySelector('.progress--indicator');\n  this.$stages = this.$ele.querySelectorAll('.progress--stage');\n  this.setCurrent( currentScreen, stageIndex );\n  this.initInteraction();\n  this.hideTimeout = false;\n}\n\nlet Progress_proto = Progress.prototype;\n\nProgress_proto.hide = function( delay ){\n  clearTimeout( this.hideTimeout );\n  if( delay ){\n    this.hideTimeout = setTimeout(() => {\n      this.$ele.classList.add('state__hidden');\n    }, delay );\n  } else {\n    this.$ele.classList.add('state__hidden');\n  }\n}\nProgress_proto.show = function(){\n  clearTimeout( this.hideTimeout );\n  this.$ele.classList.remove('state__hidden');\n}\n\nProgress_proto._onStageSelect = function( index, id ){\n  console.log( index, id );\n  if( typeof this.onStageSelect === 'function' ){\n    this.onStageSelect( index, id );\n  }\n}\n\nProgress_proto.initInteraction = function(){\n  this.$ele.querySelectorAll('a').forEach(( $a, i  ) => {\n    $a.addEventListener('click', () => {\n      let id = $a.href.replace(window.location.origin,'').replace('/', '').replace('#','');\n      this._onStageSelect( i, id );\n    });\n  });\n  \n  document.addEventListener('mousemove', () => {\n    clearTimeout( this.hideTimeout );\n    this.show();\n    if( this.currentScreen.type === 'video' ){\n      this.hide( 1500 );\n    }\n  })\n};\n\nProgress_proto.setCurrent = function( currentScreen, stageIndex ){\n  this.currentScreen = currentScreen;\n  this.$currentStage = this.$stages[ stageIndex ];\n  this.moveIndicator();\n  if( this.currentScreen.type === 'video' ){\n    this.hide( 600 );\n    this.currentScreen.onProgress = () => {\n      this.moveIndicator();\n    }\n  } else {\n    this.show();\n  }\n}\n\nProgress_proto.moveIndicator = function(){\n  let translateX = 0;\n  if( this.currentScreen.type === 'video' ){\n    let progress = this.currentScreen.video.getProgress();\n    let x = this.$currentStage.offsetLeft;\n    let max = this.$currentStage.offsetWidth;\n    translateX = x + (progress * max);    \n  } else {\n    translateX = this.$currentStage.offsetLeft;\n  }\n  this.$indicator.style.transform = 'translateX(' + translateX + 'px)';\n}\n\n/* harmony default export */ var modules_Progress = (Progress);\n// CONCATENATED MODULE: ./src/main.js\n\n\n\nlet screens = [];\ndocument\n  .querySelectorAll('.screen')\n  .forEach(function( $s ){\n    screens.push( new modules_Screen( $s ) );\n  });\n\nfor( let i = 0; i < screens.length; i++ ){\n  let before = i > 0 ? screens[i-1] : false;\n  let after = i < screens.length - 1 ? screens[i+1] : false;  \n  screens[i].linkToOthers( before, after );\n}\n\nwindow.screens = screens;\n\nlet currentScreenIndex = 0;\nlet pScreenIndex = 0;\nlet currentStageIndex = Math.floor( currentScreenIndex / 2 );\nlet currentScreen = screens[currentScreenIndex];\n\nlet progress = new modules_Progress( document.querySelector('.progress--bar'), currentScreen , currentStageIndex );\n\nlet stageSelectTimeout = false;\nprogress.onStageSelect = function( index, id ){\n  if( index !== currentStageIndex ){\n    currentScreen.deactivate();\n    stageSelectTimeout = setTimeout(function(){\n      currentScreenIndex = index * 2;\n      currentStageIndex = index;\n      currentScreen = screens[currentScreenIndex];\n      currentScreen.activate();\n      progress.setCurrent( currentScreen, currentStageIndex );\n    }, 300 );\n  }\n}\n\ncurrentScreen.activate();\n\n\n\nfor( let i = 0; i < screens.length; i++ ){\n  screens[i].update();\n}\n\nlet isScrolling;\nlet scrollBreak = false;\n\n\ndocument.addEventListener('wheel', function( e ){\n  window.clearTimeout( isScrolling );\n  isScrolling = setTimeout(function() {\n\t\tscrollBreak = false;\n\t}, 200 );\n\n  if( !scrollBreak ){\n    currentScreen.scroll( e.deltaY );\n    currentScreen.update();\n  }\n\n  for( let i = 0; i < screens.length; i++ ){\n    if( screens[i].active ){\n      currentScreenIndex = i;\n      currentStageIndex = Math.floor( currentScreenIndex / 2 );\n      currentScreen = screens[i];\n    }\n  }\n\n  if( currentScreenIndex !== pScreenIndex ){\n    progress.setCurrent( currentScreen, currentStageIndex );\n    scrollBreak = true;\n  }\n  \n  pScreenIndex = currentScreenIndex;\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbW9kdWxlcy9WaWRlby5qcz85ZDdiIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL1NjcmVlbi5qcz8zYTg0Iiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL1Byb2dyZXNzLmpzPzJiZTIiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanM/NTZkNyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEs7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZDO0FBQ0E7QUFDQSwyQztBQUNBO0FBQ0E7QUFDQSxrQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ2UsdURBQUssRTs7QUN6R1c7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILHdCO0FBQ0EscUJBQXFCLGFBQUs7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRztBQUNBO0FBQ0E7O0FBRUEsSUFBSSxZQUFLOztBQUVULFlBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsWUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFlBQUs7QUFDTDtBQUNBLHNCO0FBQ0E7QUFDQTs7QUFFQSxZQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7O0FBR0EsWUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSztBQUNBO0FBQ0E7O0FBRUEsWUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFlBQUs7QUFDTDtBQUNBO0FBQ0EsRzs7QUFFQTtBQUNBOztBQUVlLHlEQUFNLEU7O0FDN0dyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUksY0FBSzs7QUFFVCxjQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLGNBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsY0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGNBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQSxjQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVlLDZEQUFRLEU7O0FDN0VrQjtBQUNJOztBQUU3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixjQUFNO0FBQzVCLEdBQUc7O0FBRUgsZUFBZSxvQkFBb0I7QUFDbkM7QUFDQSw0RDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLGdCQUFROztBQUUzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOzs7O0FBSUEsZUFBZSxvQkFBb0I7QUFDbkM7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLG9CQUFvQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL2Vuc3VyZSA8c2NyaXB0IHNyYz1cImh0dHBzOi8vcGxheWVyLnZpbWVvLmNvbS9hcGkvcGxheWVyLmpzXCI+PC9zY3JpcHQ+IGlzIGluY2x1ZGVkIG9uIHBhZ2VcblxubGV0IFZpZGVvID0gZnVuY3Rpb24oIGlkLCAkZWxlICl7XG4gIGxldCBvcHRzID0ge1xuICAgIGlkOiBpZCxcbiAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGgsXG4gICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgIGNvbnRyb2xzOiBmYWxzZVxuICB9O1xuICB0aGlzLnZpbWVvID0gbmV3IFZpbWVvLlBsYXllciggJGVsZSwgb3B0cyApO1xuICB0aGlzLnZvbHVtZSA9IDA7XG4gIHRoaXMudmltZW8uc2V0Vm9sdW1lKCB0aGlzLnZvbHVtZSApO1xuICB0aGlzLnByb2dyZXNzID0gMDtcbiAgdGhpcy5sZW5ndGggPSAwO1xuICB0aGlzLnZpbWVvLmdldER1cmF0aW9uKCkudGhlbihkdXJhdGlvbiA9PiB0aGlzLmxlbmd0aCA9IGR1cmF0aW9uKTsgIFxuICB0aGlzLmZhZGVMb29wID0gZmFsc2U7XG4gIHRoaXMudmltZW8ub24oJ2VuZGVkJywgKCApID0+IHtcbiAgICBjb25zb2xlLmxvZygndmltZW8gc2F5cyBlbmRlZCcpXG4gICAgdGhpcy5fb25FbmRlZCgpO1xuICB9KTtcbiAgdGhpcy52aW1lby5vbigndGltZXVwZGF0ZScsICggdCApID0+IHtcbiAgICB0aGlzLnByb2dyZXNzID0gdC5zZWNvbmRzIC8gdC5kdXJhdGlvbjtcbiAgICBpZiggdHlwZW9mIHRoaXMub25Qcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyApe1xuICAgICAgdGhpcy5vblByb2dyZXNzKCk7XG4gICAgfVxuICAgIGlmKCB0LnNlY29uZHMgPj0gdC5kdXJhdGlvbiAtIDIgKXtcbiAgICAgIGNvbnNvbGUubG9nKCAnbGVzcyB0aGFuIDIgc2Vjb25kcyB0byBlbmQnICk7XG4gICAgICB0aGlzLl9vbkVuZGVkKCk7XG4gICAgfVxuICB9KTtcbn1cblxubGV0IHByb3RvID0gVmlkZW8ucHJvdG90eXBlO1xuXG5wcm90by5fb25FbmRlZCA9IGZ1bmN0aW9uKCl7XG4gIGNvbnNvbGUubG9nKCdWaWRlbygpIC0gX29uRW5kZWQoKScpO1xuICBpZiggdHlwZW9mIHRoaXMub25FbmRlZCA9PT0gJ2Z1bmN0aW9uJyApe1xuICAgIHRoaXMub25FbmRlZCgpO1xuICB9XG59XG5cbnByb3RvLnBsYXkgPSBmdW5jdGlvbigpe1xuICB0aGlzLnZpbWVvLnBsYXkoKTtcbn1cblxucHJvdG8ucGF1c2UgPSBmdW5jdGlvbigpe1xuICB0aGlzLnZpbWVvLnBhdXNlKCk7XG59XG5cbnByb3RvLmdldFByb2dyZXNzID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHRoaXMucHJvZ3Jlc3M7XG59XG5cbnByb3RvLl9vbkZhZGVkSW4gPSBmdW5jdGlvbigpe1xuICBpZiggdHlwZW9mIHRoaXMub25GYWRlZEluID09PSAnZnVuY3Rpb24nICl7XG4gICAgdGhpcy5vbkZhZGVkSW4oKTtcbiAgfVxufVxuXG5wcm90by5mYWRlSW4gPSBmdW5jdGlvbiggX3RpbWUsIF9jYWxsYmFjayApeyAgXG4gIGxldCB0aW1lID0gX3RpbWUgfHwgMTAwO1xuICBsZXQgY2FsbGJhY2sgPSBfY2FsbGJhY2sgfHwgZnVuY3Rpb24oKXt9O1xuICBjbGVhckludGVydmFsKCB0aGlzLmZhZGVMb29wICk7XG4gIGxldCBjaGFuZ2UgPSAxIC0gdGhpcy52b2x1bWU7XG4gIGxldCBzdGVwID0gY2hhbmdlIC8gKHRpbWUgLyAxMCk7XG4gIHRoaXMuZmFkZUxvb3AgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgdGhpcy52b2x1bWUgKz0gc3RlcDtcbiAgICBpZiggdGhpcy52b2x1bWUgPj0gMSApe1xuICAgICAgdGhpcy52b2x1bWUgPSAxOyBcbiAgICAgIHRoaXMuX29uRmFkZWRJbigpO1xuICAgICAgY2FsbGJhY2soKTtcbiAgICAgIGNsZWFySW50ZXJ2YWwoIHRoaXMuZmFkZUxvb3AgKTtcbiAgICB9ICAgIFxuICAgIHRoaXMudmltZW8uc2V0Vm9sdW1lKCB0aGlzLnZvbHVtZSApO1xuICB9LCAxMCApO1xufTtcblxucHJvdG8uX29uRmFkZWRPdXQgPSBmdW5jdGlvbigpe1xuICBpZiggdHlwZW9mIHRoaXMub25GYWRlZE91dCA9PT0gJ2Z1bmN0aW9uJyApe1xuICAgIHRoaXMub25GYWRlZE91dCgpO1xuICB9XG59XG5cbnByb3RvLmZhZGVPdXQgPSBmdW5jdGlvbiggX3RpbWUsIF9jYWxsYmFjayApeyAgXG4gIGxldCB0aW1lID0gX3RpbWUgfHwgMTAwO1xuICBsZXQgY2FsbGJhY2sgPSBfY2FsbGJhY2sgfHwgZnVuY3Rpb24oKXt9OyAgXG4gIGNsZWFySW50ZXJ2YWwoIHRoaXMuZmFkZUxvb3AgKTtcbiAgbGV0IGNoYW5nZSA9IC10aGlzLnZvbHVtZTtcbiAgbGV0IHN0ZXAgPSBjaGFuZ2UgLyAodGltZSAvIDEwKTsgIFxuICBjb25zb2xlLmxvZyggJ2Zyb20nLCB0aGlzLnZvbHVtZSwgJyBmYWRlb3V0OiAnLCBjaGFuZ2UsIHN0ZXAgKTtcbiAgdGhpcy5mYWRlTG9vcCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICB0aGlzLnZvbHVtZSArPSBzdGVwO1xuICAgIGlmKCB0aGlzLnZvbHVtZSA8PSAwICl7XG4gICAgICB0aGlzLnZvbHVtZSA9IDA7IFxuICAgICAgdGhpcy5fb25GYWRlZE91dCgpO1xuICAgICAgY2FsbGJhY2soKTtcbiAgICAgIGNsZWFySW50ZXJ2YWwoIHRoaXMuZmFkZUxvb3AgKTtcbiAgICB9XG4gICAgdGhpcy52aW1lby5zZXRWb2x1bWUoIHRoaXMudm9sdW1lICk7XG4gIH0sIDEwICk7XG59O1xuXG5wcm90by51cGRhdGUgPSBmdW5jdGlvbiggZnJhY3Rpb24gKXtcblxufVxuZXhwb3J0IGRlZmF1bHQgVmlkZW87IiwiaW1wb3J0IFZpZGVvIGZyb20gXCIuL1ZpZGVvLmpzXCI7XG5cbmxldCBTY3JlZW4gPSBmdW5jdGlvbiggJGVsZSApe1xuICB0aGlzLiRlbGUgPSAkZWxlO1xuICB0aGlzLiRjb250ZW50ID0gJGVsZS5xdWVyeVNlbGVjdG9yKCcuc2NyZWVuLS1jb250ZW50Jyk7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gIHRoaXMudHlwZSA9ICcnO1xuICBpZiggdGhpcy4kZWxlLmNsYXNzTGlzdC5jb250YWlucyggJ3NjcmVlbl9fdGV4dF9fY3JlZGl0cycgKSApe1xuICAgICAgdGhpcy50eXBlID0gJ2NyZWRpdHMnO1xuICB9IGVsc2UgaWYoIHRoaXMuJGVsZS5jbGFzc0xpc3QuY29udGFpbnMoICdzY3JlZW5fX3ZpZGVvJyApICl7XG4gICAgdGhpcy50eXBlID0gJ3ZpZGVvJzsgICAgXG4gICAgdGhpcy52aWRlbyA9IG5ldyBWaWRlbyggdGhpcy4kY29udGVudC5kYXRhc2V0LnZpbWVvX2lkLCB0aGlzLiRjb250ZW50ICk7XG4gICAgdGhpcy52aWRlby5vblByb2dyZXNzID0gKCkgPT4ge1xuICAgICAgdGhpcy5fb25Qcm9ncmVzcygpO1xuICAgIH07XG4gICAgdGhpcy52aWRlby5vbkVuZGVkID0gKCkgPT4ge1xuICAgICAgdGhpcy5kZWFjdGl2YXRlKCk7XG4gICAgICB0aGlzLnNjcmVlbkFmdGVyLmFjdGl2YXRlKCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRoaXMudHlwZSA9ICd0ZXh0JztcbiAgfVxuICB0aGlzLnNjcm9sbFByb2dyZXNzID0gMDtcbiAgdGhpcy5zY3JvbGxQcm9ncmVzc0ZyYWMgPSAwO1xuICB0aGlzLnNjcm9sbE1heCA9ICggdGhpcy50eXBlID09PSAnY3JlZGl0cycgKSA/IHRoaXMuJGVsZS5zY3JvbGxIZWlnaHQgOiB0aGlzLiRlbGUub2Zmc2V0SGVpZ2h0LzI7ICBcbiAgdGhpcy5zY3JvbGxNaW4gPSAoIHRoaXMudHlwZSA9PT0gJ2NyZWRpdHMnICkgPyB0aGlzLiRlbGUub2Zmc2V0SGVpZ2h0ICogLTAuMSA6IDA7XG59XG5cbmxldCBwcm90byA9IFNjcmVlbi5wcm90b3R5cGU7XG5cbnByb3RvLmxpbmtUb090aGVycyA9IGZ1bmN0aW9uKCBiZWZvcmUsIGFmdGVyICl7XG4gIHRoaXMuc2NyZWVuQmVmb3JlID0gYmVmb3JlO1xuICB0aGlzLnNjcmVlbkFmdGVyID0gYWZ0ZXI7XG59XG5cbnByb3RvLl9vblByb2dyZXNzID0gZnVuY3Rpb24oKXtcbiAgaWYoIHR5cGVvZiB0aGlzLm9uUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgdGhpcy5hY3RpdmUgKXtcbiAgICB0aGlzLm9uUHJvZ3Jlc3MoKTtcbiAgfVxufVxuXG5wcm90by5wcmVsb2FkID0gZnVuY3Rpb24oKXtcbiAgaWYoIHRoaXMudHlwZSA9PT0gJ3ZpZGVvJyApe1xuICAgIHRoaXMudmlkZW8ucGxheSgpOyAgICBcbiAgfVxufVxuXG5wcm90by5hY3RpdmF0ZSA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgdGhpcy4kZWxlLmNsYXNzTGlzdC5hZGQoICdhY3RpdmUnICk7XG4gIHRoaXMuc2Nyb2xsUHJvZ3Jlc3MgPSAwO1xuICB0aGlzLnNjcm9sbFByb2dyZXNzRnJhYyA9IDA7XG4gIGlmKCB0aGlzLnR5cGUgPT09ICd2aWRlbycgKXtcbiAgICB0aGlzLnZpZGVvLnBsYXkoKTtcbiAgICB0aGlzLnZpZGVvLmZhZGVJbigxNTAwKTtcbiAgfVxuICBpZiggdGhpcy50eXBlID09PSAnY3JlZGl0cycgKXtcbiAgICB0aGlzLiRjb250ZW50LnNjcm9sbFRvcCA9IDA7XG4gIH1cbiAgdGhpcy51cGRhdGUoKTtcbn1cblxucHJvdG8uZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gIHRoaXMuJGVsZS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgaWYoIHRoaXMudHlwZSA9PT0gJ3ZpZGVvJyApe1xuICAgIHRoaXMudmlkZW8uZmFkZU91dCgxNTAwLCAoKSA9PiB7XG4gICAgICB0aGlzLnZpZGVvLnBhdXNlKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuXG5wcm90by5zY3JvbGwgPSBmdW5jdGlvbiggZGVsdGEgKXtcbiAgaWYoIHRoaXMuYWN0aXZlICl7XG4gICAgdGhpcy5zY3JvbGxQcm9ncmVzcyArPSBkZWx0YTtcbiAgICBpZiggdGhpcy5zY3JvbGxQcm9ncmVzcyA8IHRoaXMuc2Nyb2xsTWluIC0xMCApe1xuICAgICAgdGhpcy5zY3JvbGxQcm9ncmVzcyA9IHRoaXMuc2Nyb2xsTWluIC0xMDtcbiAgICB9IGVsc2UgaWYoIHRoaXMuc2Nyb2xsUHJvZ3Jlc3MgPiB0aGlzLnNjcm9sbE1heCArIDEwICl7XG4gICAgICB0aGlzLnNjcm9sbFByb2dyZXNzID0gdGhpcy5zY3JvbGxNYXggKyAxMDtcbiAgICB9XG4gICAgdGhpcy5zY3JvbGxQcm9ncmVzc0ZyYWMgPSB0aGlzLnNjcm9sbFByb2dyZXNzL3RoaXMuc2Nyb2xsTWF4O1xuICAgIGlmKCB0aGlzLnNjcm9sbFByb2dyZXNzRnJhYyA+IDEgJiYgdGhpcy5zY3JlZW5BZnRlciApe1xuICAgICAgdGhpcy5kZWFjdGl2YXRlKClcbiAgICAgIHRoaXMuc2NyZWVuQWZ0ZXIuYWN0aXZhdGUoKTtcbiAgICB9IGVsc2UgaWYoIHRoaXMuc2Nyb2xsUHJvZ3Jlc3NGcmFjIDwgdGhpcy5zY3JvbGxNaW4gLyB0aGlzLnNjcm9sbE1heCAmJiB0aGlzLnNjcmVlbkJlZm9yZSApe1xuICAgICAgdGhpcy5kZWFjdGl2YXRlKCk7XG4gICAgICB0aGlzLnNjcmVlbkJlZm9yZS5hY3RpdmF0ZSgpO1xuICAgIH1cbiAgICBpZiggdGhpcy5zY3JvbGxQcm9ncmVzc0ZyYWMgPiAwLjI1ICYmIHRoaXMuc2NyZWVuQWZ0ZXIudHlwZSA9PT0gJ3ZpZGVvJyApe1xuICAgICAgdGhpcy5zY3JlZW5BZnRlci5wcmVsb2FkKCk7XG4gICAgfSBcbiAgfVxufVxuXG5wcm90by5yZXNpemUgPSBmdW5jdGlvbigpe1xuICB0aGlzLnNjcm9sbFByb2dyZXNzRnJhYyA9IHRoaXMuc2Nyb2xsUHJvZ3Jlc3MvdGhpcy5zY3JvbGxNYXg7XG4gIHRoaXMuc2Nyb2xsTWF4ID0gKCB0aGlzLnR5cGUgPT09ICdjcmVkaXRzJyApID8gdGhpcy4kZWxlLnNjcm9sbEhlaWdodCA6IHRoaXMuJGVsZS5vZmZzZXRIZWlnaHQ7XG4gIHRoaXMuc2Nyb2xsUHJvZ3Jlc3MgPSB0aGlzLnNjcm9sbFByb2dyZXNzRnJhYyAqIHRoaXMuc2Nyb2xsTWF4O1xufVxuXG5wcm90by51cGRhdGUgPSBmdW5jdGlvbigpe1xuICBpZiggdGhpcy50eXBlID09PSAndmlkZW8nICl7XG4gICAgdGhpcy52aWRlby51cGRhdGUoIHRoaXMuc2Nyb2xsUHJvZ3Jlc3NGcmFjICk7XG4gIH0gIFxuXG4gIHRoaXMuJGNvbnRlbnQuc3R5bGUub3BhY2l0eSA9ICgxIC0gdGhpcy5zY3JvbGxQcm9ncmVzc0ZyYWMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBTY3JlZW47IiwibGV0IFByb2dyZXNzID0gZnVuY3Rpb24oICRlbGUsIGN1cnJlbnRTY3JlZW4sIHN0YWdlSW5kZXggKXtcbiAgdGhpcy4kZWxlID0gJGVsZTtcbiAgdGhpcy4kaW5kaWNhdG9yID0gdGhpcy4kZWxlLnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzcy0taW5kaWNhdG9yJyk7XG4gIHRoaXMuJHN0YWdlcyA9IHRoaXMuJGVsZS5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZ3Jlc3MtLXN0YWdlJyk7XG4gIHRoaXMuc2V0Q3VycmVudCggY3VycmVudFNjcmVlbiwgc3RhZ2VJbmRleCApO1xuICB0aGlzLmluaXRJbnRlcmFjdGlvbigpO1xuICB0aGlzLmhpZGVUaW1lb3V0ID0gZmFsc2U7XG59XG5cbmxldCBwcm90byA9IFByb2dyZXNzLnByb3RvdHlwZTtcblxucHJvdG8uaGlkZSA9IGZ1bmN0aW9uKCBkZWxheSApe1xuICBjbGVhclRpbWVvdXQoIHRoaXMuaGlkZVRpbWVvdXQgKTtcbiAgaWYoIGRlbGF5ICl7XG4gICAgdGhpcy5oaWRlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy4kZWxlLmNsYXNzTGlzdC5hZGQoJ3N0YXRlX19oaWRkZW4nKTtcbiAgICB9LCBkZWxheSApO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuJGVsZS5jbGFzc0xpc3QuYWRkKCdzdGF0ZV9faGlkZGVuJyk7XG4gIH1cbn1cbnByb3RvLnNob3cgPSBmdW5jdGlvbigpe1xuICBjbGVhclRpbWVvdXQoIHRoaXMuaGlkZVRpbWVvdXQgKTtcbiAgdGhpcy4kZWxlLmNsYXNzTGlzdC5yZW1vdmUoJ3N0YXRlX19oaWRkZW4nKTtcbn1cblxucHJvdG8uX29uU3RhZ2VTZWxlY3QgPSBmdW5jdGlvbiggaW5kZXgsIGlkICl7XG4gIGNvbnNvbGUubG9nKCBpbmRleCwgaWQgKTtcbiAgaWYoIHR5cGVvZiB0aGlzLm9uU3RhZ2VTZWxlY3QgPT09ICdmdW5jdGlvbicgKXtcbiAgICB0aGlzLm9uU3RhZ2VTZWxlY3QoIGluZGV4LCBpZCApO1xuICB9XG59XG5cbnByb3RvLmluaXRJbnRlcmFjdGlvbiA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuJGVsZS5xdWVyeVNlbGVjdG9yQWxsKCdhJykuZm9yRWFjaCgoICRhLCBpICApID0+IHtcbiAgICAkYS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGxldCBpZCA9ICRhLmhyZWYucmVwbGFjZSh3aW5kb3cubG9jYXRpb24ub3JpZ2luLCcnKS5yZXBsYWNlKCcvJywgJycpLnJlcGxhY2UoJyMnLCcnKTtcbiAgICAgIHRoaXMuX29uU3RhZ2VTZWxlY3QoIGksIGlkICk7XG4gICAgfSk7XG4gIH0pO1xuICBcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKCkgPT4ge1xuICAgIGNsZWFyVGltZW91dCggdGhpcy5oaWRlVGltZW91dCApO1xuICAgIHRoaXMuc2hvdygpO1xuICAgIGlmKCB0aGlzLmN1cnJlbnRTY3JlZW4udHlwZSA9PT0gJ3ZpZGVvJyApe1xuICAgICAgdGhpcy5oaWRlKCAxNTAwICk7XG4gICAgfVxuICB9KVxufTtcblxucHJvdG8uc2V0Q3VycmVudCA9IGZ1bmN0aW9uKCBjdXJyZW50U2NyZWVuLCBzdGFnZUluZGV4ICl7XG4gIHRoaXMuY3VycmVudFNjcmVlbiA9IGN1cnJlbnRTY3JlZW47XG4gIHRoaXMuJGN1cnJlbnRTdGFnZSA9IHRoaXMuJHN0YWdlc1sgc3RhZ2VJbmRleCBdO1xuICB0aGlzLm1vdmVJbmRpY2F0b3IoKTtcbiAgaWYoIHRoaXMuY3VycmVudFNjcmVlbi50eXBlID09PSAndmlkZW8nICl7XG4gICAgdGhpcy5oaWRlKCA2MDAgKTtcbiAgICB0aGlzLmN1cnJlbnRTY3JlZW4ub25Qcm9ncmVzcyA9ICgpID0+IHtcbiAgICAgIHRoaXMubW92ZUluZGljYXRvcigpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLnNob3coKTtcbiAgfVxufVxuXG5wcm90by5tb3ZlSW5kaWNhdG9yID0gZnVuY3Rpb24oKXtcbiAgbGV0IHRyYW5zbGF0ZVggPSAwO1xuICBpZiggdGhpcy5jdXJyZW50U2NyZWVuLnR5cGUgPT09ICd2aWRlbycgKXtcbiAgICBsZXQgcHJvZ3Jlc3MgPSB0aGlzLmN1cnJlbnRTY3JlZW4udmlkZW8uZ2V0UHJvZ3Jlc3MoKTtcbiAgICBsZXQgeCA9IHRoaXMuJGN1cnJlbnRTdGFnZS5vZmZzZXRMZWZ0O1xuICAgIGxldCBtYXggPSB0aGlzLiRjdXJyZW50U3RhZ2Uub2Zmc2V0V2lkdGg7XG4gICAgdHJhbnNsYXRlWCA9IHggKyAocHJvZ3Jlc3MgKiBtYXgpOyAgICBcbiAgfSBlbHNlIHtcbiAgICB0cmFuc2xhdGVYID0gdGhpcy4kY3VycmVudFN0YWdlLm9mZnNldExlZnQ7XG4gIH1cbiAgdGhpcy4kaW5kaWNhdG9yLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyB0cmFuc2xhdGVYICsgJ3B4KSc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2dyZXNzOyIsImltcG9ydCBTY3JlZW4gZnJvbSBcIi4vbW9kdWxlcy9TY3JlZW4uanNcIjtcbmltcG9ydCBQcm9ncmVzcyBmcm9tIFwiLi9tb2R1bGVzL1Byb2dyZXNzLmpzXCI7XG5cbmxldCBzY3JlZW5zID0gW107XG5kb2N1bWVudFxuICAucXVlcnlTZWxlY3RvckFsbCgnLnNjcmVlbicpXG4gIC5mb3JFYWNoKGZ1bmN0aW9uKCAkcyApe1xuICAgIHNjcmVlbnMucHVzaCggbmV3IFNjcmVlbiggJHMgKSApO1xuICB9KTtcblxuZm9yKCBsZXQgaSA9IDA7IGkgPCBzY3JlZW5zLmxlbmd0aDsgaSsrICl7XG4gIGxldCBiZWZvcmUgPSBpID4gMCA/IHNjcmVlbnNbaS0xXSA6IGZhbHNlO1xuICBsZXQgYWZ0ZXIgPSBpIDwgc2NyZWVucy5sZW5ndGggLSAxID8gc2NyZWVuc1tpKzFdIDogZmFsc2U7ICBcbiAgc2NyZWVuc1tpXS5saW5rVG9PdGhlcnMoIGJlZm9yZSwgYWZ0ZXIgKTtcbn1cblxud2luZG93LnNjcmVlbnMgPSBzY3JlZW5zO1xuXG5sZXQgY3VycmVudFNjcmVlbkluZGV4ID0gMDtcbmxldCBwU2NyZWVuSW5kZXggPSAwO1xubGV0IGN1cnJlbnRTdGFnZUluZGV4ID0gTWF0aC5mbG9vciggY3VycmVudFNjcmVlbkluZGV4IC8gMiApO1xubGV0IGN1cnJlbnRTY3JlZW4gPSBzY3JlZW5zW2N1cnJlbnRTY3JlZW5JbmRleF07XG5cbmxldCBwcm9ncmVzcyA9IG5ldyBQcm9ncmVzcyggZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2dyZXNzLS1iYXInKSwgY3VycmVudFNjcmVlbiAsIGN1cnJlbnRTdGFnZUluZGV4ICk7XG5cbmxldCBzdGFnZVNlbGVjdFRpbWVvdXQgPSBmYWxzZTtcbnByb2dyZXNzLm9uU3RhZ2VTZWxlY3QgPSBmdW5jdGlvbiggaW5kZXgsIGlkICl7XG4gIGlmKCBpbmRleCAhPT0gY3VycmVudFN0YWdlSW5kZXggKXtcbiAgICBjdXJyZW50U2NyZWVuLmRlYWN0aXZhdGUoKTtcbiAgICBzdGFnZVNlbGVjdFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBjdXJyZW50U2NyZWVuSW5kZXggPSBpbmRleCAqIDI7XG4gICAgICBjdXJyZW50U3RhZ2VJbmRleCA9IGluZGV4O1xuICAgICAgY3VycmVudFNjcmVlbiA9IHNjcmVlbnNbY3VycmVudFNjcmVlbkluZGV4XTtcbiAgICAgIGN1cnJlbnRTY3JlZW4uYWN0aXZhdGUoKTtcbiAgICAgIHByb2dyZXNzLnNldEN1cnJlbnQoIGN1cnJlbnRTY3JlZW4sIGN1cnJlbnRTdGFnZUluZGV4ICk7XG4gICAgfSwgMzAwICk7XG4gIH1cbn1cblxuY3VycmVudFNjcmVlbi5hY3RpdmF0ZSgpO1xuXG5cblxuZm9yKCBsZXQgaSA9IDA7IGkgPCBzY3JlZW5zLmxlbmd0aDsgaSsrICl7XG4gIHNjcmVlbnNbaV0udXBkYXRlKCk7XG59XG5cbmxldCBpc1Njcm9sbGluZztcbmxldCBzY3JvbGxCcmVhayA9IGZhbHNlO1xuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgZnVuY3Rpb24oIGUgKXtcbiAgd2luZG93LmNsZWFyVGltZW91dCggaXNTY3JvbGxpbmcgKTtcbiAgaXNTY3JvbGxpbmcgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdHNjcm9sbEJyZWFrID0gZmFsc2U7XG5cdH0sIDIwMCApO1xuXG4gIGlmKCAhc2Nyb2xsQnJlYWsgKXtcbiAgICBjdXJyZW50U2NyZWVuLnNjcm9sbCggZS5kZWx0YVkgKTtcbiAgICBjdXJyZW50U2NyZWVuLnVwZGF0ZSgpO1xuICB9XG5cbiAgZm9yKCBsZXQgaSA9IDA7IGkgPCBzY3JlZW5zLmxlbmd0aDsgaSsrICl7XG4gICAgaWYoIHNjcmVlbnNbaV0uYWN0aXZlICl7XG4gICAgICBjdXJyZW50U2NyZWVuSW5kZXggPSBpO1xuICAgICAgY3VycmVudFN0YWdlSW5kZXggPSBNYXRoLmZsb29yKCBjdXJyZW50U2NyZWVuSW5kZXggLyAyICk7XG4gICAgICBjdXJyZW50U2NyZWVuID0gc2NyZWVuc1tpXTtcbiAgICB9XG4gIH1cblxuICBpZiggY3VycmVudFNjcmVlbkluZGV4ICE9PSBwU2NyZWVuSW5kZXggKXtcbiAgICBwcm9ncmVzcy5zZXRDdXJyZW50KCBjdXJyZW50U2NyZWVuLCBjdXJyZW50U3RhZ2VJbmRleCApO1xuICAgIHNjcm9sbEJyZWFrID0gdHJ1ZTtcbiAgfVxuICBcbiAgcFNjcmVlbkluZGV4ID0gY3VycmVudFNjcmVlbkluZGV4O1xufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n")}]);