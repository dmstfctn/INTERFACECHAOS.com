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
  if( index * 2 !== currentScreenIndex ){
    clearTimeout(stageSelectTimeout);
    currentScreen.deactivate();
    console.log( 'selected, ', index, id );
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

let mouseWheelResponse = function( e ){
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
}

document.addEventListener('wheel', function( e ){
  if( window.innerWidth > BREAKPOINT ){
    mouseWheelResponse( e );
  }
});

let $miniprogress = document.querySelector('.mini-progress');
let $miniprogress_inner = $miniprogress.querySelector('.progress--bar');


let smallScreenScroll = function( e ){
  // move the bar
  let barW = $miniprogress_inner.offsetWidth;
  let scrollFrac = document.body.scrollTop / (document.body.scrollHeight - document.body.offsetHeight);
  let x = scrollFrac * (barW - window.innerWidth) * -1;
  $miniprogress_inner.style.transform = 'translateX(' + x + 'px)';
}

let smallScreenLayoutBar = function(){
  let barW = $miniprogress_inner.offsetWidth;
  let pageH = document.body.scrollHeight - document.body.offsetHeight;
  let section1H = screens[0].$ele.offsetHeight + screens[1].$ele.offsetHeight;
  let section2H = screens[2].$ele.offsetHeight + screens[3].$ele.offsetHeight;
  let section3H = screens[4].$ele.offsetHeight + screens[5].$ele.offsetHeight;
  let section4H = screens[6].$ele.offsetHeight;
  let section1Frac = section1H / pageH;
  let section2Frac = section2H / pageH;
  let section3Frac = section3H / pageH;
  let section4Frac = section4H / pageH;
  let $stageTitles = document.querySelectorAll('.mini-progress .progress--stage')

  $stageTitles[0].style.left = 0;
  $stageTitles[1].style.left = 0 + (section1Frac * barW);
  $stageTitles[2].style.left = 0 + ((section1Frac + section2Frac) * barW);
  $stageTitles[3].style.left = 0 + ((section1Frac + section2Frac + section3Frac) * barW);

}

window.addEventListener('resize', function(){
  if( window.innerWidth <= BREAKPOINT ){
    smallScreenLayoutBar();
  }
})

document.addEventListener('scroll', function( e ){
  if( window.innerWidth <= BREAKPOINT ){
    smallScreenScroll( e );
  }
})

if( window.innerWidth <= BREAKPOINT ){
  smallScreenLayoutBar();
}