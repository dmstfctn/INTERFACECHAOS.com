//ensure <script src="https://player.vimeo.com/api/player.js"></script> is included on page

let Video = function( id, $ele ){
  let opts = {
    id: id,
    width: window.innerWidth,
    autoplay: false,
    controls: false
  };
  this.vimeo = new Vimeo.Player( $ele, opts );
  this.volume = 0;
  this.vimeo.setVolume( this.volume );
  this.progress = 0;
  this.length = 0;
  this.vimeo.getDuration().then(duration => this.length = duration);  
  this.fadeLoop = false;
  this.vimeo.on('ended', ( ) => {
    console.log('vimeo says ended')
    this._onEnded();
  });
  this.vimeo.on('timeupdate', ( t ) => {
    this.progress = t.seconds / t.duration;
    if( typeof this.onProgress === 'function' ){
      this.onProgress();
    }
    if( t.seconds >= t.duration - 2 ){
      console.log( 'less than 2 seconds to end' );
      this._onEnded();
    }
  });
}

let proto = Video.prototype;

proto._onEnded = function(){
  console.log('Video() - _onEnded()');
  if( typeof this.onEnded === 'function' ){
    this.onEnded();
  }
}

proto.play = function(){
  this.vimeo.play();
}

proto.pause = function(){
  this.vimeo.pause();
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
    this.vimeo.setVolume( this.volume );
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
  console.log( 'from', this.volume, ' fadeout: ', change, step );
  this.fadeLoop = setInterval(() => {
    this.volume += step;
    if( this.volume <= 0 ){
      this.volume = 0; 
      this._onFadedOut();
      callback();
      clearInterval( this.fadeLoop );
    }
    this.vimeo.setVolume( this.volume );
  }, 10 );
};

proto.update = function( fraction ){

}
export default Video;