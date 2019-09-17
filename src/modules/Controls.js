let Controls = function( $ele ){
  this.$ele = $ele;
  this.$fullscreen = this.$ele.querySelector('.fullscreen');
  this.$mute = this.$ele.querySelector('.mute')
  this.$subs = this.$ele.querySelector('.subtitles')

  this.$fullscreen.addEventListener( 'click', function(){
    if (!document.fullscreenElement) {
      document.querySelector('.site-wrap')
        .requestFullscreen({ navigationUI: "hide" })
        .catch( ( err ) => {
          alert('no fullscreen');
        })
    } else {
      document.exitFullscreen();
    }
  });
}



let proto = Controls.prototype;

export default Controls;