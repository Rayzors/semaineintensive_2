var films = data.films;
var categories = data.categories;
var searchbar = document.querySelector('.searchbar');
var mainContainer = document.querySelector('.main .row');
var descriptionContainer = document.querySelector('.right');
var filter = document.querySelector('.filter');
var list = "";
var button = "";

for (var a = films.length - 1; a >= 0; a--) {
    list = list + "<a href='#' data-id='" + films[a].id +
        "' class='filmLink medium-3 columns'><article class='thumbnails medium-12'><img src='assets/img/test.jpg' alt=''></article></a>";
    // list = list + "<a href='#' data-id='" + films[a].id +
    //     "' class='filmLink medium-3 columns'><article class='thumbnails medium-12'><img src='assets/img/test.jpg' alt=''>" + films[a].title +
    //     "</article></a>";
}
mainContainer.innerHTML = list;

mainContainer.addEventListener('click', function (e) {
    e.preventDefault();
    if (document.querySelector('.thumbnails.active')) {
        document.querySelector('.thumbnails.active').classList.toggle('active');
    }
    e.target.parentElement.classList.toggle('active');
    descriptionContainer.innerHTML = "<h2>" + films[e.target.parentElement.parentElement.dataset.id - 1].title + "</h2>" + films[e.target.parentElement.parentElement.dataset.id - 1].description + "<br />" + films[e.target.parentElement.parentElement.dataset.id - 1].category + "<br />";
});


searchbar.addEventListener('keyup', function () {
    var value = searchbar.value.toLowerCase();
    list = "";
    for (var b = films.length - 1; b >= 0; b--) {
        let element = films[b];
        if (element.title.toLowerCase().indexOf(
                value) > -1 || element.description.toLowerCase().indexOf(
                value) > -1) {
            // var theElem = document.querySelector('[data-id="' + element.id + '"]');
            // theElem.style.display = "block";
            list = list + "<a href='#' data-id='" + films[b].id +
                "' class='filmLink medium-3 columns'><article class='thumbnails medium-12'><img src='assets/img/test.jpg' alt=''></article></a>";
            descriptionContainer.innerHTML = "";
        }
    }
    mainContainer.innerHTML = list;

});