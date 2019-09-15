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
    this.video = new Video( this.$content.querySelector( 'iframe') );
  } else {
    this.type = 'text';
  }
  this.scrollProgress = 0;
  this.scrollProgressFrac = 0;
  this.scrollMax = this.$ele.offsetHeight;
}

let proto = Screen.prototype;

proto.linkToOthers = function( before, after ){
  this.screenBefore = before;
  this.screenAfter = after;
}

proto.activate = function(){
  this.active = true;
  if( this.type === 'video' ){
    this.video.play();
    this.video.fadeIn();
  }
}

proto.deactivate = function(){
  this.active = false;
  if( this.type === 'video' ){
    this.video.fadeOut();
  }
}


proto.scroll = function( delta ){
  if( this.active ){
    this.scrollProgress += delta;
    if( this.scrollProgress < -10 ){
      this.scrollProgress = -10;
    } else if( this.scrollProgress > this.scrollMax + 10 ){
      this.scrollProgress = this.scrollMax + 10;
    }
    this.scrollProgressFrac = this.scrollProgress/this.scrollMax;
    if( this.scrollProgressFrac > 1 && this.screenAfter ){
      this.deactivate()
      this.screenAfter.activate();
    } else if( this.scrollProgressFrac < 0 && this.screenBefore ){
      this.deactivate();
      this.screenBefore.activate();
    }
  }
}

proto.resize = function(){
  this.scrollProgressFrac = this.scrollProgress/this.scrollMax;
  this.scrollMax = this.$ele.offsetHeight;
  this.scrollProgress = this.scrollProgressFrac * this.scrollMax;
}

proto.update = function(){
  if( this.type === 'video' ){
    this.video.update( this.scrollProgressFrac );
  }  


  if( this.active ){
    this.$ele.classList.add('active');
  } else {
    this.$ele.classList.remove('active');
  }
  this.$content.style.opacity = (1 - this.scrollProgressFrac);
}

export default Screen;