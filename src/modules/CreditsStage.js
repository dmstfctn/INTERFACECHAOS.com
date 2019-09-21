let CreditsStage = function( _$ele ){
  this.$ele = _$ele;
  this.$credits = this.$ele.querySelector('.screen');
  this.$credits_contents = this.$credits.querySelector('.screen--content');
  this.$progress = this.$ele.querySelector('.progress--indicator');
  this.progress = 0;

  this.$credits.addEventListener('scroll', () => {
    this.progress = this.$credits.scrollTop / (this.$credits.scrollHeight - this.$credits.offsetHeight);
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

export default CreditsStage;