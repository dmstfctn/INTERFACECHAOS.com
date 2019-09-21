import * as VimeoPlayer from "@vimeo/player/dist/player.min.js" ;

const CONFIG = {
  BREAKPOINT: 640
};

let $progress = document.querySelector('.progress');
let $stage_titles = $progress.querySelectorAll('.progress--stage');

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
    if( this.isActive ){
      this.pauseAndAutoResume( 500 );
      this.progress += e.deltaY/1000;
      this.step();
      this.time = this.progress * this.duration;    
    }
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
    if( this.isActive ){      
      this.scrollProgress += e.deltaY/1000;
      console.log('scroll', this.scrollProgress );
      if( this.scrollProgress > 1 ){
        this.scrollProgress = 1;
      }
      if( this.scrollProgress < 0 ){
        this.scrollProgress = 0;
        this._onScrollUp();
      }
    }
  });

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
    this.vimeo.setCurrentTime(0);
    this.$ele.classList.remove('active');
  }

  this._onComplete = () => {
    console.log('video complete');
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
    this.isPlaying = true;
    this.$content.classList.add('playing');
    this.vimeo.play();
    this.unmute();
  }
  
  this.pause = () => {
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
      console.log( 'vol: ', this.volume );
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
    if( window.innerWidth <= CONFIG.BREAKPOINT ){
      this.volume = 1;
      this.unmute();
    }
    this.togglePlay();
  });
}

let Stage = function( _$ele, _opts ){
  this.$ele = _$ele;
  this.opts = Object.assign({
    textDuration: 15000
  }, _opts ); 
  this.isActive = false;
  this.text = new Text( this.$ele.querySelector('.screen__text'), this.opts.textDuration );
  this.video = new Video( this.$ele.querySelector('.screen__video') );
  this.progress = 0;
  this.$progress = this.$ele.querySelector('.progress--indicator');
  this.current = this.text;

  this.text.onComplete = () => {
    this.text.deactivate();
    this.current = this.video;    
    this.video.activate();
    this._onChangeCurrent();
  }

  this.video.onComplete = () => {
    this.deactivate();
    this.current = this.text;
    this._onComplete();
    this._onChangeCurrent();
  }

  this.video.onScrollUp = () => {
    this.video.fadeOut( 1500, () => {
      this.video.deactivate();
      this.current = this.text;
      this.text.activate();
      this._onChangeCurrent();
    });    
  }

  this.text.onProgress = () => {
    let length = this.text.duration + this.video.duration;
    this.progress = this.text.time / length;
    this.update();
  }
  this.video.onProgress = () => {
    let length = this.text.duration + this.video.duration;
    let textProp = this.text.duration / length;
    let videoProp = this.video.time / length;
    this.progress = textProp + videoProp;
    this.update();
  }

  this.activate = () => {
    this.current = this.text;
    this.$ele.classList.add('active');
    this.text.activate();
    this.video.deactivate();
  }
  this.deactivate = () => {
    this.$ele.classList.remove('active');
    this.text.deactivate();
    this.video.deactivate()    
  }

  this._onComplete = () => {
    if( typeof this.onComplete === 'function' ){
      this.onComplete();
    }
  }

  this._onChangeCurrent = () => {
    if( typeof this.onChangeCurrent === 'function' ){
      this.onChangeCurrent();
    }
  }

  this.update = () => {
    this.$progress.style.width = this.progress * 100 + '%';
  }
};

let CreditsStage = function( _$ele ){
  this.$ele = _$ele;
  this.$credits = this.$ele.querySelector('.screen');
  this.$credits_contents = this.$credits.querySelector('.screen--content');
  this.$progress = this.$ele.querySelector('.progress--indicator');
  this.progress = 0;

  this.$credits.addEventListener('scroll', () => {
    console.log( 'scroll',this.$credits.scrollTop, this.$credits.scrollHeight, this.$credits.offsetHeight );
    this.progress = this.$credits.scrollTop / (this.$credits.scrollHeight - this.$credits.offsetHeight);
    console.log( this.progress );
    this.update();
  })

  this.activate = () => {
    this.$credits.classList.add('active');
    this.$ele.classList.add('active');
  }
  this.deactivate = () => {
    this.$credits.classList.remove('active');
    this.$ele.classList.remove('active');
  }

  this.update = () => {
    this.$progress.style.width = this.progress * 100 + '%';
  }

  this.update();
};

let currentStageIndex = -1;
let stages = [ ... document.querySelectorAll('.stage__excerpt') ].map( s => new Stage(s) );
stages.push( new CreditsStage( document.querySelector('.stage__credits')) );

stages.forEach( ( stage, index ) => {
  stage.onComplete = () => {
    if( typeof stages[index + 1] !== 'undefined' ){
      stages[index].deactivate();
      stages[index+1].activate();
      currentStageIndex = index + 1;      
    }
  }
  stage.onChangeCurrent = () => {
    showHideControls();
  }
})

$stage_titles.forEach( ( $title, index ) => {
  $title.querySelector('a').addEventListener( 'click', () => {
    document.body.classList.remove('state__landing');
    stages.forEach( (stage) => {
      stage.deactivate();
    });
    currentStageIndex = index;
    stages[index].activate();
    showHideControls();
  });
});

document.addEventListener('keyup', ( e ) => {
  if( e.which === 32 ){
    stages[currentStageIndex].current.togglePlay();
  }
})

let $fullscreen_btn = document.querySelector('.control__fullscreen');
let $fullscreen_label = $fullscreen_btn.querySelector('.control--label');

document.addEventListener('fullscreenchange', (event) => {
  if (document.fullscreenElement) {
    document.body.classList.add('state__fullscreen');
    $fullscreen_btn .classList.add('state__fullscreen-active');
    $fullscreen_label.innerText = 'exit fullscreen';
  } else {
    document.body.classList.remove('state__fullscreen');
    $fullscreen_btn.classList.remove('state__fullscreen-active');
    $fullscreen_label.innerText = 'fullscreen';
  }
});
$fullscreen_btn.addEventListener( 'click', () => {
  if (!document.fullscreenElement) {
    document.querySelector('.site-wrap')
      .requestFullscreen({ navigationUI: "hide" })        
      .catch( ( err ) => {
        console.log('Could not enter fullscreen');
      });       
  } else {
    document.exitFullscreen();
  }
});


let controlTimeout;
let controlsHidden = false;
let hideControls = function(){
  clearTimeout( controlTimeout );
  controlTimeout = setTimeout( () => {
    document.querySelector('.progress--bar').classList.add('state__hidden');
    document.querySelector('.control__fullscreen').classList.add('state__hidden');
    document.querySelectorAll('.progress--indicator').forEach( indicator => indicator.classList.add('state__hidden') );
  }, 3000 );
}

let showControls = function(){
  clearTimeout( controlTimeout );
  document.querySelector('.progress--bar').classList.remove('state__hidden');
  document.querySelector('.control__fullscreen').classList.remove('state__hidden');
  document.querySelectorAll('.progress--indicator').forEach( indicator => indicator.classList.remove('state__hidden') );
}

let showHideControls = function(){
  showControls();
  if( currentStageIndex >= 0 ){
    if( stages[currentStageIndex].current.TYPE === 'video'){
      hideControls();
    }  
  }
}

document.addEventListener( 'wheel', () => {
  showHideControls();
});



document.addEventListener( 'mousemove', () => {  
  showHideControls();
});