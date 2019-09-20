import { timingSafeEqual } from "crypto";

let $progress = document.querySelector('.progress');
let $stage_titles = $progress.querySelectorAll('.progress--stage');

let Text = function( _$ele, _duration ){
  this.$ele = _$ele;
  this.$content = this.$ele.querySelector('.screen--content');
  this.duration = _duration;
  this.timerStep = 50;
  this.progressStep = 1 / (this.duration / this.timerStep);
  this.timer = false;
  this.progress = 0;
  this.fadeThreshold = 0.4;
  
  this.activate = () => {
    this.startTimer();
    this.$ele.classList.add('active');
  }
  this.deactivate = () => {
    clearInterval( this.timer );
    this.$ele.classList.remove('active');
  }

  this._onComplete = () => {
    if( typeof( this.onComplete === 'function') ){
      this.onComplete();
    }
  }

  this.startTimer = () => {
    clearInterval( this.timer );
    this.timer = setInterval( () => {
      this.progress += this.progressStep;      
      if( this.progress >= 1 ){
        this._onComplete();
      }
      this.update();
    }, this.timerStep );
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
  this.$ele = _$ele;
  this.$content = this.$ele.querySelector('.screen--content');
  this.activate = () => {
    this.$ele.classList.add('active');
  }
  this.deactivate = () => {
    this.$ele.classList.remove('active');
  }
}

let Stage = function( _$ele, _opts ){
  this.$ele = _$ele;
  this.opts = Object.assign({
    textDuration: 15000
  }, _opts ); 
  this.isActive = false;
  this.text = new Text( this.$ele.querySelector('.screen__text'), this.opts.textDuration );
  this.video = new Video( this.$ele.querySelector('.screen__video') );

  this.text.onComplete = () => {
    this.text.deactivate();
    this.video.activate();
  }

  this.video.onComplete = () => {
    this.deactivate();
    this._onComplete();
  }

  this.activate = () => {
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
    if( typeof( this.onComplete === 'function') ){
      this.onComplete();
    }
  }
};

let CreditsStage = function( _$ele ){
  this.$ele = _$ele;
  this.activate = () => {
    this.$ele.classList.add('active');
  }
  this.deactivate = () => {
    this.$ele.classList.remove('active');
  }
};

let stages = [ ... document.querySelectorAll('.stage__excerpt') ].map( s => new Stage(s) );
stages.push( new CreditsStage( document.querySelector('.stage__credits')) );


$stage_titles.forEach( ( $title, index ) => {
  $title.querySelector('a').addEventListener( 'click', () => {
    document.body.classList.remove('state__landing');
    stages.forEach( (stage) => {
      stage.deactivate();
    });
    stages[index].activate();
  });
})