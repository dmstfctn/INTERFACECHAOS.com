let Progress = function( $ele, currentScreen, stageIndex ){
  this.$ele = $ele;
  this.$indicator = this.$ele.querySelector('.progress--indicator');
  this.$stages = this.$ele.querySelectorAll('.progress--stage');
  this.setCurrent( currentScreen, stageIndex );
  this.initInteraction();
  this.hideTimeout = false;
  this.hideDelay = 3000;
  this.indicatorMinWidth = this.$indicator.offsetWidth;
}

let proto = Progress.prototype;

proto.hide = function( delay ){
  clearTimeout( this.hideTimeout );
  if( delay ){
    this.hideTimeout = setTimeout(() => {
      this.$ele.classList.add('state__hidden');
    }, delay );
  } else {
    this.$ele.classList.add('state__hidden');
  }
}
proto.show = function(){
  clearTimeout( this.hideTimeout );
  this.$ele.classList.remove('state__hidden');
}

proto._onStageSelect = function( index, id ){
  if( typeof this.onStageSelect === 'function' ){
    this.onStageSelect( index, id );
  }
}

proto.initInteraction = function(){
  this.$ele.querySelectorAll('a').forEach(( $a, i  ) => {
    $a.addEventListener('click', () => {
      let id = $a.href.replace(window.location.origin,'').replace('/', '').replace('#','');
      this._onStageSelect( i, id );
    });
  });
  
  document.addEventListener('mousemove', () => {
    clearTimeout( this.hideTimeout );
    this.show();
    if( this.currentScreen.type === 'video' ){
      this.hide( this.hideDelay );
    }
  });
  document.addEventListener('wheel', ( e ) => {
    clearTimeout( this.hideTimeout );
    this.show();
    if( this.currentScreen.type === 'video' ){
      this.hide( this.hideDelay );
    }
  });
};

proto.setCurrent = function( currentScreen, stageIndex ){
  this.currentScreen = currentScreen;
  this.$currentStage = this.$stages[ stageIndex ];
  this.moveIndicator();
  if( this.currentScreen.type === 'video' ){
    this.hide( this.hideDelay );
    this.currentScreen.onProgress = () => {
      this.moveIndicator();
    }
  } else if( this.currentScreen.type === 'credits' ){
    this.show();
    this.currentScreen.onProgress = () => {
      this.moveIndicator();
    }
  } else {
    this.show();
  }
}

proto.moveIndicator = function(){
  let progressX = 0;
  if( this.currentScreen.type === 'video' ){
    let progress = this.currentScreen.video.getProgress();
    let x = this.$currentStage.offsetLeft;
    let max = this.$currentStage.offsetWidth - this.indicatorMinWidth;
    progressX = x + (progress * max);    
    this.$indicator.classList.add('indicator-active');
  } else if( this.currentScreen.type === 'credits' ){
    let progress = this.currentScreen.contentScrollProgressFrac
    console.log(progress);
    let x = this.$currentStage.offsetLeft;
    let max = this.$currentStage.offsetWidth - this.indicatorMinWidth;
    progressX = x + (progress * max);    
    this.$indicator.classList.add('indicator-active');
  } else {
    progressX = this.$currentStage.offsetLeft;
    this.$indicator.classList.remove('indicator-active');
  }
  this.$indicator.style.width = progressX + this.indicatorMinWidth;
}

export default Progress;