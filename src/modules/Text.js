import CONFIG from './CONFIG.js';

let Text = function( _$ele, _duration ){
  this.TYPE = 'text';
  this.$ele = _$ele;
  this.$content = this.$ele.querySelector('.screen--content');
  this.duration = _duration;
  this.timerStep = 50;
  this.progressStep = 1 / (this.duration / this.timerStep);
  this.timer = false;
  this.progress = 0;
  this.time = 0;
  this.fadeThreshold = 0.4;
  this.isPlaying = false;
  this.isActive = false;
  this.deactivateTime = 1500;
  this.deactivateTimer;

  this.$ele.addEventListener('wheel', ( e ) => {
    if( this.isActive && window.innerWidth > CONFIG.BREAKPOINT ){
      this.pauseAndAutoResume( 500 );
      this.progress += e.deltaY/1000;
      this.step();
      this.time = this.progress * this.duration;    
    }
  }, 
  {
    passive: true
  });

  this.activate = () => {
    this.isActive = true;
    this.play();
    this.$ele.classList.add('active');
  }
  this.deactivate = () => {
    clearTimeout( this.deactivateTimer );
    this.isActive = false;
    this.pause();
    this.$ele.classList.remove('active');

    setTimeout( () => {
      this.progress = 0;
      this.time = 0;  
    }, this.deactivateTime );
  }

  this._onComplete = () => {
    if( typeof( this.onComplete === 'function') ){
      this.onComplete();
    }
  }

  this._onProgress = () => {
    if( typeof this.onProgress === 'function' ){
      this.onProgress();
    }
  }

  this.pause = () => {
    this.isPlaying = false;
    clearInterval( this.timer );
  }
  
  this.play = () => {
    clearInterval( this.timer );
    this.isPlaying = true;
    this.timer = setInterval( () => {
      this.progress += this.progressStep;   
      this.time += this.timerStep;   
      this.step();
    }, this.timerStep );
  }

  this.pauseAndAutoResume = ( _delay ) => {
    let delay = _delay || 500;
    if( this.isPlaying ){
      this.pause();
      clearInterval(this.restartTimer);
      this.restartTimer = setInterval( () => {
        this.play();
      }, delay );
    }
  }

  this.togglePlay = () => {
    if( this.isPlaying ){
      this.pause();
    } else {
      this.play();
    }
  }

  this.step = () => {
    if( this.progress < 0 ){
      this.progress = 0;
    }
    if( this.progress >= 1 ){
      this.progress = 1;
      clearInterval( this.timer );
      clearInterval(this.restartTimer);
      this._onComplete();
    }
    this._onProgress();
    this.update();
  }

  this.update = () => {
    if( this.progress > this.fadeThreshold  ){
      this.$content.style.opacity = ((1 - this.fadeThreshold) - (this.progress - this.fadeThreshold)) * (1/(1-this.fadeThreshold));
    } else {
      this.$content.style.opacity = 1;
    }    
  }
}

export default Text;