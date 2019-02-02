
$(document).ready(() => {

    // adds active class to current view on navbar
    var page="#"+$("#view").data().name;
    $( page ).addClass( "active" );

    
    if(page.localeCompare("#products")==0){
        const product_card = document.querySelectorAll(".card")

        products = JSON.parse(product_data)

        for (let i=0; i < product_card.length; i++){
            construct_product_card(product_card[i], products.data[i])  
        }
    }

});


    
