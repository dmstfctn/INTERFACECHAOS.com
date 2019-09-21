import Stage from './modules/Stage.js';
import CreditsStage from './modules/CreditsStage.js';

let navSetActive = function(){
  $stage_titles.forEach( ( $title ) => {
    $title.querySelector('a').classList.remove('current');
  });
  $stage_titles[currentStageIndex].querySelector('a').classList.add('current');
};

let $progress = document.querySelector('.progress');
let $stage_titles = $progress.querySelectorAll('.progress--stage');
let currentStageIndex = -1;
let stages = [ ... document.querySelectorAll('.stage__excerpt') ].map( s => new Stage(s) );
stages.push( new CreditsStage( document.querySelector('.stage__credits')) );

stages.forEach( ( stage, index ) => {
  stage.onComplete = () => {
    if( typeof stages[index + 1] !== 'undefined' ){
      stages[index].deactivate();
      stages[index+1].activate();
      currentStageIndex = index + 1;    
      navSetActive();  
    }
  }
  stage.onChangeCurrent = () => {
    showHideControls();
  }
})

$stage_titles.forEach( ( $title, index ) => {
  $title.querySelector('a').addEventListener( 'click', ( e ) => {
    e.preventDefault();
    document.body.classList.remove('state__landing');
    stages.forEach( (stage) => {
      stage.deactivate();
    });
    currentStageIndex = index;
    stages[index].activate();
    showHideControls();
    navSetActive();
  });
});

document.addEventListener('keyup', ( e ) => {
  if( e.which === 32 ){
    stages[currentStageIndex].current.togglePlay();
  }
})

let $fullscreen_btn = document.querySelector('.control__fullscreen');
let $fullscreen_label = $fullscreen_btn.querySelector('.control--label');

document.addEventListener('fullscreenchange', (event) => {
  if (document.fullscreenElement) {
    document.body.classList.add('state__fullscreen');
    $fullscreen_btn .classList.add('state__fullscreen-active');
    $fullscreen_label.innerText = 'exit fullscreen';
  } else {
    document.body.classList.remove('state__fullscreen');
    $fullscreen_btn.classList.remove('state__fullscreen-active');
    $fullscreen_label.innerText = 'fullscreen';
  }
});
$fullscreen_btn.addEventListener( 'click', () => {
  if (!document.fullscreenElement) {
    document.querySelector('.site-wrap')
      .requestFullscreen({ navigationUI: "hide" })        
      .catch( ( err ) => {
        console.log('Could not enter fullscreen');
      });       
  } else {
    document.exitFullscreen();
  }
});


let controlTimeout;
let controlsHidden = false;
let hideControls = function(){
  clearTimeout( controlTimeout );
  controlTimeout = setTimeout( () => {
    document.body.classList.add('state__hide-controls');
    document.querySelector('.progress--bar').classList.add('state__hidden');
    document.querySelector('.control__fullscreen').classList.add('state__hidden');
    document.querySelectorAll('.progress--indicator').forEach( indicator => indicator.classList.add('state__hidden') );
  }, 3000 );
}

let showControls = function(){
  clearTimeout( controlTimeout );
  document.body.classList.remove('state__hide-controls');
  document.querySelector('.progress--bar').classList.remove('state__hidden');
  document.querySelector('.control__fullscreen').classList.remove('state__hidden');
  document.querySelectorAll('.progress--indicator').forEach( indicator => indicator.classList.remove('state__hidden') );
}

let showHideControls = function(){
  showControls();
  if( currentStageIndex >= 0 ){
    if( stages[currentStageIndex].current.TYPE === 'video'){
      hideControls();
    }  
  }
}

document.addEventListener( 'wheel', () => {
  showHideControls();
});

document.addEventListener( 'mousemove', () => {  
  showHideControls();
});