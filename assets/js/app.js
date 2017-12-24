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
var controlbar = document.querySelector('.controls');
var buttonRight = document.querySelector('.buttonContainer .buttonPlayVideo');
var isFullscreen = false;
var beforeState = false;
var spam = false;
var timeout = null;
var buttons = '';
var list = "";

var initPage = () => {
    initList();
    initCheckbox();
    document.querySelector('.filmLink').classList.add('active');
    show_description(films.length - 1);
    buttonRight.setAttribute("data-id", films.length - 1);
}

var initList = () => {
    for (var a = films.length - 1; a >= 0; a--) {
        var filmblock = document.createElement("a");
        filmblock.setAttribute('data-id', films[a].id);
        filmblock.setAttribute('class', 'filmLink medium-3 large-2 columns');
        mainContainer.appendChild(filmblock);

        var article = document.createElement("article");
        article.setAttribute('class', 'thumbnails medium-12');
        filmblock.appendChild(article);

        var overlay = document.createElement("div");
        overlay.setAttribute('class', 'overlay');
        article.appendChild(overlay);

        var article_img = document.createElement("img");
        article_img.setAttribute('src', 'assets/img/films/' + films[a].img);
        article.appendChild(article_img);

        var overlay_button = document.createElement("div");
        overlay_button.setAttribute('class', 'buttonPlayVideo');
        overlay.appendChild(overlay_button);

        overlay_button.innerHTML = '<svg class="icon icon-play3"><use xlink:href="#icon-play3"></use></svg>';
        // var overlay_button_img = document.createElement("svg");
        // overlay_button_img.setAttribute('class', 'icon icon-play3');
        // overlay_button.appendChild(overlay_button_img);

        // var overlay_button_svg = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        // overlay_button_svg.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#icon-play3');
        // overlay_button_img.appendChild(overlay_button_svg);
    }
}

