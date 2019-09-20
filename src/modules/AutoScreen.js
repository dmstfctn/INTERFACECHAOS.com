let AutoScreen = function( _duration, _initProgress ){
  this.duration = _duration;
  this.timer = false;
  this.restartTimer = false;
  this.time = 0;
  this.initProgress = _initProgress || 0;
  this.progress = this.initProgress || 0;
  this.timeStep = 50;
  this.progressStep = 1 / (this.duration / this.timeStep);
  this.isPaused = false;
}

let proto = AutoScreen.prototype;

proto.updateProgress = function( p ){
  if( p <= 1 && p >= 0 ){
    this.progress = p;
  }
}

proto.pauseAndAutoResume = function( _delay ){
  let delay = _delay || 500;
  if( this.isActive ){
    this.pause();
    clearInterval(this.restartTimer);
    this.restartTimer = setInterval( () => {
      this.play();
    }, delay );
  }
}

proto.pause = function(){
  this.isPaused = true;
  clearInterval(this.timer);
}

proto.reset = function(){
  this.progress = this.initProgress;
}

proto.start = function(){  
  this.isActive = true;
  this.reset();
  this.play();
}

proto.stop = function(){
  this.isActive = false;
  clearInterval(this.restartTimer);
  this.pause();
}

proto.play = function(){
  clearInterval(this.timer);
  this.isPaused = false;
  this.timer = setInterval(() => {
    this.progress += this.progressStep
    this._onProgress();
    if( this.progress >= 1 ){
      clearInterval(this.timer);
      this._onEnded();
    }
  }, this.timeStep );
}

proto._onEnded = function(){
  this.reset();
  if( typeof this.onEnded === 'function' ){
    this.onEnded();
  }
}

proto._onProgress = function(){
  if( typeof this.onProgress === 'function' ){
    this.onProgress();
  }
}

export default AutoScreen;