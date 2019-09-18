import * as VimeoPlayer from "@vimeo/player/dist/player.min.js" ;

let Video = function( id, $ele ){
  this.$ele = $ele;
  this.$overlay = this.$ele.parentElement.querySelector('.video-overlay');
  let opts = {
    id: id,
    width: window.innerWidth,
    autoplay: false,
    controls: false,
    autopause: true
  };
  this.vimeo = new VimeoPlayer( $ele, opts );
  this.muted = true;
  this.volume = 0;
  this.vimeo.setVolume( this.volume );
  this.progress = 0;
  this.length = 0;
  this.vimeo.getDuration().then(duration => this.length = duration);  
  this.fadeLoop = false;
  this.isPlaying = false;
  this.vimeo.on('ended', ( ) => {
    this._onEnded();
  });
  this.vimeo.on('timeupdate', ( t ) => {
    this.progress = t.seconds / t.duration;
    if( typeof this.onProgress === 'function' ){
      this.onProgress();
    }
    if( t.seconds >= t.duration - 2 ){
      this._onEnded();
    }
  });

  this.$overlay.addEventListener('click', () => {
    console.log( 'click' );
    this.togglePlay();
  });
}

let proto = Video.prototype;

proto._onEnded = function(){
  if( typeof this.onEnded === 'function' ){
    this.onEnded();
  }
}

proto.togglePlay = function(){
  if( this.isPlaying ){
    this.pause();
  } else {
    this.play();
  }
}

proto.play = function(){
  this.isPlaying = true;
  this.$ele.classList.add('playing');
  this.vimeo.play();
}

proto.pause = function(){
  this.isPlaying = false;
  this.$ele.classList.remove('playing');
  this.vimeo.pause();
}

proto.mute = function(){
  this.muted = true;
  this.vimeo.setVolume( 0 );
}

proto.unmute = function(){
  this.muted = false;
  this.vimeo.setVolume( this.volume );
}

proto.getProgress = function(){
  return this.progress;
}

proto._onFadedIn = function(){
  if( typeof this.onFadedIn === 'function' ){
    this.onFadedIn();
  }
}

proto.fadeIn = function( _time, _callback ){  
  let time = _time || 100;
  let callback = _callback || function(){};
  clearInterval( this.fadeLoop );
  let change = 1 - this.volume;
  let step = change / (time / 10);
  this.fadeLoop = setInterval(() => {
    this.volume += step;
    if( this.volume >= 1 ){
      this.volume = 1; 
      this._onFadedIn();
      callback();
      clearInterval( this.fadeLoop );
    }    
    if( !this.muted ){
      this.vimeo.setVolume( this.volume );
    }
  }, 10 );
};

proto._onFadedOut = function(){
  if( typeof this.onFadedOut === 'function' ){
    this.onFadedOut();
  }
}

proto.fadeOut = function( _time, _callback ){  
  let time = _time || 100;
  let callback = _callback || function(){};  
  clearInterval( this.fadeLoop );
  let change = -this.volume;
  let step = change / (time / 10);  
  this.fadeLoop = setInterval(() => {
    this.volume += step;
    if( this.volume <= 0 ){
      this.volume = 0; 
      this._onFadedOut();
      callback();
      clearInterval( this.fadeLoop );
    }
    if( !this.muted ){
      this.vimeo.setVolume( this.volume );
    }
  }, 10 );
};

proto.update = function( fraction ){

}
export default Video;