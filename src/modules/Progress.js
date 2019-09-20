let Progress = function( $ele, currentScreen, stageIndex ){
  this.$ele = $ele;
  this.$indicator = this.$ele.querySelector('.progress--indicator');
  this.$stages = this.$ele.querySelectorAll('.progress--stage');  
  this.hideTimeout = false;
  this.hideDelay = 3000;
  this.indicatorMinWidth = this.$indicator.offsetWidth; 
  this.setCurrent( currentScreen, stageIndex );
  this.initInteraction();
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
    this.currentScreen.onProgress = () => {
      this.moveIndicator();
    }
  }
}

proto.moveIndicator = function(){
  let progressX = 0;
  let titleW = this.$currentStage.querySelector('.progress--stage--title').offsetWidth
  if( this.currentScreen.type === 'video' ){
    let progress = this.currentScreen.video.getProgress();
    let x = this.$currentStage.offsetLeft + titleW + this.indicatorMinWidth;
    let max = this.$currentStage.offsetWidth - this.indicatorMinWidth - titleW;
    progressX = x + (progress * max);    
    this.$indicator.classList.add('indicator-active');
  } else if( this.currentScreen.type === 'credits' ){
    let progress = (this.currentScreen.contentScrollProgressFrac - this.currentScreen.autoScreen.initProgress) / (1-this.currentScreen.autoScreen.initProgress);
    let x = this.$currentStage.offsetLeft;
    let max = this.$currentStage.offsetWidth - this.indicatorMinWidth;
    progressX = x + (progress * max);    
    this.$indicator.classList.add('indicator-active');
  } else {
    let progress = this.currentScreen.autoScreen.progress;
    if( this.currentScreen.autoScreen.isPaused ){      
      progress = this.currentScreen.scrollProgressFrac;
    }
    let x = this.$currentStage.offsetLeft;
    let max = titleW + this.indicatorMinWidth;
    progressX = x + (progress * max); 
    this.$indicator.classList.add('indicator-active');;
  }
 // console.log('indicator w:', progressX, this.indicatorMinWidth );
  this.$indicator.style.width = progressX + this.indicatorMinWidth;
}

export default Progress;