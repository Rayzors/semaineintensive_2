var filter = document.querySelector(".filter");
var player = document.querySelectorAll(".filmLink");
var buttons = '';

var buttonsf = function (check) {
    if (check.checked) {
        var value = document.querySelector('.searchbar').value.toLowerCase();
            for (let v = 0; v < films.length; v++) {
                const element = films[v];
                
                if (element.category.toLowerCase() == check.value.toLowerCase()) {
                    if(!value){
                        document.querySelector('[data-id="' + element.id + '"]').style.display = "block";                        
                    }
                    if (value && (element.title.toLowerCase().indexOf(
                        value) > -1 || element.description.toLowerCase().indexOf(
                        value) > -1)) {
                            document.querySelector('[data-id="' + element.id + '"]').style.display = "block";
                    }
                }
            }
            
    } else {

        for (let v = 0; v < films.length; v++) {
            const element = films[v];
            if (element.category.toLowerCase() == check.value.toLowerCase()) {
                document.querySelector('[data-id="' + element.id + '"]').style.display = "none";
            }
        }

    }
}

for (var i = 0; i < categories.length; i++) {
    buttons = buttons + "<div class='checkboxContainer'><input type='checkbox' class='checkbox' id='" + categories[i] + "'value='" + categories[i] + "' checked/><label for='" + categories[i] + "'>" + categories[i] + "</label></div>";
}

filter.innerHTML = buttons;

    filter.addEventListener('click', function (e) {
        if (e.target.className == "checkbox") {
            var checkboxes = e.target.parentElement.querySelectorAll(".checkbox");

            for (var i = 0; i < checkboxes.length; i++) {
                buttonsf(checkboxes[i])
            }
            spyshow();
        }

    });
