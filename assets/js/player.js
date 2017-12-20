var player = document.querySelector('#videoplayer');

function play(idPlayer, control) {
  var player = document.querySelector('#' + idPlayer);

  if (player.paused) {
    player.play();
    control.innerHTML = '<img class="boutonplay" src="assets/img/Pause.svg" alt="">';
    setInterval(function() {
      timeline.value = player.currentTime / player.duration * 100
    }, 100)
  } else {
    player.pause();
    control.innerHTML = '<img class="boutonplay" src="assets/img/FS Play petit.svg" alt="">';
  }

}

function resume(idPlayer) {
  var player = document.querySelector('#' + idPlayer);

  player.currentTime = 0;
  player.pause();
}



var volumeSlider = document.querySelector(".volume");

volumeSlider.addEventListener('input', function() {
  player.volume = volumeSlider.value / 10;
})
var timeline = document.querySelector('.timeline')




// timeline.addEventListener('change', function() {
//
//   player.currentTime = timeline.value;
// })
//
// player.addEventListener('timeupdate', update);
//
// function update() {
//   var duration = player.duration;
//   var time = player.currentTime;
//   var fraction = time / duration;
//   var percent = Math.ceil(fraction * 100);
//
//   var timeline = document.querySelector('.timeline')
//   timeline.value = percent;
// }

function formatTime() {
  var mins = Math.floor((player.currentTime % 3600) / 60);
  var secs = Math.floor(player.currentTime % 60);
  var timer = document.querySelector('.timer');
  if (secs < 10) {
    secs = "0" + secs;
  }
  timer.innerHTML = mins + ":" + secs;
}



player.addEventListener('timeupdate', formatTime)

timeline.addEventListener('click', function(e) {
  var pos = (e.pageX - (this.offsetLeft + this.offsetParent.offsetLeft)) / this.offsetWidth;
  player.currentTime = pos * player.duration;
});

var mute = document.querySelector('.mute')

mute.addEventListener('click', function() {
  if (!player.muted) {
    player.muted = true;
    volumeSlider.value = 0;
  } else {
    player.muted = false;
    volumeSlider.value = "";
  }
})

var fullscreen = document.querySelector('.fullscreen');
var video = document.querySelector('.video');
