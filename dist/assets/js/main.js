!function(n){var e={};function t(c){if(e[c])return e[c].exports;var l=e[c]={i:c,l:!1,exports:{}};return n[c].call(l.exports,l,l.exports,t),l.l=!0,l.exports}t.m=n,t.c=e,t.d=function(n,e,c){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:c})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var c=Object.create(null);if(t.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var l in n)t.d(c,l,function(e){return n[e]}.bind(null,l));return c},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=0)}([function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n\n// CONCATENATED MODULE: ./src/modules/Video.js\n//ensure <script src=\"https://player.vimeo.com/api/player.js\"><\/script> is included on page\n\nlet Video = function( id, $ele ){\n  let opts = {\n    id: id,\n    width: window.innerWidth,\n    autoplay: false,\n    controls: false,\n    muted: true\n  };\n  this.vimeo = new Vimeo.Player( $ele, opts );\n  this.volume = 0;\n  this.vimeo.setVolume( this.volume );\n  this.progress = 0;\n  this.length = 0;\n  this.vimeo.getDuration().then(duration => this.length = duration);  \n  this.fadeLoop = false;\n  this.vimeo.on('ended', ( ) => {\n    console.log('vimeo says ended')\n    this._onEnded();\n  });\n  this.vimeo.on('timeupdate', ( t ) => {\n    this.progress = t.seconds / t.duration;\n    if( typeof this.onProgress === 'function' ){\n      this.onProgress();\n    }\n    if( t.seconds >= t.duration - 2 ){\n      console.log( 'less than 2 seconds to end' );\n      this._onEnded();\n    }\n  });\n}\n\nlet proto = Video.prototype;\n\nproto._onEnded = function(){\n  console.log('Video() - _onEnded()');\n  if( typeof this.onEnded === 'function' ){\n    this.onEnded();\n  }\n}\n\nproto.play = function(){\n  this.vimeo.play();\n}\n\nproto.pause = function(){\n  this.vimeo.pause();\n}\n\nproto.getProgress = function(){\n  return this.progress;\n}\n\nproto._onFadedIn = function(){\n  if( typeof this.onFadedIn === 'function' ){\n    this.onFadedIn();\n  }\n}\n\nproto.fadeIn = function( _time, _callback ){  \n  let time = _time || 100;\n  let callback = _callback || function(){};\n  clearInterval( this.fadeLoop );\n  let change = 1 - this.volume;\n  let step = change / (time / 10);\n  this.fadeLoop = setInterval(() => {\n    this.volume += step;\n    if( this.volume >= 1 ){\n      this.volume = 1; \n      this._onFadedIn();\n      callback();\n      clearInterval( this.fadeLoop );\n    }    \n    this.vimeo.setVolume( this.volume );\n  }, 10 );\n};\n\nproto._onFadedOut = function(){\n  if( typeof this.onFadedOut === 'function' ){\n    this.onFadedOut();\n  }\n}\n\nproto.fadeOut = function( _time, _callback ){  \n  let time = _time || 100;\n  let callback = _callback || function(){};  \n  clearInterval( this.fadeLoop );\n  let change = -this.volume;\n  let step = change / (time / 10);  \n  console.log( 'from', this.volume, ' fadeout: ', change, step );\n  this.fadeLoop = setInterval(() => {\n    this.volume += step;\n    if( this.volume <= 0 ){\n      this.volume = 0; \n      this._onFadedOut();\n      callback();\n      clearInterval( this.fadeLoop );\n    }\n    this.vimeo.setVolume( this.volume );\n  }, 10 );\n};\n\nproto.update = function( fraction ){\n\n}\n/* harmony default export */ var modules_Video = (Video);\n// CONCATENATED MODULE: ./src/modules/Screen.js\n\n\nlet Screen = function( $ele ){\n  this.$ele = $ele;\n  this.$content = $ele.querySelector('.screen--content');\n  this.active = false;\n  this.type = '';\n  if( this.$ele.classList.contains( 'screen__text__credits' ) ){\n      this.type = 'credits';\n  } else if( this.$ele.classList.contains( 'screen__video' ) ){\n    this.type = 'video';    \n    this.video = new modules_Video( this.$content.dataset.vimeo_id, this.$content );\n    this.video.onProgress = () => {\n      this._onProgress();\n    };\n    this.video.onEnded = () => {\n      this.deactivate();\n      this.screenAfter.activate();\n    }\n  } else {\n    this.type = 'text';\n  }\n  this.scrollProgress = 0;\n  this.scrollProgressFrac = 0;\n  this.scrollMax = ( this.type === 'credits' ) ? this.$ele.scrollHeight : this.$ele.offsetHeight*0.65;  \n  this.scrollMin = ( this.type === 'credits' ) ? this.$ele.offsetHeight * -0.1 : 0;\n}\n\nlet Screen_proto = Screen.prototype;\n\nScreen_proto.linkToOthers = function( before, after ){\n  this.screenBefore = before;\n  this.screenAfter = after;\n}\n\nScreen_proto._onProgress = function(){\n  if( typeof this.onProgress === 'function' && this.active ){\n    this.onProgress();\n  }\n}\n\nScreen_proto._onActivated = function(){\n  if( typeof this.onActivated === 'function' ){\n    this.onActivated( this );\n  }\n}\n\nScreen_proto._onActivateStart = function(){\n  if( typeof this.onActivateStart === 'function' ){\n    this.onActivateStart( this );\n  }\n}\n\nScreen_proto.preload = function(){\n  if( this.type === 'video' ){\n    this.video.play();    \n  }\n}\n\nScreen_proto.activate = function( _callback ){\n  let callback = _callback || function(){};\n  this._onActivateStart();\n  this.active = true;\n  this.$ele.classList.add( 'active' );\n  this.scrollProgress = 0;\n  this.scrollProgressFrac = 0;  \n  if( this.type === 'video' ){\n    this.video.play();\n    this.video.fadeIn(1500, () => {\n      this._onActivated();\n      callback();\n    });    \n  } else if( this.type === 'credits' ){\n    this.$content.scrollTop = 0;\n    this._onActivated();\n    callback();\n  } else {\n    this._onActivated();\n    callback();\n  }\n  this.update();\n}\n\nScreen_proto.deactivate = function( _callback ){\n  let callback = _callback || function(){};\n  this.active = false;\n  this.$ele.classList.remove('active');\n  if( this.type === 'video' ){\n    this.video.fadeOut( 1500, () => {\n      this.video.pause();\n      callback();\n    });\n  } else{\n    callback();\n  }\n}\n\n\nScreen_proto.scroll = function( delta ){\n  if( this.active ){\n    this.scrollProgress += delta;\n    if( this.scrollProgress < this.scrollMin -10 ){\n      this.scrollProgress = this.scrollMin -10;\n    } else if( this.scrollProgress > this.scrollMax + 10 ){\n      this.scrollProgress = this.scrollMax + 10;\n    }\n    this.scrollProgressFrac = this.scrollProgress/this.scrollMax;\n    if( this.scrollProgressFrac > 0.75 && this.screenAfter ){\n      this.deactivate( () => {\n        this.screenAfter.activate();\n      });      \n    } else if( this.scrollProgressFrac < this.scrollMin / this.scrollMax && this.screenBefore ){\n      this.deactivate( () => {\n        this.screenBefore.activate();\n      });      \n    }\n    if( this.scrollProgressFrac > 0.25 && this.screenAfter.type === 'video' ){\n      this.screenAfter.preload();\n    } \n  }\n}\n\nScreen_proto.resize = function(){\n  this.scrollProgressFrac = this.scrollProgress/this.scrollMax;\n  this.scrollMax = ( this.type === 'credits' ) ? this.$ele.scrollHeight : this.$ele.offsetHeight;\n  this.scrollProgress = this.scrollProgressFrac * this.scrollMax;\n}\n\nScreen_proto.update = function(){\n  if( this.type === 'video' ){\n    this.video.update( this.scrollProgressFrac );\n    if( this.scrollProgressFrac > 0.75 ){\n      this.$content.style.opacity = (0.25 - (this.scrollProgressFrac - 0.75)) * (1/0.25);\n    } else {\n      this.$content.style.opacity = 1;\n    }\n  } else {\n    this.$content.style.opacity = (1 - this.scrollProgressFrac);\n  }\n\n  \n}\n\n/* harmony default export */ var modules_Screen = (Screen);\n// CONCATENATED MODULE: ./src/modules/Progress.js\nlet Progress = function( $ele, currentScreen, stageIndex ){\n  this.$ele = $ele;\n  this.$indicator = this.$ele.querySelector('.progress--indicator');\n  this.$stages = this.$ele.querySelectorAll('.progress--stage');\n  this.setIndicatorTransition( false );\n  this.setCurrent( currentScreen, stageIndex );\n  this.initInteraction();\n  this.hideTimeout = false;\n  this.hideDelay = 3000;\n}\n\nlet Progress_proto = Progress.prototype;\n\nProgress_proto.hide = function( delay ){\n  clearTimeout( this.hideTimeout );\n  if( delay ){\n    this.hideTimeout = setTimeout(() => {\n      this.$ele.classList.add('state__hidden');\n    }, delay );\n  } else {\n    this.$ele.classList.add('state__hidden');\n  }\n}\nProgress_proto.show = function(){\n  clearTimeout( this.hideTimeout );\n  this.$ele.classList.remove('state__hidden');\n}\n\nProgress_proto._onStageSelect = function( index, id ){\n  if( typeof this.onStageSelect === 'function' ){\n    this.onStageSelect( index, id );\n  }\n}\n\nProgress_proto.initInteraction = function(){\n  this.$ele.querySelectorAll('a').forEach(( $a, i  ) => {\n    $a.addEventListener('click', () => {\n      let id = $a.href.replace(window.location.origin,'').replace('/', '').replace('#','');\n      this._onStageSelect( i, id );\n    });\n  });\n  \n  document.addEventListener('mousemove', () => {\n    clearTimeout( this.hideTimeout );\n    this.show();\n    if( this.currentScreen.type === 'video' ){\n      this.hide( this.hideDelay );\n    }\n  });\n  document.addEventListener('wheel', ( e ) => {\n    console.log('wheeeeel');\n    clearTimeout( this.hideTimeout );\n    this.show();\n    if( this.currentScreen.type === 'video' ){\n      this.hide( this.hideDelay );\n    }\n  });\n};\n\nProgress_proto.setCurrent = function( currentScreen, stageIndex ){\n  this.currentScreen = currentScreen;\n  this.$currentStage = this.$stages[ stageIndex ];\n  this.moveIndicator();\n  if( this.currentScreen.type === 'video' ){\n    this.hide( this.hideDelay );\n    this.currentScreen.onProgress = () => {\n      this.moveIndicator();\n    }\n  } else {\n    this.show();\n  }\n}\n\nProgress_proto.setIndicatorTransition = function( to, delay ){\n  clearTimeout( this.indicatorTransitionToggleTimeout );\n  if( !!delay && delay > 0 ){\n    this.indicatorTransitionToggleTimeout = setTimeout(() => {\n      if( to ){\n        this.$indicator.classList.add('transition-active');\n      } else {\n        this.$indicator.classList.remove('transition-active');\n      }\n    }, delay )\n  } else {\n    if( to ){\n      this.$indicator.classList.add('transition-active');\n    } else {\n      this.$indicator.classList.remove('transition-active');\n    }\n  }\n  this.indicatorTransition = to;\n}\n\nProgress_proto.moveIndicator = function(){\n  let translateX = 0;\n  if( this.currentScreen.type === 'video' ){\n    let progress = this.currentScreen.video.getProgress();\n    let x = this.$currentStage.offsetLeft;\n    let max = this.$currentStage.offsetWidth;\n    translateX = x + (progress * max);    \n  } else {\n    translateX = this.$currentStage.offsetLeft;\n  }\n  this.$indicator.style.transform = 'translateX(' + translateX + 'px)';\n}\n\n/* harmony default export */ var modules_Progress = (Progress);\n// CONCATENATED MODULE: ./src/modules/Controls.js\nlet Controls = function( $ele ){\n  this.$ele = $ele;\n  this.$fullscreen = this.$ele.querySelector('.fullscreen');\n  this.$mute = this.$ele.querySelector('.mute')\n  this.$subs = this.$ele.querySelector('.subtitles')\n\n  this.$fullscreen.addEventListener( 'click', function(){\n    if (!document.fullscreenElement) {\n      document.querySelector('.site-wrap')\n        .requestFullscreen({ navigationUI: \"hide\" })\n        .catch( ( err ) => {\n          alert('no fullscreen');\n        })\n    } else {\n      document.exitFullscreen();\n    }\n  });\n}\n\n\n\nlet Controls_proto = Controls.prototype;\n\n/* harmony default export */ var modules_Controls = (Controls);\n// CONCATENATED MODULE: ./src/main.js\n\n\n\n\nlet screens = [];\ndocument\n  .querySelectorAll('.screen')\n  .forEach(function( $s ){\n    screens.push( new modules_Screen( $s ) );\n  });\n\nfor( let i = 0; i < screens.length; i++ ){\n  let before = i > 0 ? screens[i-1] : false;\n  let after = i < screens.length - 1 ? screens[i+1] : false;  \n  screens[i].linkToOthers( before, after ); \n}\n\nwindow.screens = screens;\n\nlet currentScreenIndex = 0;\nlet pScreenIndex = 0;\nlet currentStageIndex = Math.floor( currentScreenIndex / 2 );\nlet currentScreen = screens[currentScreenIndex];\n\nlet progress = new modules_Progress( document.querySelector('.progress--bar'), currentScreen , currentStageIndex );\nlet controls = new modules_Controls( document.querySelector('.controls') );\n\n\nlet stageSelectTimeout = false;\nprogress.onStageSelect = function( index, id ){\n  if( index !== currentStageIndex ){\n    clearTimeout(stageSelectTimeout);\n    currentScreen.deactivate();\n    progress.setIndicatorTransition( true );\n    stageSelectTimeout = setTimeout(function(){\n      currentScreenIndex = index * 2;\n      currentStageIndex = index;\n      currentScreen = screens[currentScreenIndex];\n      currentScreen.activate();\n      progress.setCurrent( currentScreen, currentStageIndex );\n      progress.setIndicatorTransition( false, 1500 );\n    }, 300 );\n  }\n}\n\ncurrentScreen.activate();\n\nfor( let i = 0; i < screens.length; i++ ){\n  screens[i].update();\n  (function( index ){\n    screens[index].onActivateStart = function( s ){\n      currentScreenIndex = index;\n      currentStageIndex = Math.floor( currentScreenIndex / 2 );\n      currentScreen = screens[index];        \n      progress.setIndicatorTransition( true );\n      progress.setIndicatorTransition( false, 1500 );\n      progress.setCurrent( currentScreen, currentStageIndex );\n    };\n    screens[index].onActivated = function( s ){\n         \n      if( s.type === 'video' ){\n        progress.hide();\n      } else {\n        progress.show();      \n      }\n    }\n  })(i);\n}\n\nlet isScrolling;\nlet scrollBreak = false;\n\n\ndocument.addEventListener('wheel', function( e ){\n  window.clearTimeout( isScrolling );\n  isScrolling = setTimeout(function() {\n\t\tscrollBreak = false;\n\t}, 200 );\n\n  if( !scrollBreak ){\n    currentScreen.scroll( e.deltaY );\n    currentScreen.update();\n  }\n  for( let i = 0; i < screens.length; i++ ){\n    if( screens[i].active ){\n      currentScreenIndex = i;\n      currentStageIndex = Math.floor( currentScreenIndex / 2 );\n      currentScreen = screens[i];\n    }\n  }\n\n  if( currentScreenIndex !== pScreenIndex ){\n    progress.setCurrent( currentScreen, currentStageIndex );\n    scrollBreak = true;\n  }\n  \n  pScreenIndex = currentScreenIndex;\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbW9kdWxlcy9WaWRlby5qcz85ZDdiIiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL1NjcmVlbi5qcz8zYTg0Iiwid2VicGFjazovLy8uL3NyYy9tb2R1bGVzL1Byb2dyZXNzLmpzPzJiZTIiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvQ29udHJvbHMuanM/M2NkZSIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcz81NmQ3Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw2QztBQUNBO0FBQ0EsMkM7QUFDQTtBQUNBO0FBQ0Esa0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNlLHVEQUFLLEU7O0FDMUdXOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCx3QjtBQUNBLHFCQUFxQixhQUFLO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QTtBQUNBLHFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQLHdCO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsb0JBQW9CO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUMiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vZW5zdXJlIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly9wbGF5ZXIudmltZW8uY29tL2FwaS9wbGF5ZXIuanNcIj48L3NjcmlwdD4gaXMgaW5jbHVkZWQgb24gcGFnZVxuXG5sZXQgVmlkZW8gPSBmdW5jdGlvbiggaWQsICRlbGUgKXtcbiAgbGV0IG9wdHMgPSB7XG4gICAgaWQ6IGlkLFxuICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgY29udHJvbHM6IGZhbHNlLFxuICAgIG11dGVkOiB0cnVlXG4gIH07XG4gIHRoaXMudmltZW8gPSBuZXcgVmltZW8uUGxheWVyKCAkZWxlLCBvcHRzICk7XG4gIHRoaXMudm9sdW1lID0gMDtcbiAgdGhpcy52aW1lby5zZXRWb2x1bWUoIHRoaXMudm9sdW1lICk7XG4gIHRoaXMucHJvZ3Jlc3MgPSAwO1xuICB0aGlzLmxlbmd0aCA9IDA7XG4gIHRoaXMudmltZW8uZ2V0RHVyYXRpb24oKS50aGVuKGR1cmF0aW9uID0+IHRoaXMubGVuZ3RoID0gZHVyYXRpb24pOyAgXG4gIHRoaXMuZmFkZUxvb3AgPSBmYWxzZTtcbiAgdGhpcy52aW1lby5vbignZW5kZWQnLCAoICkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCd2aW1lbyBzYXlzIGVuZGVkJylcbiAgICB0aGlzLl9vbkVuZGVkKCk7XG4gIH0pO1xuICB0aGlzLnZpbWVvLm9uKCd0aW1ldXBkYXRlJywgKCB0ICkgPT4ge1xuICAgIHRoaXMucHJvZ3Jlc3MgPSB0LnNlY29uZHMgLyB0LmR1cmF0aW9uO1xuICAgIGlmKCB0eXBlb2YgdGhpcy5vblByb2dyZXNzID09PSAnZnVuY3Rpb24nICl7XG4gICAgICB0aGlzLm9uUHJvZ3Jlc3MoKTtcbiAgICB9XG4gICAgaWYoIHQuc2Vjb25kcyA+PSB0LmR1cmF0aW9uIC0gMiApe1xuICAgICAgY29uc29sZS5sb2coICdsZXNzIHRoYW4gMiBzZWNvbmRzIHRvIGVuZCcgKTtcbiAgICAgIHRoaXMuX29uRW5kZWQoKTtcbiAgICB9XG4gIH0pO1xufVxuXG5sZXQgcHJvdG8gPSBWaWRlby5wcm90b3R5cGU7XG5cbnByb3RvLl9vbkVuZGVkID0gZnVuY3Rpb24oKXtcbiAgY29uc29sZS5sb2coJ1ZpZGVvKCkgLSBfb25FbmRlZCgpJyk7XG4gIGlmKCB0eXBlb2YgdGhpcy5vbkVuZGVkID09PSAnZnVuY3Rpb24nICl7XG4gICAgdGhpcy5vbkVuZGVkKCk7XG4gIH1cbn1cblxucHJvdG8ucGxheSA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMudmltZW8ucGxheSgpO1xufVxuXG5wcm90by5wYXVzZSA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMudmltZW8ucGF1c2UoKTtcbn1cblxucHJvdG8uZ2V0UHJvZ3Jlc3MgPSBmdW5jdGlvbigpe1xuICByZXR1cm4gdGhpcy5wcm9ncmVzcztcbn1cblxucHJvdG8uX29uRmFkZWRJbiA9IGZ1bmN0aW9uKCl7XG4gIGlmKCB0eXBlb2YgdGhpcy5vbkZhZGVkSW4gPT09ICdmdW5jdGlvbicgKXtcbiAgICB0aGlzLm9uRmFkZWRJbigpO1xuICB9XG59XG5cbnByb3RvLmZhZGVJbiA9IGZ1bmN0aW9uKCBfdGltZSwgX2NhbGxiYWNrICl7ICBcbiAgbGV0IHRpbWUgPSBfdGltZSB8fCAxMDA7XG4gIGxldCBjYWxsYmFjayA9IF9jYWxsYmFjayB8fCBmdW5jdGlvbigpe307XG4gIGNsZWFySW50ZXJ2YWwoIHRoaXMuZmFkZUxvb3AgKTtcbiAgbGV0IGNoYW5nZSA9IDEgLSB0aGlzLnZvbHVtZTtcbiAgbGV0IHN0ZXAgPSBjaGFuZ2UgLyAodGltZSAvIDEwKTtcbiAgdGhpcy5mYWRlTG9vcCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICB0aGlzLnZvbHVtZSArPSBzdGVwO1xuICAgIGlmKCB0aGlzLnZvbHVtZSA+PSAxICl7XG4gICAgICB0aGlzLnZvbHVtZSA9IDE7IFxuICAgICAgdGhpcy5fb25GYWRlZEluKCk7XG4gICAgICBjYWxsYmFjaygpO1xuICAgICAgY2xlYXJJbnRlcnZhbCggdGhpcy5mYWRlTG9vcCApO1xuICAgIH0gICAgXG4gICAgdGhpcy52aW1lby5zZXRWb2x1bWUoIHRoaXMudm9sdW1lICk7XG4gIH0sIDEwICk7XG59O1xuXG5wcm90by5fb25GYWRlZE91dCA9IGZ1bmN0aW9uKCl7XG4gIGlmKCB0eXBlb2YgdGhpcy5vbkZhZGVkT3V0ID09PSAnZnVuY3Rpb24nICl7XG4gICAgdGhpcy5vbkZhZGVkT3V0KCk7XG4gIH1cbn1cblxucHJvdG8uZmFkZU91dCA9IGZ1bmN0aW9uKCBfdGltZSwgX2NhbGxiYWNrICl7ICBcbiAgbGV0IHRpbWUgPSBfdGltZSB8fCAxMDA7XG4gIGxldCBjYWxsYmFjayA9IF9jYWxsYmFjayB8fCBmdW5jdGlvbigpe307ICBcbiAgY2xlYXJJbnRlcnZhbCggdGhpcy5mYWRlTG9vcCApO1xuICBsZXQgY2hhbmdlID0gLXRoaXMudm9sdW1lO1xuICBsZXQgc3RlcCA9IGNoYW5nZSAvICh0aW1lIC8gMTApOyAgXG4gIGNvbnNvbGUubG9nKCAnZnJvbScsIHRoaXMudm9sdW1lLCAnIGZhZGVvdXQ6ICcsIGNoYW5nZSwgc3RlcCApO1xuICB0aGlzLmZhZGVMb29wID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIHRoaXMudm9sdW1lICs9IHN0ZXA7XG4gICAgaWYoIHRoaXMudm9sdW1lIDw9IDAgKXtcbiAgICAgIHRoaXMudm9sdW1lID0gMDsgXG4gICAgICB0aGlzLl9vbkZhZGVkT3V0KCk7XG4gICAgICBjYWxsYmFjaygpO1xuICAgICAgY2xlYXJJbnRlcnZhbCggdGhpcy5mYWRlTG9vcCApO1xuICAgIH1cbiAgICB0aGlzLnZpbWVvLnNldFZvbHVtZSggdGhpcy52b2x1bWUgKTtcbiAgfSwgMTAgKTtcbn07XG5cbnByb3RvLnVwZGF0ZSA9IGZ1bmN0aW9uKCBmcmFjdGlvbiApe1xuXG59XG5leHBvcnQgZGVmYXVsdCBWaWRlbzsiLCJpbXBvcnQgVmlkZW8gZnJvbSBcIi4vVmlkZW8uanNcIjtcblxubGV0IFNjcmVlbiA9IGZ1bmN0aW9uKCAkZWxlICl7XG4gIHRoaXMuJGVsZSA9ICRlbGU7XG4gIHRoaXMuJGNvbnRlbnQgPSAkZWxlLnF1ZXJ5U2VsZWN0b3IoJy5zY3JlZW4tLWNvbnRlbnQnKTtcbiAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgdGhpcy50eXBlID0gJyc7XG4gIGlmKCB0aGlzLiRlbGUuY2xhc3NMaXN0LmNvbnRhaW5zKCAnc2NyZWVuX190ZXh0X19jcmVkaXRzJyApICl7XG4gICAgICB0aGlzLnR5cGUgPSAnY3JlZGl0cyc7XG4gIH0gZWxzZSBpZiggdGhpcy4kZWxlLmNsYXNzTGlzdC5jb250YWlucyggJ3NjcmVlbl9fdmlkZW8nICkgKXtcbiAgICB0aGlzLnR5cGUgPSAndmlkZW8nOyAgICBcbiAgICB0aGlzLnZpZGVvID0gbmV3IFZpZGVvKCB0aGlzLiRjb250ZW50LmRhdGFzZXQudmltZW9faWQsIHRoaXMuJGNvbnRlbnQgKTtcbiAgICB0aGlzLnZpZGVvLm9uUHJvZ3Jlc3MgPSAoKSA9PiB7XG4gICAgICB0aGlzLl9vblByb2dyZXNzKCk7XG4gICAgfTtcbiAgICB0aGlzLnZpZGVvLm9uRW5kZWQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmRlYWN0aXZhdGUoKTtcbiAgICAgIHRoaXMuc2NyZWVuQWZ0ZXIuYWN0aXZhdGUoKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhpcy50eXBlID0gJ3RleHQnO1xuICB9XG4gIHRoaXMuc2Nyb2xsUHJvZ3Jlc3MgPSAwO1xuICB0aGlzLnNjcm9sbFByb2dyZXNzRnJhYyA9IDA7XG4gIHRoaXMuc2Nyb2xsTWF4ID0gKCB0aGlzLnR5cGUgPT09ICdjcmVkaXRzJyApID8gdGhpcy4kZWxlLnNjcm9sbEhlaWdodCA6IHRoaXMuJGVsZS5vZmZzZXRIZWlnaHQqMC42NTsgIFxuICB0aGlzLnNjcm9sbE1pbiA9ICggdGhpcy50eXBlID09PSAnY3JlZGl0cycgKSA/IHRoaXMuJGVsZS5vZmZzZXRIZWlnaHQgKiAtMC4xIDogMDtcbn1cblxubGV0IHByb3RvID0gU2NyZWVuLnByb3RvdHlwZTtcblxucHJvdG8ubGlua1RvT3RoZXJzID0gZnVuY3Rpb24oIGJlZm9yZSwgYWZ0ZXIgKXtcbiAgdGhpcy5zY3JlZW5CZWZvcmUgPSBiZWZvcmU7XG4gIHRoaXMuc2NyZWVuQWZ0ZXIgPSBhZnRlcjtcbn1cblxucHJvdG8uX29uUHJvZ3Jlc3MgPSBmdW5jdGlvbigpe1xuICBpZiggdHlwZW9mIHRoaXMub25Qcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGlzLmFjdGl2ZSApe1xuICAgIHRoaXMub25Qcm9ncmVzcygpO1xuICB9XG59XG5cbnByb3RvLl9vbkFjdGl2YXRlZCA9IGZ1bmN0aW9uKCl7XG4gIGlmKCB0eXBlb2YgdGhpcy5vbkFjdGl2YXRlZCA9PT0gJ2Z1bmN0aW9uJyApe1xuICAgIHRoaXMub25BY3RpdmF0ZWQoIHRoaXMgKTtcbiAgfVxufVxuXG5wcm90by5fb25BY3RpdmF0ZVN0YXJ0ID0gZnVuY3Rpb24oKXtcbiAgaWYoIHR5cGVvZiB0aGlzLm9uQWN0aXZhdGVTdGFydCA9PT0gJ2Z1bmN0aW9uJyApe1xuICAgIHRoaXMub25BY3RpdmF0ZVN0YXJ0KCB0aGlzICk7XG4gIH1cbn1cblxucHJvdG8ucHJlbG9hZCA9IGZ1bmN0aW9uKCl7XG4gIGlmKCB0aGlzLnR5cGUgPT09ICd2aWRlbycgKXtcbiAgICB0aGlzLnZpZGVvLnBsYXkoKTsgICAgXG4gIH1cbn1cblxucHJvdG8uYWN0aXZhdGUgPSBmdW5jdGlvbiggX2NhbGxiYWNrICl7XG4gIGxldCBjYWxsYmFjayA9IF9jYWxsYmFjayB8fCBmdW5jdGlvbigpe307XG4gIHRoaXMuX29uQWN0aXZhdGVTdGFydCgpO1xuICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gIHRoaXMuJGVsZS5jbGFzc0xpc3QuYWRkKCAnYWN0aXZlJyApO1xuICB0aGlzLnNjcm9sbFByb2dyZXNzID0gMDtcbiAgdGhpcy5zY3JvbGxQcm9ncmVzc0ZyYWMgPSAwOyAgXG4gIGlmKCB0aGlzLnR5cGUgPT09ICd2aWRlbycgKXtcbiAgICB0aGlzLnZpZGVvLnBsYXkoKTtcbiAgICB0aGlzLnZpZGVvLmZhZGVJbigxNTAwLCAoKSA9PiB7XG4gICAgICB0aGlzLl9vbkFjdGl2YXRlZCgpO1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9KTsgICAgXG4gIH0gZWxzZSBpZiggdGhpcy50eXBlID09PSAnY3JlZGl0cycgKXtcbiAgICB0aGlzLiRjb250ZW50LnNjcm9sbFRvcCA9IDA7XG4gICAgdGhpcy5fb25BY3RpdmF0ZWQoKTtcbiAgICBjYWxsYmFjaygpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX29uQWN0aXZhdGVkKCk7XG4gICAgY2FsbGJhY2soKTtcbiAgfVxuICB0aGlzLnVwZGF0ZSgpO1xufVxuXG5wcm90by5kZWFjdGl2YXRlID0gZnVuY3Rpb24oIF9jYWxsYmFjayApe1xuICBsZXQgY2FsbGJhY2sgPSBfY2FsbGJhY2sgfHwgZnVuY3Rpb24oKXt9O1xuICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB0aGlzLiRlbGUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gIGlmKCB0aGlzLnR5cGUgPT09ICd2aWRlbycgKXtcbiAgICB0aGlzLnZpZGVvLmZhZGVPdXQoIDE1MDAsICgpID0+IHtcbiAgICAgIHRoaXMudmlkZW8ucGF1c2UoKTtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSk7XG4gIH0gZWxzZXtcbiAgICBjYWxsYmFjaygpO1xuICB9XG59XG5cblxucHJvdG8uc2Nyb2xsID0gZnVuY3Rpb24oIGRlbHRhICl7XG4gIGlmKCB0aGlzLmFjdGl2ZSApe1xuICAgIHRoaXMuc2Nyb2xsUHJvZ3Jlc3MgKz0gZGVsdGE7XG4gICAgaWYoIHRoaXMuc2Nyb2xsUHJvZ3Jlc3MgPCB0aGlzLnNjcm9sbE1pbiAtMTAgKXtcbiAgICAgIHRoaXMuc2Nyb2xsUHJvZ3Jlc3MgPSB0aGlzLnNjcm9sbE1pbiAtMTA7XG4gICAgfSBlbHNlIGlmKCB0aGlzLnNjcm9sbFByb2dyZXNzID4gdGhpcy5zY3JvbGxNYXggKyAxMCApe1xuICAgICAgdGhpcy5zY3JvbGxQcm9ncmVzcyA9IHRoaXMuc2Nyb2xsTWF4ICsgMTA7XG4gICAgfVxuICAgIHRoaXMuc2Nyb2xsUHJvZ3Jlc3NGcmFjID0gdGhpcy5zY3JvbGxQcm9ncmVzcy90aGlzLnNjcm9sbE1heDtcbiAgICBpZiggdGhpcy5zY3JvbGxQcm9ncmVzc0ZyYWMgPiAwLjc1ICYmIHRoaXMuc2NyZWVuQWZ0ZXIgKXtcbiAgICAgIHRoaXMuZGVhY3RpdmF0ZSggKCkgPT4ge1xuICAgICAgICB0aGlzLnNjcmVlbkFmdGVyLmFjdGl2YXRlKCk7XG4gICAgICB9KTsgICAgICBcbiAgICB9IGVsc2UgaWYoIHRoaXMuc2Nyb2xsUHJvZ3Jlc3NGcmFjIDwgdGhpcy5zY3JvbGxNaW4gLyB0aGlzLnNjcm9sbE1heCAmJiB0aGlzLnNjcmVlbkJlZm9yZSApe1xuICAgICAgdGhpcy5kZWFjdGl2YXRlKCAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2NyZWVuQmVmb3JlLmFjdGl2YXRlKCk7XG4gICAgICB9KTsgICAgICBcbiAgICB9XG4gICAgaWYoIHRoaXMuc2Nyb2xsUHJvZ3Jlc3NGcmFjID4gMC4yNSAmJiB0aGlzLnNjcmVlbkFmdGVyLnR5cGUgPT09ICd2aWRlbycgKXtcbiAgICAgIHRoaXMuc2NyZWVuQWZ0ZXIucHJlbG9hZCgpO1xuICAgIH0gXG4gIH1cbn1cblxucHJvdG8ucmVzaXplID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5zY3JvbGxQcm9ncmVzc0ZyYWMgPSB0aGlzLnNjcm9sbFByb2dyZXNzL3RoaXMuc2Nyb2xsTWF4O1xuICB0aGlzLnNjcm9sbE1heCA9ICggdGhpcy50eXBlID09PSAnY3JlZGl0cycgKSA/IHRoaXMuJGVsZS5zY3JvbGxIZWlnaHQgOiB0aGlzLiRlbGUub2Zmc2V0SGVpZ2h0O1xuICB0aGlzLnNjcm9sbFByb2dyZXNzID0gdGhpcy5zY3JvbGxQcm9ncmVzc0ZyYWMgKiB0aGlzLnNjcm9sbE1heDtcbn1cblxucHJvdG8udXBkYXRlID0gZnVuY3Rpb24oKXtcbiAgaWYoIHRoaXMudHlwZSA9PT0gJ3ZpZGVvJyApe1xuICAgIHRoaXMudmlkZW8udXBkYXRlKCB0aGlzLnNjcm9sbFByb2dyZXNzRnJhYyApO1xuICAgIGlmKCB0aGlzLnNjcm9sbFByb2dyZXNzRnJhYyA+IDAuNzUgKXtcbiAgICAgIHRoaXMuJGNvbnRlbnQuc3R5bGUub3BhY2l0eSA9ICgwLjI1IC0gKHRoaXMuc2Nyb2xsUHJvZ3Jlc3NGcmFjIC0gMC43NSkpICogKDEvMC4yNSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJGNvbnRlbnQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRoaXMuJGNvbnRlbnQuc3R5bGUub3BhY2l0eSA9ICgxIC0gdGhpcy5zY3JvbGxQcm9ncmVzc0ZyYWMpO1xuICB9XG5cbiAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNjcmVlbjsiLCJsZXQgUHJvZ3Jlc3MgPSBmdW5jdGlvbiggJGVsZSwgY3VycmVudFNjcmVlbiwgc3RhZ2VJbmRleCApe1xuICB0aGlzLiRlbGUgPSAkZWxlO1xuICB0aGlzLiRpbmRpY2F0b3IgPSB0aGlzLiRlbGUucXVlcnlTZWxlY3RvcignLnByb2dyZXNzLS1pbmRpY2F0b3InKTtcbiAgdGhpcy4kc3RhZ2VzID0gdGhpcy4kZWxlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9ncmVzcy0tc3RhZ2UnKTtcbiAgdGhpcy5zZXRJbmRpY2F0b3JUcmFuc2l0aW9uKCBmYWxzZSApO1xuICB0aGlzLnNldEN1cnJlbnQoIGN1cnJlbnRTY3JlZW4sIHN0YWdlSW5kZXggKTtcbiAgdGhpcy5pbml0SW50ZXJhY3Rpb24oKTtcbiAgdGhpcy5oaWRlVGltZW91dCA9IGZhbHNlO1xuICB0aGlzLmhpZGVEZWxheSA9IDMwMDA7XG59XG5cbmxldCBwcm90byA9IFByb2dyZXNzLnByb3RvdHlwZTtcblxucHJvdG8uaGlkZSA9IGZ1bmN0aW9uKCBkZWxheSApe1xuICBjbGVhclRpbWVvdXQoIHRoaXMuaGlkZVRpbWVvdXQgKTtcbiAgaWYoIGRlbGF5ICl7XG4gICAgdGhpcy5oaWRlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy4kZWxlLmNsYXNzTGlzdC5hZGQoJ3N0YXRlX19oaWRkZW4nKTtcbiAgICB9LCBkZWxheSApO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuJGVsZS5jbGFzc0xpc3QuYWRkKCdzdGF0ZV9faGlkZGVuJyk7XG4gIH1cbn1cbnByb3RvLnNob3cgPSBmdW5jdGlvbigpe1xuICBjbGVhclRpbWVvdXQoIHRoaXMuaGlkZVRpbWVvdXQgKTtcbiAgdGhpcy4kZWxlLmNsYXNzTGlzdC5yZW1vdmUoJ3N0YXRlX19oaWRkZW4nKTtcbn1cblxucHJvdG8uX29uU3RhZ2VTZWxlY3QgPSBmdW5jdGlvbiggaW5kZXgsIGlkICl7XG4gIGlmKCB0eXBlb2YgdGhpcy5vblN0YWdlU2VsZWN0ID09PSAnZnVuY3Rpb24nICl7XG4gICAgdGhpcy5vblN0YWdlU2VsZWN0KCBpbmRleCwgaWQgKTtcbiAgfVxufVxuXG5wcm90by5pbml0SW50ZXJhY3Rpb24gPSBmdW5jdGlvbigpe1xuICB0aGlzLiRlbGUucXVlcnlTZWxlY3RvckFsbCgnYScpLmZvckVhY2goKCAkYSwgaSAgKSA9PiB7XG4gICAgJGEuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBsZXQgaWQgPSAkYS5ocmVmLnJlcGxhY2Uod2luZG93LmxvY2F0aW9uLm9yaWdpbiwnJykucmVwbGFjZSgnLycsICcnKS5yZXBsYWNlKCcjJywnJyk7XG4gICAgICB0aGlzLl9vblN0YWdlU2VsZWN0KCBpLCBpZCApO1xuICAgIH0pO1xuICB9KTtcbiAgXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsICgpID0+IHtcbiAgICBjbGVhclRpbWVvdXQoIHRoaXMuaGlkZVRpbWVvdXQgKTtcbiAgICB0aGlzLnNob3coKTtcbiAgICBpZiggdGhpcy5jdXJyZW50U2NyZWVuLnR5cGUgPT09ICd2aWRlbycgKXtcbiAgICAgIHRoaXMuaGlkZSggdGhpcy5oaWRlRGVsYXkgKTtcbiAgICB9XG4gIH0pO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsICggZSApID0+IHtcbiAgICBjb25zb2xlLmxvZygnd2hlZWVlZWwnKTtcbiAgICBjbGVhclRpbWVvdXQoIHRoaXMuaGlkZVRpbWVvdXQgKTtcbiAgICB0aGlzLnNob3coKTtcbiAgICBpZiggdGhpcy5jdXJyZW50U2NyZWVuLnR5cGUgPT09ICd2aWRlbycgKXtcbiAgICAgIHRoaXMuaGlkZSggdGhpcy5oaWRlRGVsYXkgKTtcbiAgICB9XG4gIH0pO1xufTtcblxucHJvdG8uc2V0Q3VycmVudCA9IGZ1bmN0aW9uKCBjdXJyZW50U2NyZWVuLCBzdGFnZUluZGV4ICl7XG4gIHRoaXMuY3VycmVudFNjcmVlbiA9IGN1cnJlbnRTY3JlZW47XG4gIHRoaXMuJGN1cnJlbnRTdGFnZSA9IHRoaXMuJHN0YWdlc1sgc3RhZ2VJbmRleCBdO1xuICB0aGlzLm1vdmVJbmRpY2F0b3IoKTtcbiAgaWYoIHRoaXMuY3VycmVudFNjcmVlbi50eXBlID09PSAndmlkZW8nICl7XG4gICAgdGhpcy5oaWRlKCB0aGlzLmhpZGVEZWxheSApO1xuICAgIHRoaXMuY3VycmVudFNjcmVlbi5vblByb2dyZXNzID0gKCkgPT4ge1xuICAgICAgdGhpcy5tb3ZlSW5kaWNhdG9yKCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRoaXMuc2hvdygpO1xuICB9XG59XG5cbnByb3RvLnNldEluZGljYXRvclRyYW5zaXRpb24gPSBmdW5jdGlvbiggdG8sIGRlbGF5ICl7XG4gIGNsZWFyVGltZW91dCggdGhpcy5pbmRpY2F0b3JUcmFuc2l0aW9uVG9nZ2xlVGltZW91dCApO1xuICBpZiggISFkZWxheSAmJiBkZWxheSA+IDAgKXtcbiAgICB0aGlzLmluZGljYXRvclRyYW5zaXRpb25Ub2dnbGVUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiggdG8gKXtcbiAgICAgICAgdGhpcy4kaW5kaWNhdG9yLmNsYXNzTGlzdC5hZGQoJ3RyYW5zaXRpb24tYWN0aXZlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRpbmRpY2F0b3IuY2xhc3NMaXN0LnJlbW92ZSgndHJhbnNpdGlvbi1hY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9LCBkZWxheSApXG4gIH0gZWxzZSB7XG4gICAgaWYoIHRvICl7XG4gICAgICB0aGlzLiRpbmRpY2F0b3IuY2xhc3NMaXN0LmFkZCgndHJhbnNpdGlvbi1hY3RpdmUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kaW5kaWNhdG9yLmNsYXNzTGlzdC5yZW1vdmUoJ3RyYW5zaXRpb24tYWN0aXZlJyk7XG4gICAgfVxuICB9XG4gIHRoaXMuaW5kaWNhdG9yVHJhbnNpdGlvbiA9IHRvO1xufVxuXG5wcm90by5tb3ZlSW5kaWNhdG9yID0gZnVuY3Rpb24oKXtcbiAgbGV0IHRyYW5zbGF0ZVggPSAwO1xuICBpZiggdGhpcy5jdXJyZW50U2NyZWVuLnR5cGUgPT09ICd2aWRlbycgKXtcbiAgICBsZXQgcHJvZ3Jlc3MgPSB0aGlzLmN1cnJlbnRTY3JlZW4udmlkZW8uZ2V0UHJvZ3Jlc3MoKTtcbiAgICBsZXQgeCA9IHRoaXMuJGN1cnJlbnRTdGFnZS5vZmZzZXRMZWZ0O1xuICAgIGxldCBtYXggPSB0aGlzLiRjdXJyZW50U3RhZ2Uub2Zmc2V0V2lkdGg7XG4gICAgdHJhbnNsYXRlWCA9IHggKyAocHJvZ3Jlc3MgKiBtYXgpOyAgICBcbiAgfSBlbHNlIHtcbiAgICB0cmFuc2xhdGVYID0gdGhpcy4kY3VycmVudFN0YWdlLm9mZnNldExlZnQ7XG4gIH1cbiAgdGhpcy4kaW5kaWNhdG9yLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVYKCcgKyB0cmFuc2xhdGVYICsgJ3B4KSc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2dyZXNzOyIsImxldCBDb250cm9scyA9IGZ1bmN0aW9uKCAkZWxlICl7XG4gIHRoaXMuJGVsZSA9ICRlbGU7XG4gIHRoaXMuJGZ1bGxzY3JlZW4gPSB0aGlzLiRlbGUucXVlcnlTZWxlY3RvcignLmZ1bGxzY3JlZW4nKTtcbiAgdGhpcy4kbXV0ZSA9IHRoaXMuJGVsZS5xdWVyeVNlbGVjdG9yKCcubXV0ZScpXG4gIHRoaXMuJHN1YnMgPSB0aGlzLiRlbGUucXVlcnlTZWxlY3RvcignLnN1YnRpdGxlcycpXG5cbiAgdGhpcy4kZnVsbHNjcmVlbi5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIGlmICghZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaXRlLXdyYXAnKVxuICAgICAgICAucmVxdWVzdEZ1bGxzY3JlZW4oeyBuYXZpZ2F0aW9uVUk6IFwiaGlkZVwiIH0pXG4gICAgICAgIC5jYXRjaCggKCBlcnIgKSA9PiB7XG4gICAgICAgICAgYWxlcnQoJ25vIGZ1bGxzY3JlZW4nKTtcbiAgICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKTtcbiAgICB9XG4gIH0pO1xufVxuXG5cblxubGV0IHByb3RvID0gQ29udHJvbHMucHJvdG90eXBlO1xuXG5leHBvcnQgZGVmYXVsdCBDb250cm9sczsiLCJpbXBvcnQgU2NyZWVuIGZyb20gXCIuL21vZHVsZXMvU2NyZWVuLmpzXCI7XG5pbXBvcnQgUHJvZ3Jlc3MgZnJvbSBcIi4vbW9kdWxlcy9Qcm9ncmVzcy5qc1wiO1xuaW1wb3J0IENvbnRyb2xzIGZyb20gXCIuL21vZHVsZXMvQ29udHJvbHMuanNcIjtcblxubGV0IHNjcmVlbnMgPSBbXTtcbmRvY3VtZW50XG4gIC5xdWVyeVNlbGVjdG9yQWxsKCcuc2NyZWVuJylcbiAgLmZvckVhY2goZnVuY3Rpb24oICRzICl7XG4gICAgc2NyZWVucy5wdXNoKCBuZXcgU2NyZWVuKCAkcyApICk7XG4gIH0pO1xuXG5mb3IoIGxldCBpID0gMDsgaSA8IHNjcmVlbnMubGVuZ3RoOyBpKysgKXtcbiAgbGV0IGJlZm9yZSA9IGkgPiAwID8gc2NyZWVuc1tpLTFdIDogZmFsc2U7XG4gIGxldCBhZnRlciA9IGkgPCBzY3JlZW5zLmxlbmd0aCAtIDEgPyBzY3JlZW5zW2krMV0gOiBmYWxzZTsgIFxuICBzY3JlZW5zW2ldLmxpbmtUb090aGVycyggYmVmb3JlLCBhZnRlciApOyBcbn1cblxud2luZG93LnNjcmVlbnMgPSBzY3JlZW5zO1xuXG5sZXQgY3VycmVudFNjcmVlbkluZGV4ID0gMDtcbmxldCBwU2NyZWVuSW5kZXggPSAwO1xubGV0IGN1cnJlbnRTdGFnZUluZGV4ID0gTWF0aC5mbG9vciggY3VycmVudFNjcmVlbkluZGV4IC8gMiApO1xubGV0IGN1cnJlbnRTY3JlZW4gPSBzY3JlZW5zW2N1cnJlbnRTY3JlZW5JbmRleF07XG5cbmxldCBwcm9ncmVzcyA9IG5ldyBQcm9ncmVzcyggZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2dyZXNzLS1iYXInKSwgY3VycmVudFNjcmVlbiAsIGN1cnJlbnRTdGFnZUluZGV4ICk7XG5sZXQgY29udHJvbHMgPSBuZXcgQ29udHJvbHMoIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9scycpICk7XG5cblxubGV0IHN0YWdlU2VsZWN0VGltZW91dCA9IGZhbHNlO1xucHJvZ3Jlc3Mub25TdGFnZVNlbGVjdCA9IGZ1bmN0aW9uKCBpbmRleCwgaWQgKXtcbiAgaWYoIGluZGV4ICE9PSBjdXJyZW50U3RhZ2VJbmRleCApe1xuICAgIGNsZWFyVGltZW91dChzdGFnZVNlbGVjdFRpbWVvdXQpO1xuICAgIGN1cnJlbnRTY3JlZW4uZGVhY3RpdmF0ZSgpO1xuICAgIHByb2dyZXNzLnNldEluZGljYXRvclRyYW5zaXRpb24oIHRydWUgKTtcbiAgICBzdGFnZVNlbGVjdFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBjdXJyZW50U2NyZWVuSW5kZXggPSBpbmRleCAqIDI7XG4gICAgICBjdXJyZW50U3RhZ2VJbmRleCA9IGluZGV4O1xuICAgICAgY3VycmVudFNjcmVlbiA9IHNjcmVlbnNbY3VycmVudFNjcmVlbkluZGV4XTtcbiAgICAgIGN1cnJlbnRTY3JlZW4uYWN0aXZhdGUoKTtcbiAgICAgIHByb2dyZXNzLnNldEN1cnJlbnQoIGN1cnJlbnRTY3JlZW4sIGN1cnJlbnRTdGFnZUluZGV4ICk7XG4gICAgICBwcm9ncmVzcy5zZXRJbmRpY2F0b3JUcmFuc2l0aW9uKCBmYWxzZSwgMTUwMCApO1xuICAgIH0sIDMwMCApO1xuICB9XG59XG5cbmN1cnJlbnRTY3JlZW4uYWN0aXZhdGUoKTtcblxuZm9yKCBsZXQgaSA9IDA7IGkgPCBzY3JlZW5zLmxlbmd0aDsgaSsrICl7XG4gIHNjcmVlbnNbaV0udXBkYXRlKCk7XG4gIChmdW5jdGlvbiggaW5kZXggKXtcbiAgICBzY3JlZW5zW2luZGV4XS5vbkFjdGl2YXRlU3RhcnQgPSBmdW5jdGlvbiggcyApe1xuICAgICAgY3VycmVudFNjcmVlbkluZGV4ID0gaW5kZXg7XG4gICAgICBjdXJyZW50U3RhZ2VJbmRleCA9IE1hdGguZmxvb3IoIGN1cnJlbnRTY3JlZW5JbmRleCAvIDIgKTtcbiAgICAgIGN1cnJlbnRTY3JlZW4gPSBzY3JlZW5zW2luZGV4XTsgICAgICAgIFxuICAgICAgcHJvZ3Jlc3Muc2V0SW5kaWNhdG9yVHJhbnNpdGlvbiggdHJ1ZSApO1xuICAgICAgcHJvZ3Jlc3Muc2V0SW5kaWNhdG9yVHJhbnNpdGlvbiggZmFsc2UsIDE1MDAgKTtcbiAgICAgIHByb2dyZXNzLnNldEN1cnJlbnQoIGN1cnJlbnRTY3JlZW4sIGN1cnJlbnRTdGFnZUluZGV4ICk7XG4gICAgfTtcbiAgICBzY3JlZW5zW2luZGV4XS5vbkFjdGl2YXRlZCA9IGZ1bmN0aW9uKCBzICl7XG4gICAgICAgICBcbiAgICAgIGlmKCBzLnR5cGUgPT09ICd2aWRlbycgKXtcbiAgICAgICAgcHJvZ3Jlc3MuaGlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvZ3Jlc3Muc2hvdygpOyAgICAgIFxuICAgICAgfVxuICAgIH1cbiAgfSkoaSk7XG59XG5cbmxldCBpc1Njcm9sbGluZztcbmxldCBzY3JvbGxCcmVhayA9IGZhbHNlO1xuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgZnVuY3Rpb24oIGUgKXtcbiAgd2luZG93LmNsZWFyVGltZW91dCggaXNTY3JvbGxpbmcgKTtcbiAgaXNTY3JvbGxpbmcgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdHNjcm9sbEJyZWFrID0gZmFsc2U7XG5cdH0sIDIwMCApO1xuXG4gIGlmKCAhc2Nyb2xsQnJlYWsgKXtcbiAgICBjdXJyZW50U2NyZWVuLnNjcm9sbCggZS5kZWx0YVkgKTtcbiAgICBjdXJyZW50U2NyZWVuLnVwZGF0ZSgpO1xuICB9XG4gIGZvciggbGV0IGkgPSAwOyBpIDwgc2NyZWVucy5sZW5ndGg7IGkrKyApe1xuICAgIGlmKCBzY3JlZW5zW2ldLmFjdGl2ZSApe1xuICAgICAgY3VycmVudFNjcmVlbkluZGV4ID0gaTtcbiAgICAgIGN1cnJlbnRTdGFnZUluZGV4ID0gTWF0aC5mbG9vciggY3VycmVudFNjcmVlbkluZGV4IC8gMiApO1xuICAgICAgY3VycmVudFNjcmVlbiA9IHNjcmVlbnNbaV07XG4gICAgfVxuICB9XG5cbiAgaWYoIGN1cnJlbnRTY3JlZW5JbmRleCAhPT0gcFNjcmVlbkluZGV4ICl7XG4gICAgcHJvZ3Jlc3Muc2V0Q3VycmVudCggY3VycmVudFNjcmVlbiwgY3VycmVudFN0YWdlSW5kZXggKTtcbiAgICBzY3JvbGxCcmVhayA9IHRydWU7XG4gIH1cbiAgXG4gIHBTY3JlZW5JbmRleCA9IGN1cnJlbnRTY3JlZW5JbmRleDtcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n")}]);