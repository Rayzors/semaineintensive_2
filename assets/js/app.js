var films = data.films;
var categories = data.categories;
var searchbar = document.querySelector('.searchbar');
var mainContainer = document.querySelector('.liste');
var descriptionContainer = document.querySelector('.filmInfo');
var filter = document.querySelector('.filter');
var modalC = document.querySelector('.modalContainer');
var modal = document.querySelector('.modalOverlay');
var modalinput = document.querySelector('.modal');
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
var buttons = '';
var list = "";

var initPage = ()=>{
    initList();
    initCheckbox();
    document.querySelector('.filmLink').classList.add('active');
    show_description(films.length - 1);
}

var initList = ()=>{
    for (var a = films.length - 1; a >= 0; a--) {
        var filmblock = document.createElement("a");
        filmblock.setAttribute('data-id',films[a].id);
        filmblock.setAttribute('class','filmLink medium-3 columns');
        mainContainer.appendChild(filmblock);

        var article = document.createElement("article");
        article.setAttribute('class', 'thumbnails medium-12');
        filmblock.appendChild(article);

        var overlay = document.createElement("div");
        overlay.setAttribute('class','overlay');
        article.appendChild(overlay);

        var article_img = document.createElement("img");
        article_img.setAttribute('src','assets/img/films/' + films[a].img);
        article.appendChild(article_img);

        var overlay_button = document.createElement("div");
        overlay_button.setAttribute('class','overlay_button row align-middle align-center');
        overlay.appendChild(overlay_button);

        var overlay_button_img = document.createElement("img");
        overlay_button_img.setAttribute('src','assets/img/icon_play.svg');
        overlay_button.appendChild(overlay_button_img);
    }
}

var initCheckbox = ()=>{
    for (var i = 0; i < categories.length; i++) {
        var checkboxContainer = document.createElement("div");
        checkboxContainer.setAttribute('class','checkboxContainer');
        filter.appendChild(checkboxContainer);

        var checkbox = document.createElement('input');
        checkbox.setAttribute('type','checkbox');
        checkbox.setAttribute('class','checkbox');
        checkbox.setAttribute('id', categories[i]);
        checkbox.setAttribute('value', categories[i]);
        checkbox.setAttribute('checked', true);
        checkboxContainer.appendChild(checkbox)

        var label = document.createElement('label');
        label.setAttribute('for', categories[i]);
        label.textContent = categories[i];
        checkboxContainer.appendChild(label);
    }   
}

var filter_list = (check, value)=>{
    if (check.checked) {
        for (let v = 0; v < films.length; v++) {
            const element = films[v];
            
            if (element.category.toLowerCase() == check.value.toLowerCase()) {
                
                if (element.title.toLowerCase().indexOf(
                        value) > -1 || element.description.toLowerCase().indexOf(
                        value) > -1) {
                            
                    document.querySelector('[data-id="' + element.id + '"]').style.display = "block";
                    setTimeout(function(){
                        document.querySelector('[data-id="' + element.id + '"]').style.opacity = 1;
                    },100);
                }else{
                    document.querySelector('[data-id="' + element.id + '"]').style.opacity = 0;
                    setTimeout(function(){
                        document.querySelector('[data-id="' + element.id + '"]').style.display = "none";
                    },250);
                }
            }
        }
    } else {

        for (let v = 0; v < films.length; v++) {
            const element = films[v];
            if (element.category.toLowerCase() == check.value.toLowerCase()) {
                if (element.title.toLowerCase().indexOf(
                    value) > -1 || element.description.toLowerCase().indexOf(
                    value) > -1) {
                    document.querySelector('[data-id="' + element.id + '"]').style.opacity = 0;
                    setTimeout(function(){
                        document.querySelector('[data-id="' + element.id + '"]').style.display = "none";
                    },250);
                }
            }
        }
    }
}

var show_description = (id) =>{
    setTimeout(()=>{
        var desc = '<h3 class="filmTitle medium-12">'+ films[id].title +'</h3>'
        +'<div class="year medium-12">'
            +'<span class="medium-12">'+ films[id].year +'</span><span class="medium-12">'+ films[id].category +'</span>'
        +'</div>'
        +'<div class="medium-8">'
            +'<p class="miniTitle">Auteur</p>'
            +'<p><a href="'+ films[id].author_url +'" target="_BLANK">'+ films[id].author +'</a></p>'
        +'</div>'
        +'<div class="medium-4">'
            +'<p class="text-align-center miniTitle">Rating</p>'
            +'<p class="text-align-center note">'+ films[id].rating +'</p>'
        +'</div>'
        +'<div class="medium-12">'
            +'<p>Audio : '+ films[id].audio_language +'</p>'
            +'<p>Sous-titre : '+ films[id].sub_language +'</p>'
        +'</div>'
    
        +'<div class="medium-12">'
            +'<h3>Résumé</h3>'
            +'<p>'+ films[id].description +'</p>'
        +'</div>';
        
        descriptionContainer.innerHTML = desc;
        setTimeout(() => {
            descriptionContainer.classList.add('showed');
        }, 200);
    },200)
}

