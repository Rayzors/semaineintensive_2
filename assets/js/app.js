var films = data.films;
var categories = data.categories;
var searchbar = document.querySelector('.searchbar');
var mainContainer = document.querySelector('.liste');
var descriptionContainer = document.querySelector('.filmInfo');
var filter = document.querySelector('.filter');
var list = "";
var button = "";

var spyshow = function(){
    if(window.innerWidth > 400){
        for (let i = 0; i < toShow.length; i++) {
            var element = toShow[i];
            if (element.offsetTop < scrollY + (window.innerHeight /1.2)) {
                element.classList.add("showed");
            }
            if (element.offsetTop > scrollY + (window.innerHeight /1.2)) {
                element.classList.remove("showed");
            }
        }
    }
}

for (var a = films.length - 1; a >= 0; a--) {
    list = list + "<a href='#' data-id='" + films[a].id +
        "' class='filmLink medium-3 columns'><article class='thumbnails medium-12'><div class='overlay'><p>play</p></div><img src='assets/img/" + films[a].img +
        "' alt=''></article></a>";
    // list = list + "<a href='#' data-id='" + films[a].id +
    //     "' class='filmLink medium-3 columns'><article class='thumbnails medium-12'><img src='assets/img/test.jpg' alt=''>" + films[a].title +
    //     "</article></a>";
}
mainContainer.innerHTML = list;

var toShow = document.querySelectorAll('.filmLink');

mainContainer.addEventListener('click', function (e) {
    e.preventDefault();
    var current = e.target.parentElement;
    if(current.classList.contains('overlay') || current.classList.contains('active')){
        alert('il y aura une modal');
    }else{
        if (document.querySelector('.thumbnails.active')){
            document.querySelector('.thumbnails.active').classList.toggle('active');
        }
        current.classList.toggle('active');
        descriptionContainer.classList.remove('showed');
        setTimeout(function(){
            descriptionContainer.innerHTML = "<h2>" + films[e.target.parentElement.parentElement.dataset.id - 1].title + "</h2>" + films[e.target.parentElement.parentElement.dataset.id - 1].description + "<br />" + films[e.target.parentElement.parentElement.dataset.id - 1].category + "<br />";
            descriptionContainer.classList.add('showed');
        },250);
    }
});


searchbar.addEventListener('keyup', function () {
    var value = searchbar.value.toLowerCase();
    for (var b = films.length - 1; b >= 0; b--) {
        let element = films[b];
        if (element.title.toLowerCase().indexOf(
                value) > -1 || element.description.toLowerCase().indexOf(
                value) > -1) {
            var theElem = document.querySelector('[data-id="' + element.id + '"]');
            theElem.style.display = "block";
        }else{
            var theElem = document.querySelector('[data-id="' + element.id + '"]');
            theElem.style.display = "none";
        }
    }
});

window.addEventListener('scroll', function(){
    spyshow();
});

window.addEventListener('load', function(){
    spyshow();
});