
$(document).ready(() => {
    
    var product_one = {
        "id": 1,
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
                "discount": 10
            },
            {
                "quantity": 3,
                "discount_price": 10 ,
                "discount": 15
            }
            
        ],
        "discount_price": 10,
        "quantity": 1
    }

    

    const product_card = document.querySelectorAll("#test")


    for (let i=0; i < product_card.length; i++){
        construct_product_card(product_card[i], product_one)  
    }
    

    // adds active class to current view on navbar
    var view="#"+$("#view").data().name;
    $( view ).addClass( "active" );

});


    
