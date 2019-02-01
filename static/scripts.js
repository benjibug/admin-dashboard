
$(document).ready(() => {
    
    var product_one = {
        "id": 4,
        "name": "hello",
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
                "discount": 10
            },
            {
                "quantity": 3,
                "discount_price": 10 ,
                "discount": 15
            }
            
        ],
        // "discount_price": 10,
        // "quantity": 1,
        "stock": null
    }

    const product_card = document.querySelectorAll("#test")

    products = JSON.parse(product_data)

    for (let i=0; i < product_card.length; i++){
        construct_product_card(product_card[i], products.data[i])  
    }
    
    // adds active class to current view on navbar
    var view="#"+$("#view").data().name;
    $( view ).addClass( "active" );

});


    
