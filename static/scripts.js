
$(document).ready(() => {
    
    var product_one = {
        "name": "shoes",
        "price": 10,
        "discount_levels": [
            {
                "quantity": 1,
                "discount_price": 10,
                "discount": 0 
            },
            {
                "quantity": 2,
                "discount_price": 10 ,
                "discount": 0
            }
        ],
        "discount_price": 10,
        "quantity": 1
    }

    var get_discounted_price = (percent_to_discount, value, quantity) => {
        var discount = (100 - percent_to_discount) / 100
        var unrounded_figure = discount * value * quantity
        return Number.parseFloat(unrounded_figure).toFixed(2)
    }

    const product_card = document.querySelectorAll("#test")


    for (let i=0; i < product_card.length; i++){
        const product_card_name = document.querySelector("#card_header_button")
        const product_name = document.querySelector("#product_name");
        const product_price = document.querySelector("#product_price");
        const product_post_discount_price = document.querySelectorAll("#product_post_discount_price");
    
        const product_discount_slider = document.querySelectorAll("#product_unit_slider");
        
        product_card_name.innerHTML = product_one.name
        product_name.value = product_one.name
        product_price.value = product_one.price   

        for (let i=0; i < product_discount_slider.length; i++){

            product_post_discount_price[i].innerHTML = "£" + product_one.price*
        
            product_discount_slider[i].addEventListener("input", function () {
                
                product_one.discount_levels[i].discount_price = get_discounted_price(this.value, product_price.value, product_one.discount_levels[i].quantity)
                product_post_discount_price[i].innerHTML = "£" + product_one.discount_levels[i].discount_price
                
            });

            product_price.addEventListener("input", function () {
            
                product_one.price = this.value
                var parsed_product_price = get_discounted_price(product_discount_slider[i].value, this.value, product_one.quantity)
                product_post_discount_price[i].innerHTML = "£" + parsed_product_price
                
            })

        }
    }
    

    // adds active class to current view on navbar
    var view="#"+$("#view").data().name;
    $( view ).addClass( "active" );

});


    
