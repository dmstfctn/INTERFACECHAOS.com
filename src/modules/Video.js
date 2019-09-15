//ensure <script src="https://player.vimeo.com/api/player.js"></script> is included on page

let Video = function( iframe ){
  this.vimeo = new Vimeo.Player( iframe );
  this.volume = 1;
  this.vimeo.setVolume( this.volume );
  this.progress = 0;
  this.length = 0;
  this.vimeo.getDuration().then(duration => this.length = duration);  
  this.fadeLoop = false;
}

let proto = Video.prototype;

proto.play = function(){
  this.vimeo.play();
}

proto.pause = function(){
  this.vimeo.pause();
}

proto.fadeIn = function( _time ){
  let time = _time || 100;
  clearInterval( this.fadeLoop );
  let change = 1 - this.volume;
  let step = change / (time / 10);
  this.fadeLoop = setInterval(() => {
    this.volume += step;
    if( this.volume >= 1 ){
      this.volume = 1; 
      clearInterval( this.fadeLoop );
    }
    console.log( 'VOLUME: ', this.volume );
    this.vimeo.setVolume( this.volume );
  }, 10 );
};

proto.fadeOut = function( _time ){
  let time = _time || 100;
  clearInterval( this.fadeLoop );
  let change = -this.volume;
  let step = change / (time / 10);
  console.log('fadeOut: ', change, step );
  this.fadeLoop = setInterval(() => {
    this.volume += step;
    if( this.volume <= 0 ){
      this.volume = 0; 
      clearInterval( this.fadeLoop );
    }
    this.vimeo.setVolume( this.volume );
  }, 10 );
};

proto.update = function( fraction ){
  if( fraction > 0.99 ){
    this.pause();
  }  
}
export default Video;