var initCheckbox = () => {
    for (var i = 0; i < categories.length; i++) {
        var checkboxContainer = document.createElement("div");
        checkboxContainer.setAttribute('class', 'checkboxContainer');
        filter.appendChild(checkboxContainer);

        var checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('class', 'checkbox');
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

var filter_list = (check, value, count) => {
    if (check.checked) {
        for (let v = 0; v < films.length; v++) {
            const element = films[v];

            if (element.category.toLowerCase() == check.value.toLowerCase()) {
                if (element.title.toLowerCase().indexOf(
                        value) > -1 || element.description.toLowerCase().indexOf(
                        value) > -1) {

                    document.querySelector('[data-id="' + element.id + '"]').style.display = "block";
                    setTimeout(function () {
                        document.querySelector('[data-id="' + element.id + '"]').style.opacity = 1;
                    }, 100);
                } else {
                    document.querySelector('[data-id="' + element.id + '"]').style.opacity = 0;
                    setTimeout(function () {
                        document.querySelector('[data-id="' + element.id + '"]').style.display = "none";
                    }, 250);
                }
            }
        }
    } else {
        count++;
        for (let v = 0; v < films.length; v++) {
            const element = films[v];
            if (element.category.toLowerCase() == check.value.toLowerCase()) {
                if (element.title.toLowerCase().indexOf(
                        value) > -1 || element.description.toLowerCase().indexOf(
                        value) > -1) {

                    document.querySelector('[data-id="' + element.id + '"]').style.opacity = 0;
                    setTimeout(function () {
                        document.querySelector('[data-id="' + element.id + '"]').style.display = "none";
                    }, 250);
                }
            }
        }
    }

    return count;

}

var show_description = (id) => {
    setTimeout(() => {
        var desc = '<h3 class="filmTitle medium-12">' + films[id].title + '</h3>' +
            '<div class="year medium-12">' +
            '<span class="medium-12">' + films[id].year + '</span><span class="medium-12">' + films[id].category + '</span>' +
            '</div>' +
            '<div class="medium-8">' +
            '<p class="miniTitle">Auteur</p>' +
            '<p><a href="' + films[id].author_url + '" target="_BLANK">' + films[id].author + '</a></p>' +
            '</div>' +
            '<div class="medium-4">' +
            '<p class="text-align-center miniTitle">Rating</p>' +
            '<p class="text-align-center note">' + films[id].rating + '</p>' +
            '</div>' +
            '<div class="medium-12">' +
            '<p>Audio : ' + films[id].audio_language + '</p>' +
            '<p>Sous-titre : ' + films[id].sub_language + '</p>' +
            '</div>'

            +
            '<div class="medium-12">' +
            '<h3>Résumé</h3>' +
            '<p>' + films[id].description + '</p>' +
            '</div>';

        descriptionContainer.innerHTML = desc;
        buttonRight.setAttribute("data-id", films[id].id);
        setTimeout(() => {
            descriptionContainer.classList.add('showed');
            spam = false;
        }, 200);
    }, 200)
}

var initVideo = () => {
    playButton.innerHTML = '<img class="buttonImg" src="assets/img/icon_play_petit.svg" alt="">';
    timeline.value = 0;
    controlbar.style.opacity = 1;
    checkVolume(player.volume);
    play();
}

var play = () => {
    if (player.paused) {
        player.play();
        playButton.innerHTML = '<img class="buttonImg" src="assets/img/icon_pause.svg" alt="">';
    } else {
        player.pause();
        controlbar.style.opacity = 1;
        playButton.innerHTML = '<img class="buttonImg" src="assets/img/icon_play_petit.svg" alt="">';
    }

}

var resume = () => {
    controlbar.style.opacity = 1;
    player.currentTime = 0;
    player.pause();
    playButton.innerHTML = '<img class="buttonImg" src="assets/img/icon_play_petit.svg" alt="">';
}

var enterFullscreen = (element) => {
    if (element.requestFullscreen)
        element.requestFullscreen();
    else if (element.mozRequestFullScreen)
        element.mozRequestFullScreen();
    else if (element.webkitRequestFullscreen)
        element.webkitRequestFullscreen();
    else if (element.msRequestFullscreen)
        element.msRequestFullscreen();
}

var exitFullscreen = () => {
    if (document.exitFullscreen)
        document.exitFullscreen();
    else if (document.mozCancelFullScreen)
        document.mozCancelFullScreen();
    else if (document.webkitExitFullscreen)
        document.webkitExitFullscreen();
    else if (document.msExitFullscreen)
        document.msExitFullscreen();
}

var formatTime = () => {
    var player = document.querySelector('.videoPlayer')
    var mins = Math.floor((player.currentTime % 3600) / 60);
    var secs = Math.floor(player.currentTime % 60);
    var minsDuration = Math.floor((player.duration % 3600) / 60);
    var secsDuration = Math.floor(player.duration % 60);
    var timer = document.querySelector('.timer');
    if (secs < 10) {
        secs = "0" + secs;
    }
    if (secsDuration < 10) {
        secsDuration = "0" + secsDuration;
    }
    timer.innerHTML = mins + ":" + secs + " / " + minsDuration + ":" + secsDuration;
    timeline.value = player.currentTime / player.duration * 100;

    if (player.currentTime == player.duration) {
        resume();
    }
}

var show_video = (id) => {
    player.setAttribute('src', 'https://7h3wh1t3r4bb17.pw/hetic-si3/data/' + films[id].src);
    initVideo();
    formatTime()
    modalC.classList.add("--open");

}

var muted = () => {
    if (!player.muted) {
        beforeState = volumeSlider.value;
        player.muted = true;
        volumeSlider.value = 0;
        checkVolume(volumeSlider.value);
    } else {
        player.muted = false;
        if (!beforeState) {
            beforeState = 10;
        }
        volumeSlider.value = beforeState;
        player.volume = beforeState / 10;
        checkVolume(beforeState / 10);
    }
}

var checkVolume = (vol) => {
    if (vol <= 1 && vol > 0.5) {
        mute.innerHTML = '<img src="assets/img/volume-high.svg">';
    } else if (vol <= 0.5 && vol > 0.3) {
        mute.innerHTML = '<img src="assets/img/volume-medium.svg">';
    } else if (vol <= 0.3 && vol > 0) {
        mute.innerHTML = '<img src="assets/img/volume-low.svg">';
    } else if (vol == 0) {
        mute.innerHTML = '<img src="assets/img/volume-mute2.svg">';
    }
}

var search = () => {
    var value = searchbar.value.toLowerCase();
    var checkboxes = document.querySelectorAll(".checkbox");
    for (var i = 0; i < checkboxes.length; i++) {
        filter_list(checkboxes[i], value);
    }
}


var delayer = (callback, delay) => {
    var timeout = null;
    return () => {
        if (timeout) {
            window.clearTimeout(timeout);
        }

        timeout = window.setTimeout(() => {
            timeout = null;
            callback();
        }, delay);
    }
}

initPage();


var toShow = document.querySelectorAll('.filmLink');
var checkboxes = document.querySelectorAll('.checkbox');

for (var i = 0; i < toShow.length; i++) {
    const element = toShow[i];
    element.addEventListener('click', () => {
        if (element.classList.contains('active')) {
            show_video(element.dataset.id - 1);
        } else {
            if (!spam) {
                spam = true;
                if (document.querySelector('.filmLink.active')) {
                    document.querySelector('.filmLink.active').classList.toggle('active');
                }

                element.classList.toggle('active');
                descriptionContainer.classList.remove('showed');
                show_description(element.dataset.id - 1);
            }

        }
    });
}

for (var i = 0; i < checkboxes.length; i++) {
    const element = checkboxes[i];
    element.addEventListener('click', () => {
        var value = searchbar.value.toLowerCase();
        var count = 0;
        for (var i = 0; i < checkboxes.length; i++) {
            count = filter_list(checkboxes[i], value, count);
        }
        console.log(count);
        if (count == 4 && !document.querySelector(".notFound")) {
            var not_found = document.createElement("p");
            not_found.setAttribute("class", "notFound");
            mainContainer.appendChild(not_found);
            not_found.textContent = "Désolé, il n'y a pas de résultat.";
        } else if (document.querySelector(".notFound")) {
            document.querySelector(".notFound").remove();
        }
    });
}

buttonRight.addEventListener('click', () => {
    show_video(buttonRight.dataset.id - 1);
});

fullscreen.addEventListener('click', function () {
    if (!isFullscreen) {
        enterFullscreen(video);
        isFullscreen = true;
    } else {
        exitFullscreen();
        isFullscreen = false;
    }
})

player.addEventListener('dblclick', function () {
    if (!isFullscreen) {
        enterFullscreen(video);
        isFullscreen = true;
    } else {
        exitFullscreen();
        isFullscreen = false;
    }
})

timeline.addEventListener('input', () => {
    var pos = timeline.value;
    player.currentTime = pos * player.duration / 100;
});

mute.addEventListener('click', muted);

player.addEventListener('mousemove', () => {


    controlbar.style.opacity = 1;
    if (!player.paused) {
        if (timeout) {
            window.clearTimeout(timeout);
        }

        timeout = window.setTimeout(() => {
            timeout = null;
            controlbar.style.opacity = 0;
        }, 5000);
    }

});

controlbar.addEventListener('mouseover', () => {
    controlbar.style.opacity = 1;

    if (timeout) {
        window.clearTimeout(timeout);
    }
});

controlbar.addEventListener('mouseout', () => {
    controlbar.style.opacity = 1;
    if (!player.paused) {
        if (timeout) {
            window.clearTimeout(timeout);
        }

        timeout = window.setTimeout(() => {
            timeout = null;
            controlbar.style.opacity = 0;
        }, 5000);
    }
});

volumeSlider.addEventListener('input', () => {
    player.volume = volumeSlider.value / 10;

    if (volumeSlider.value / 10 < 0.1) {
        player.muted = true;
    } else {
        player.muted = false;
    }
    checkVolume(volumeSlider.value / 10);
})

player.addEventListener('timeupdate', formatTime);

searchbar.addEventListener('keyup', delayer(search, 300));

modal.addEventListener("click", () => {
    modalC.classList.remove("--open");
    if (!player.paused) {
        player.pause();
        document.querySelector('.timer').innerHTML = "";
    }
});

const remote = require('electron').remote;

if (remote) {
    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            const titlebar = document.querySelector('.titleBar');

            var titleBarButton = document.createElement("div");
            titleBarButton.setAttribute('class', 'titleBarButton');
            titlebar.appendChild(titleBarButton);

            var minButton = document.createElement("button");
            minButton.setAttribute('class', 'min-btn');
            titleBarButton.appendChild(minButton);
            minButton.innerHTML = '<svg class="icon icon-minus"><use xlink:href="#icon-minus"></use></svg>';

            var maxButton = document.createElement("button");
            maxButton.setAttribute('class', 'max-btn');
            titleBarButton.appendChild(maxButton);
            maxButton.innerHTML = '<svg class="icon icon-enlarge2"><use xlink:href="#icon-enlarge2"></use></svg>';

            var closeButton = document.createElement("button");
            closeButton.setAttribute('class', 'close-btn');
            titleBarButton.appendChild(closeButton);
            closeButton.innerHTML = '<svg class="icon icon-cross"><use xlink:href="#icon-cross"></use></svg>';

            document.querySelector(".min-btn").addEventListener("click", function (e) {
                const window = remote.getCurrentWindow();
                window.minimize();
            });

            document.querySelector(".max-btn").addEventListener("click", function (e) {
                const window = remote.getCurrentWindow();
                if (!window.isMaximized()) {
                    window.maximize();
                } else {
                    window.unmaximize();
                }
            });

            document.querySelector(".close-btn").addEventListener("click", function (e) {
                const window = remote.getCurrentWindow();
                window.close();
            });
        }
    };



}