
$(document).ready(function() {
    // adds active class to current view on navbar
    var view="#"+$("#view").data().name;
    $( view ).addClass( "active" );


    // updates discount values based on user interaction with slider

    var rangeValue = function(){
    var newValue = this.value+"%";
    var target = document.getElementById("unitDisc"+this.dataset.qty);
    target.innerHTML = newValue;
    }

    var elementsArray = document.querySelectorAll('.custom-range');

    elementsArray.forEach(function(elem) {
    elem.addEventListener("input", rangeValue);
});

});


    
