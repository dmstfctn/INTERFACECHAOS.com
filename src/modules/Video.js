import * as VimeoPlayer from "@vimeo/player/dist/player.min.js" ;
import CONFIG from './CONFIG.js';

let Video = function( _$ele ){
  this.TYPE = 'video';
  this.$ele = _$ele;
  this.$content = this.$ele.querySelector('.screen--content');
  this.$overlay = this.$ele.querySelector('.video-overlay');
  this.duration = this.$content.dataset.video_length;    
  this.progress = 0;
  this.time = 0;
  this.muted = true;
  this.volume = 1;
  this.scrollProgress = 0.5;
  this.isActive = false;

  this.isPlaying = false;
  this.vimeo = new VimeoPlayer( 
    this.$content, 
    {
      id: this.$content.dataset.vimeo_id,
      width: window.innerWidth,
      autoplay: false,
      controls: false,
      autopause: true
    } 
  );
  this.vimeo.getDuration().then( duration => this.duration = duration * 1000 );
  this.$content = this.$ele.querySelector('.screen--content');
  
  this.$ele.addEventListener( 'wheel', ( e ) => {
    if( this.isActive && window.innerWidth > CONFIG.BREAKPOINT ){      
      this.scrollProgress += e.deltaY/1000;
      if( this.scrollProgress > 1 ){
        this.scrollProgress = 1;
      }
      if( this.scrollProgress < 0 ){
        this.scrollProgress = 0;
        this._onScrollUp();
      }
    }
  });

  this.preactivate = ( _callback ) => {
    console.log('preactivate')
    this.vimeo.play().then( () => {
      console.log( 'preactivated' );
      this.vimeo.pause();
      if( typeof _callback === 'function' ){
        _callback();
      };
    });
  }

  this.activate = () => {
    this.volume = 1;
    this.isActive = true;
    this.play();
    this.$ele.classList.add('active');
  }
  this.deactivate = () => {
    this.isActive = false;
    this.pause();
    this.progress = 0;
    this.time = 0;
    this.vimeo.setCurrentTime(1);
    this.$ele.classList.remove('active');
  }

  this._onComplete = () => {
    if( typeof( this.onComplete === 'function') ){
      this.onComplete();
    }
  }
  this._onScrollUp = () => {
    if( typeof( this.onScrollUp === 'function') ){
      this.onScrollUp();
    }
  }

  this._onProgress = () => {
    if( typeof this.onProgress === 'function' ){
      this.onProgress();
    }
  }
  
  this.play = () => {
    console.log('video play')
    this.isPlaying = true;
    this.$content.classList.add('playing');
    this.vimeo.play();
    this.unmute();
  }
  
  this.pause = () => {
    console.log('video pause')
    this.isPlaying = false;
    this.$content.classList.remove('playing');
    this.vimeo.pause();
  }

  this.togglePlay = () => {
    if( this.isPlaying ){
      this.pause();
    } else {
      this.play();
    }
  }

  this.mute = () => {
    this.muted = true;
    this.vimeo.setVolume( 0 );
  }
  
  this.unmute = () => {
    this.muted = false;
    this.vimeo.setVolume( this.volume );
  }

  this.fadeIn = ( _time, _callback ) => {  
    let time = _time || 100;
    let callback = _callback || function(){};
    clearInterval( this.fadeLoop );
    let change = 1 - this.volume;
    let step = change / (time / 10);
    this.fadeLoop = setInterval(() => {
      this.volume += step;
      if( this.volume >= 1 ){
        this.volume = 1; 
        callback();
        clearInterval( this.fadeLoop );
      }    
      if( !this.muted ){
        this.vimeo.setVolume( this.volume );
      }
    }, 10 );
  };

  this.fadeOut = ( _time, _callback ) => {  
    let time = _time || 100;
    let callback = _callback || function(){};  
    clearInterval( this.fadeLoop );
    let change = -this.volume;
    let step = change / (time / 10);  
    this.fadeLoop = setInterval(() => {
      this.volume += step;
      if( this.volume <= 0 ){
        this.volume = 0; 
        callback();
        clearInterval( this.fadeLoop );
      }
      if( !this.muted ){
        this.vimeo.setVolume( this.volume );
      }
    }, 10 );
  };

  this.vimeo.on('timeupdate', ( t ) => {
    this.time = t.seconds * 1000;
    this.progress = t.seconds / t.duration;
    this.duration = t.duration * 1000;
    
    this._onProgress();
    if( t.seconds >= t.duration - 2 ){
      this._onComplete();
    }
  });

  this.$overlay.addEventListener('click', () => {
    this.volume = 1;
    this.unmute();
    this.togglePlay();
  });
}

export default Video;