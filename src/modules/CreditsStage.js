let CreditsStage = function( _$ele ){
  this.$ele = _$ele;
  this.$credits = this.$ele.querySelector('.screen');
  this.$credits_contents = this.$credits.querySelector('.screen--content');
  this.$progress = this.$ele.querySelector('.progress--indicator');
  this.progress = 0;
  this.isAuto = true;
  this.autoScrollStep = 1;
  this.timer;
  this.current = {
    type: 'credits',
    togglePlay: () => {
      if( this.isAuto ){
        this.stopAuto();
      } else {
        this.setAuto();
      }
    }
  };

  this.$credits.scrollTop = 0;

  this.setAuto = () => {
    this.isAuto = true;
    clearInterval( this.timer );
    this.timer = setInterval( () => {
      if( this.isAuto ){
        this.$credits.scrollTop += this.autoScrollStep;
      }
    }, 100 );
  };

  this.stopAuto = () => {
    this.isAuto = false;
    clearInterval( this.timer );
  }

  this.$credits.addEventListener('scroll', (e) => {
    this.progress = this.$credits.scrollTop / (this.$credits.scrollHeight - this.$credits.offsetHeight);
    this.update();
  })

  this.activate = () => {
    this.$credits.scrollTop = 0;
    this.setAuto();
    this.$credits.classList.add('active');
    this.$ele.classList.add('active');
  }
  this.deactivate = () => {
    this.stopAuto();
    this.$credits.classList.remove('active');
    this.$ele.classList.remove('active');
  }

  this.update = () => {
    this.$progress.style.width = this.progress * 100 + '%';
  }

  this.update();
};

export default CreditsStage;