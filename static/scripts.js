
$(document).ready(function() {
    
    var product_one = {
        "name": "shoes",
        "price": 10,
        "discount_price": 10,
        "currency": "£",
        "quantity": 1
    }
    
    const post_discount_product_price = document.getElementById("post_discount_product_price");
    const product_name = document.getElementById("product_name");
    const product_unit_price = document.getElementById("product_unit_price");
    const product_discount_slider = document.getElementById("product_unit_slider");


    product_discount_slider.addEventListener("input", function(){
        
        product_unit_price.value = product_one.price
        var current_price = product_unit_price.value
        var discount = (100 - this.value) / 100 
        var discounted_product_price = discount * current_price * product_one.quantity
        product_one.discount_price = Number.parseFloat(discounted_product_price).toFixed(2)
        post_discount_product_price.innerHTML = product_one.currency + product_one.discount_price
    
    });
    


    product_unit_price.addEventListener("input", function() {

        var product_discount = (100 - product_discount_slider.value) / 100 
        var discounted_product_price = product_discount * this.value * product_quantity
        var parsed_product_price = Number.parseFloat(discounted_product_price).toFixed(2)
        post_discount_product_price.innerHTML = "£" + parsed_product_price

    })


    // adds active class to current view on navbar
    var view="#"+$("#view").data().name;
    $( view ).addClass( "active" );


    // updates discount values based on user interaction with slider

    // var rangeValue = function(){
        
    //     var newValue = this.value+"%";
    //     var target = document.getElementById("unitDisc"+this.dataset.qty);
    //     target.innerHTML = newValue;
        
    //     var newCost = ((100-this.value)/100) * this.dataset.qty * document.getElementById("unitCost").value;
    //     var target = document.getElementById("cost"+this.dataset.qty);
    //     target.innerHTML = "£"+decimal2(newCost);
    // }

    // var elementsArray = document.querySelectorAll('.custom-range');

    // elementsArray.forEach(function(elem) {
    //     elem.addEventListener("input", rangeValue);
    // });



});

var decimal2 = function (x) {
    return Number.parseFloat(x).toFixed(2);
  }


    
