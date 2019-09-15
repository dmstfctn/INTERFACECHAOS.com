import Video from "./Video.js";

let Screen = function( $ele ){
  this.$ele = $ele;
  this.$content = $ele.querySelector('.screen--content');
  this.active = false;
  this.type = '';
  if( this.$ele.classList.contains( 'screen__text__credits' ) ){
      this.type = 'credits';
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
  this.scrollProgress = 0;
  this.scrollProgressFrac = 0;
  this.scrollMax = ( this.type === 'credits' ) ? this.$ele.scrollHeight : this.$ele.offsetHeight/2;  
  this.scrollMin = ( this.type === 'credits' ) ? this.$ele.offsetHeight * -0.1 : 0;
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

proto.preload = function(){
  if( this.type === 'video' ){
    this.video.play();    
  }
}

proto.activate = function(){
  this.active = true;
  this.$ele.classList.add( 'active' );
  this.scrollProgress = 0;
  this.scrollProgressFrac = 0;
  if( this.type === 'video' ){
    this.video.play();
    this.video.fadeIn(1500);
  }
  if( this.type === 'credits' ){
    this.$content.scrollTop = 0;
  }
  this.update();
}

proto.deactivate = function(){
  this.active = false;
  this.$ele.classList.remove('active');
  if( this.type === 'video' ){
    this.video.fadeOut(1500, () => {
      this.video.pause();
    });
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
    if( this.scrollProgressFrac > 1 && this.screenAfter ){
      this.deactivate()
      this.screenAfter.activate();
    } else if( this.scrollProgressFrac < this.scrollMin / this.scrollMax && this.screenBefore ){
      this.deactivate();
      this.screenBefore.activate();
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
  }  

  this.$content.style.opacity = (1 - this.scrollProgressFrac);
}

export default Screen;