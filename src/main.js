import Screen from "./modules/Screen.js";
import Progress from "./modules/Progress.js";

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

window.screens = screens;

let currentScreenIndex = 0;
let pScreenIndex = 0;
let currentStageIndex = Math.floor( currentScreenIndex / 2 );
let currentScreen = screens[currentScreenIndex];

let progress = new Progress( document.querySelector('.progress--bar'), currentScreen , currentStageIndex );

let stageSelectTimeout = false;
progress.onStageSelect = function( index, id ){
  if( index !== currentStageIndex ){
    currentScreen.deactivate();
    stageSelectTimeout = setTimeout(function(){
      currentScreenIndex = index * 2;
      currentStageIndex = index;
      currentScreen = screens[currentScreenIndex];
      currentScreen.activate();
      progress.setCurrent( currentScreen, currentStageIndex );
    }, 300 );
  }
}

currentScreen.activate();



for( let i = 0; i < screens.length; i++ ){
  screens[i].update();
}

let isScrolling;
let scrollBreak = false;


document.addEventListener('wheel', function( e ){
  window.clearTimeout( isScrolling );
  isScrolling = setTimeout(function() {
		scrollBreak = false;
	}, 200 );

  if( !scrollBreak ){
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
    scrollBreak = true;
  }
  
  pScreenIndex = currentScreenIndex;
});