var initVideo = ()=>{
    playButton.innerHTML = '<img class="buttonImg" src="assets/img/icon_play_petit.svg" alt="">';
	player.volume = 1;
	volumeSlider.value = 10;
	timeline.value = 0;
}

var play = ()=>{
	if (player.paused) {
		player.play();
		playButton.innerHTML = '<img class="buttonImg" src="assets/img/icon_pause.svg" alt="">';
	} else {
		player.pause();
		playButton.innerHTML = '<img class="buttonImg" src="assets/img/icon_play_petit.svg" alt="">';
	}

}

var resume = ()=>{
	player.currentTime = 0;
	player.pause();
	playButton.innerHTML = '<img class="buttonImg" src="assets/img/icon_play_petit.svg" alt="">';
}

var enterFullscreen = (element)=> {
	if(element.requestFullscreen)
		element.requestFullscreen();
	else if(element.mozRequestFullScreen)
		element.mozRequestFullScreen();
	else if(element.webkitRequestFullscreen)
		element.webkitRequestFullscreen();
	else if(element.msRequestFullscreen)
		element.msRequestFullscreen();
}

var exitFullscreen = ()=> {
	if(document.exitFullscreen)
		document.exitFullscreen();
	else if(document.mozCancelFullScreen)
		document.mozCancelFullScreen();
	else if(document.webkitExitFullscreen)
		document.webkitExitFullscreen();
	else if(document.msExitFullscreen)
		document.msExitFullscreen();
}

var formatTime = ()=> {
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

var show_video = (id)=>{
    var video_src = document.querySelector(".videoPlayer");
    video_src.setAttribute('src','assets/videos/'+ films[id].src);
    initVideo();
}

initPage();

var toShow = document.querySelectorAll('.filmLink');
var checkboxes = document.querySelectorAll('.checkbox');

for (var i = 0; i < toShow.length; i++) {
    const element = toShow[i];
    element.addEventListener('click', ()=>{
        if (element.classList.contains('active')) {
            show_video(element.dataset.id -1);
            modalC.classList.add("--open");
        } else {
            if (document.querySelector('.filmLink.active')) {
                document.querySelector('.filmLink.active').classList.toggle('active');
            }
            element.classList.toggle('active');
            descriptionContainer.classList.remove('showed');
            show_description(element.dataset.id -1);
        }
    });
}

for (var i = 0; i < checkboxes.length; i++) {
    const element = checkboxes[i];
    element.addEventListener('click', () =>{
            var value = searchbar.value.toLowerCase();
    
            for (var i = 0; i < checkboxes.length; i++) {
                filter_list(checkboxes[i], value);
            }
    });
}

fullscreen.addEventListener('click', function(){
	if (!isFullscreen) {
		enterFullscreen(video);
		isFullscreen = true;
	} else {
		exitFullscreen();
		isFullscreen = false;
	}
	
})

timeline.addEventListener('click', ()=>{
	var pos = timeline.value;
	player.currentTime = pos * player.duration /100;
});

mute.addEventListener('click', ()=>{
	if (!player.muted) {
		beforeState = volumeSlider.value;
		player.muted = true;
		volumeSlider.value = 0;
	} else {
		player.muted = false;
		volumeSlider.value = beforeState;
	}
})

volumeSlider.addEventListener('input', ()=> {
	player.volume = volumeSlider.value / 10;
})

player.addEventListener('timeupdate', formatTime);

searchbar.addEventListener('keyup', ()=>{
    var keyupTimer = null;    
    if(keyupTimer){
        window.clearTimeout(keyupTimer);
    }
        
    keyupTimer = setTimeout(()=>{
        keyupTimer = null;
        var value = searchbar.value.toLowerCase();
        var checkboxes = document.querySelectorAll(".checkbox");
        for (var i = 0; i < checkboxes.length; i++) {
            filter_list(checkboxes[i], value);
        }        
    },500);
    
});

modal.addEventListener("click", ()=>{
    modalC.classList.remove("--open");
    var delete_video = modalinput.querySelector('video');
    if(delete_video){
        delete_video.setAttribute('src', '');
    }
})