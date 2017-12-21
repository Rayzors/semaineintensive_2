var player = document.querySelector('.videoPlayer');
var fullscreen = document.querySelector('.fullscreen');
var video = document.querySelector('.video');
var playButton = document.querySelector('.playButton');
var stopButton = document.querySelector('.stopButton');
var volumeSlider = document.querySelector(".volume");
var timeline = document.querySelector('.timeline');
var mute = document.querySelector('.mute');
var isFullscreen = false;
var beforeState = 0;

var initVideo = function(){
	player.volume = 1;
	volumeSlider.value = 10;
	timeline.value = 0;
}

var play = function() {
	if (player.paused) {
		player.play();
		playButton.innerHTML = '<img class="buttonImg" src="assets/img/icon_pause.svg" alt="">';
	} else {
		player.pause();
		playButton.innerHTML = '<img class="buttonImg" src="assets/img/icon_play_petit.svg" alt="">';
	}

}

var resume = function(){
	player.currentTime = 0;
	player.pause();
	playButton.innerHTML = '<img class="buttonImg" src="assets/img/icon_play_petit.svg" alt="">';
}

var enterFullscreen = function(element) {
	if(element.requestFullscreen)
		element.requestFullscreen();
	else if(element.mozRequestFullScreen)
		element.mozRequestFullScreen();
	else if(element.webkitRequestFullscreen)
		element.webkitRequestFullscreen();
	else if(element.msRequestFullscreen)
		element.msRequestFullscreen();
}

var exitFullscreen = function() {
	if(document.exitFullscreen)
		document.exitFullscreen();
	else if(document.mozCancelFullScreen)
		document.mozCancelFullScreen();
	else if(document.webkitExitFullscreen)
		document.webkitExitFullscreen();
	else if(document.msExitFullscreen)
		document.msExitFullscreen();
}

var formatTime = function() {
	var mins = Math.floor((player.currentTime % 3600) / 60);
	var secs = Math.floor(player.currentTime % 60);
	var minsDuration = Math.floor((player.duration % 3600) / 60);
	var secsDuration = Math.floor(player.duration % 60);
	var timer = document.querySelector('.timer');
	if (secs < 10) {
		secs = "0" + secs;
	}
	if(secsDuration < 10){
		secsDuration = "0" + secsDuration;
	}
	timer.innerHTML = mins + ":" + secs + " / " + minsDuration + ":" + secsDuration;
	timeline.value = player.currentTime / player.duration * 100;
}

fullscreen.addEventListener('click', function(){
	if (!isFullscreen) {
		enterFullscreen(video);
		isFullscreen = true;
	} else {
		exitFullscreen(video);
		isFullscreen = false;
	}
	
})

timeline.addEventListener('click', function(e){
	var pos = (e.pageX - (this.offsetLeft + this.offsetParent.offsetLeft)) / this.offsetWidth;
	player.currentTime = pos * player.duration;
});

mute.addEventListener('click', function(){
	if (!player.muted) {
		beforeState = volumeSlider.value;
		player.muted = true;
		volumeSlider.value = 0;
	} else {
		player.muted = false;
		volumeSlider.value = beforeState;
	}
})

volumeSlider.addEventListener('input', function () {
	player.volume = volumeSlider.value / 10;
})

player.addEventListener('timeupdate', formatTime);