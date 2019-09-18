import Video from "./Video.js";

let Screen = function( $ele ){
  this.$ele = $ele;
  this.$content = $ele.querySelector('.screen--content');
  this.active = false;
  this.type = '';
  this.contentScrollProgressFrac = 0;
  if( this.$ele.classList.contains( 'screen__text__credits' ) ){
    this.type = 'credits';
    this.$ele.addEventListener('scroll', ( e ) => {
      this.contentScrollProgressFrac = this.$ele.scrollTop / (this.$ele.scrollHeight - this.$ele.offsetHeight);
      this._onProgress();
    });
  } else if( this.$ele.classList.contains( 'screen__video' ) ){
    this.type = 'video';    
    this.video = new Video( this.$content.dataset.vimeo_id, this.$content );
    this.video.onProgress = () => {
      this._onProgress();
    };
    this.video.onEnded = () => {
      this.deactivate();
      this.screenAfter.activate();
    }
  } else {
    this.type = 'text';
  }  
  this.scrollMax = ( this.type === 'credits' ) ? this.$content.scrollHeight : this.$ele.offsetHeight;  
  this.scrollMin = ( this.type === 'credits' ) ? this.$ele.offsetHeight * -0.1 : 0;
  this.scrollProgress = this.scrollMax * 0.2;  
  this.scrollProgressFrac = 0;
}

let proto = Screen.prototype;

proto.linkToOthers = function( before, after ){
  this.screenBefore = before;
  this.screenAfter = after;
}

proto._onProgress = function(){
  if( typeof this.onProgress === 'function' && this.active ){
    this.onProgress();
  }
}

proto._onActivated = function(){
  if( typeof this.onActivated === 'function' ){
    this.onActivated( this );
  }
}

proto._onActivateStart = function(){
  if( typeof this.onActivateStart === 'function' ){
    this.onActivateStart( this );
  }
}

proto.preload = function(){
  if( this.type === 'video' ){
    this.video.play();    
  }
}

proto.setMuteState = function( state ){
  if( this.type === 'video' ){
    this.video.muted = state;
  }
}

proto.activate = function( _callback ){
  let callback = _callback || function(){};
  this._onActivateStart();
  this.active = true;
  this.$ele.classList.add( 'active' );
  this.scrollProgress = this.scrollMax * 0.2;
  this.scrollProgressFrac = 0;  
  if( this.type === 'video' ){
    this.video.play();
    this.video.fadeIn(1500, () => {
      this._onActivated();
      callback();
    });    
  } else if( this.type === 'credits' ){
    this.$ele.scrollTop = 0;
    this._onActivated();
    callback();
  } else {
    this._onActivated();
    callback();
  }
  this.update();
}

proto.deactivate = function( _callback ){
  let callback = _callback || function(){};
  this.active = false;
  this.$ele.classList.remove('active');
  if( this.type === 'video' ){
    this.video.fadeOut( 1500, () => {
      this.video.pause();
      callback();
    });
  } else{
    callback();
  }
}


proto.scroll = function( delta ){
  if( this.active ){
    this.scrollProgress += delta;
    if( this.scrollProgress < this.scrollMin -10 ){
      this.scrollProgress = this.scrollMin -10;
    } else if( this.scrollProgress > this.scrollMax + 10 ){
      this.scrollProgress = this.scrollMax + 10;
    }
    this.scrollProgressFrac = this.scrollProgress/this.scrollMax;
    if( this.scrollProgressFrac > 0.75 && this.screenAfter ){
      this.deactivate( () => {
        this.screenAfter.activate();
      });      
    } else if( this.scrollProgressFrac < this.scrollMin / this.scrollMax && this.screenBefore ){
      this.deactivate( () => {
        this.screenBefore.activate();
      });      
    }
    if( this.scrollProgressFrac > 0.25 && this.screenAfter.type === 'video' ){
      this.screenAfter.preload();
    } 
  }
}

proto.resize = function(){
  this.scrollProgressFrac = this.scrollProgress/this.scrollMax;
  this.scrollMax = ( this.type === 'credits' ) ? this.$ele.scrollHeight : this.$ele.offsetHeight;
  this.scrollProgress = this.scrollProgressFrac * this.scrollMax;
}

proto.update = function(){
  if( this.type === 'video' ){
    this.video.update( this.scrollProgressFrac );
    if( this.scrollProgressFrac > 0.75 ){
      this.$content.style.opacity = (0.25 - (this.scrollProgressFrac - 0.75)) * (1/0.25);
    } else {
      this.$content.style.opacity = 1;
    }
  } else if( this.type === 'text' ) {
    if( this.scrollProgressFrac > 0.2 ){
      this.$content.style.opacity = (0.8 - (this.scrollProgressFrac - 0.2)) * (1/0.8);
    } else {
      this.$content.style.opacity = 1;
    }
  }
}

export default Screen;