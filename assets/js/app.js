var films = data.films;
var categories = data.categories;
var searchbar = document.querySelector('.searchbar');
var mainContainer = document.querySelector('.liste');
var descriptionContainer = document.querySelector('.filmInfo');
var filter = document.querySelector('.filter');
var modalC = document.querySelector('.modalContainer');
var modal = document.querySelector('.modalOverlay');
var player = document.querySelectorAll(".filmLink");
var buttons = '';
var list = "";

var spyshow = function () {
    if (window.innerWidth > 400) {
        for (let i = 0; i < toShow.length; i++) {
            var element = toShow[i];
            if (element.offsetTop < scrollY + (window.innerHeight / 1.2)) {
                element.classList.add("showed");
            }
            if (element.offsetTop > scrollY + (window.innerHeight / 1.2)) {
                element.classList.remove("showed");
            }
        }
    }
}
var buttonsf = function (check, value) {
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
                    },250);
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

var initPage = function(){
    for (var a = films.length - 1; a >= 0; a--) {
        list = list + "<a href='#' data-id='" + films[a].id +
            "' class='filmLink medium-3 columns'><article class='thumbnails medium-12'><div class='overlay'><p class='row align-middle align-center'><img src='assets/img/icon_play.svg'></p></div><img src='assets/img/" + films[a].img +
            "' alt=''></article></a>";
    }
    mainContainer.innerHTML = list;

    document.querySelector('.thumbnails').classList.add('active');

    show_description(films.length - 1);
}


var show_description = function(id){
    var desc = '<h3>'+ films[id].title +'</h3>'
    +'<span class="medium-12">'+ films[id].category +'</span>'
    +'<div class="medium-4">'
        +'<p class="miniTitle">Year</p>'
        +'<p>'+ films[id].year +'</p>'
    +'</div>'
    +'<div class="medium-4">'
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
    setTimeout(function () {
        descriptionContainer.classList.add('showed');
    }, 250);
}

initPage();

var toShow = document.querySelectorAll('.filmLink');

mainContainer.addEventListener('click', function (e) {
    e.preventDefault();
    var current = e.target.parentElement;
    if (current.classList.contains('overlay') || current.classList.contains('active')) {
        modalC.classList.toggle("--open");
    } else {
        if (document.querySelector('.thumbnails.active')) {
            document.querySelector('.thumbnails.active').classList.toggle('active');
        }
        current.classList.toggle('active');
        descriptionContainer.classList.remove('showed');
        show_description(e.target.parentElement.parentElement.dataset.id - 1);
    }
});


for (var i = 0; i < categories.length; i++) {
    buttons += "<div class='checkboxContainer'>"
                    +"<input type='checkbox' class='checkbox' id='" + categories[i] + "'value='" + categories[i] + "' checked/>"
                    +"<label for='" + categories[i] + "'>" + categories[i] + "</label>"
                +"</div>";
}

filter.innerHTML = buttons;

filter.addEventListener('click', function (e) {
    if (e.target.className == "checkbox") {
        var checkboxes = e.target.parentElement.querySelectorAll(".checkbox");
        var value = searchbar.value.toLowerCase();

        for (var i = 0; i < checkboxes.length; i++) {
            buttonsf(checkboxes[i], value)
        }
        spyshow();
    }

});


searchbar.addEventListener('keyup', function () {
    var value = searchbar.value.toLowerCase();
    var checkboxes = document.querySelectorAll(".checkbox");
    for (var i = 0; i < checkboxes.length; i++) {
        buttonsf(checkboxes[i], value)
    }
    spyshow();
});

window.addEventListener('scroll', function () {
    spyshow();
});

window.addEventListener('load', function () {
    spyshow();
});

modal.addEventListener("click", function(){
    modalC.classList.toggle("--open");
})