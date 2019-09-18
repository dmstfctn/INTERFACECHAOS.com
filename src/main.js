import Screen from "./modules/Screen.js";
import Progress from "./modules/Progress.js";
import Controls from "./modules/Controls.js";

let BREAKPOINT = 640;

let screens = [];
document
  .querySelectorAll('.screen')
  .forEach(function( $s ){
    screens.push( new Screen( $s ) );
  });

for( let i = 0; i < screens.length; i++ ){
  let before = i > 0 ? screens[i-1] : false;
  let after = i < screens.length - 1 ? screens[i+1] : false;  
  screens[i].linkToOthers( before, after ); 
}

let currentScreenIndex = 0;
let pScreenIndex = 0;
let currentStageIndex = Math.floor( currentScreenIndex / 2 );
let currentScreen = screens[currentScreenIndex];

let progress = new Progress( document.querySelector('.progress--bar'), currentScreen , currentStageIndex );
let controls = new Controls( currentScreen );

controls.onMute = function(){
  if( currentScreen.video ){
    currentScreen.video.mute();
  }
}
controls.onUnMute = function(){
  if( currentScreen.video ){
    currentScreen.video.unmute();
  }
}

controls.setMuteState( true );
controls.hideMute();

let stageSelectTimeout = false;
progress.onStageSelect = function( index, id ){
  if( index !== currentStageIndex ){
    clearTimeout(stageSelectTimeout);
    currentScreen.deactivate();
  
    stageSelectTimeout = setTimeout(function(){
      currentScreenIndex = index * 2;
      currentStageIndex = index;
      currentScreen = screens[currentScreenIndex];     
      currentScreen.activate();
      progress.setCurrent( currentScreen, currentStageIndex );

      controls.setCurrent( currentScreen );
    }, 300 );
  }
}

currentScreen.activate();

for( let i = 0; i < screens.length; i++ ){
  screens[i].update();
  (function( index ){
    screens[index].onActivateStart = function( s ){
      let previousScreen = currentScreen;
      currentScreenIndex = index;
      currentStageIndex = Math.floor( currentScreenIndex / 2 );
      currentScreen = screens[index];
      //console.log('set mute state to: ', controls.isMuted )
      currentScreen.setMuteState( controls.isMuted );      
      progress.setCurrent( currentScreen, currentStageIndex );
      controls.setCurrent( currentScreen );
    };
    screens[index].onActivated = function( s ){
      if( s.type === 'video' ){
        progress.hide( 3000 );
        controls.hide( 3000 );
      } else {
        progress.show(); 
        controls.show();
      }
    }
  })(i);
}

let isScrolling;
let scrollBreak = false;

document.addEventListener('wheel', function( e ){
  window.clearTimeout( isScrolling );
  isScrolling = setTimeout(function() {
    scrollBreak = false;
  }, 200 );

  if( !scrollBreak && window.innerWidth > BREAKPOINT ){
    currentScreen.scroll( e.deltaY );
    currentScreen.update();
  }
  for( let i = 0; i < screens.length; i++ ){
    if( screens[i].active ){
      currentScreenIndex = i;
      currentStageIndex = Math.floor( currentScreenIndex / 2 );
      currentScreen = screens[i];
    }
  }

  if( currentScreenIndex !== pScreenIndex ){
    progress.setCurrent( currentScreen, currentStageIndex );
    controls.setCurrent( currentScreen );
    scrollBreak = true;
  }
  
  pScreenIndex = currentScreenIndex;
});
