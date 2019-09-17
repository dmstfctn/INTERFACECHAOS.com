let Controls = function( currentScreen ){
  this.$fullscreen = document.querySelector('.control__fullscreen');
  this.$mute = document.querySelector('.control__mute')

  this.setCurrent( currentScreen );

  this.initFullscreen();
  this.initMute();

  this.hideTimeout = false;
  this.hideDelay = 3000;
  this.initHideShow();
}

let proto = Controls.prototype;



proto.hide = function( delay ){
  console.log('controls hide()')
  clearTimeout( this.hideTimeout );
  if( delay ){
    this.hideTimeout = setTimeout(() => {
      this.$fullscreen.classList.add('state__hidden');
      this.$mute.classList.add('state__hidden');
    }, delay );
  } else {
    this.$fullscreen.classList.add('state__hidden');
    this.$mute.classList.add('state__hidden');
  }
}
proto.show = function(){
  console.log('controls show()')
  clearTimeout( this.hideTimeout );
  this.$fullscreen.classList.remove('state__hidden');
  this.$mute.classList.remove('state__hidden');
}

proto.initHideShow = function(){
  document.addEventListener('mousemove', () => {
    clearTimeout( this.hideTimeout );
    this.show();
    if( this.currentScreen.type === 'video' ){
      this.showMute();
      this.hide( this.hideDelay );
    } else {
      this.hideMute();
    }
  });
  document.addEventListener('wheel', ( e ) => {
    clearTimeout( this.hideTimeout );
    this.show();
    if( this.currentScreen.type === 'video' ){
      this.showMute();
      this.hide( this.hideDelay );
    } else {
      this.hideMute();
    }
  });
}

proto.setCurrent = function( currentScreen ){
  this.currentScreen = currentScreen;
  if( this.currentScreen.type === 'video' ){
    this.showMute();
    this.hide( this.hideDelay );
    if( this.currentScreen.video.muted ){
      this.mute()
    } else {
      this.unmute();
    }
  } else {
    this.show();
    this.hideMute();
  }
};


proto._onMute = function(){
  this.$mute.innerText = 'unmute';
  if( typeof this.onMute === 'function'){
    this.onMute();
  }
}

proto._onUnMute = function(){
  this.$mute.innerText = 'mute';
  if( typeof this.onUnMute === 'function'){
    this.onUnMute();
  }
}

proto.mute = function(){
  this._onMute();
  this.isMuted = true;
}

proto.unmute = function(){
  this._onUnMute();
  this.isMuted = false;
}

proto.toggleMute = function(){
  this.isMuted = !this.isMuted;
  if( this.isMuted ){
    this.mute();
  } else {
    this.unmute();
  }
}

proto.initMute = function(){
  this.isMuted = false;
  this.$mute.addEventListener( 'click', () => {
    this.toggleMute();
  });
}

proto.setMuteState = function( state ){
  if( state === true ){
    this.mute();
  } else {
    this.unmute();
  }
}

proto.showMute = function(){
  this.$mute.style.display = 'block';
}

proto.hideMute = function(){
  this.$mute.style.display = 'none';
}

proto.initFullscreen = function(){
  document.addEventListener('fullscreenchange', (event) => {
    if (document.fullscreenElement) {
      this.$fullscreen.innerText = 'exit fullscreen';
    } else {
      this.$fullscreen.innerText = 'fullscreen';
    }
  });
  this.$fullscreen.addEventListener( 'click', () => {
    if (!document.fullscreenElement) {
      document.querySelector('.site-wrap')
        .requestFullscreen({ navigationUI: "hide" })        
        .catch( ( err ) => {
          console.log('Could not enter fullscreen');
        })
        .then( () => {
          this.$fullscreen.innerText = 'exit fullscreen';
        })
    } else {
      document.exitFullscreen();
    }
  });
}

export default Controls;