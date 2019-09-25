import Text from './Text.js';
import Video from './Video.js';

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

  // this.video.onScrollUp = () => {
  //   this.video.deactivate();
  //   this.video.fadeOut( 1500, () => {
  //     this.current = this.text;
  //     this.text.activate();
  //     this._onChangeCurrent();
  //   });    
  // }

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
    this.video.preactivate( () => {
      this.video.deactivate();
    });
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

export default Stage;