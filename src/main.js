import Screen from "./modules/Screen.js";

let scroll = 0;
let totalLength = 0;
let scrollPercent = 0;
let $stages = document.querySelectorAll('.screen');
let $progressStages = document.querySelectorAll('.progress--stage');
let currentIndex = 0;
let $currentStage = $stages[currentIndex];
let $currentProgress = $progressStages[currentIndex];
window.$currentProgress = $currentProgress;

let screens = [];
$stages.forEach(function( $s ){
  totalLength += $s.offsetHeight;
  screens.push( new Screen( $s ) );
});

for( let i = 0; i < screens.length; i++ ){
  let before = i > 0 ? screens[i-1] : false;
  let after = i < screens.length - 1 ? screens[i+1] : false;  
  screens[i].linkToOthers( before, after );
}

screens[0].active = true;

for( let i = 0; i < screens.length; i++ ){
  screens[i].update();
}

document.addEventListener('wheel', function( e ){
  for( let i = 0; i < screens.length; i++ ){
    screens[i].scroll( e.deltaY );
    screens[i].update();
  }
});