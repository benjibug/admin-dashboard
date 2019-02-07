
let get_discounted_price = (percent_to_discount, value, quantity) => {
    const discount = (100 - percent_to_discount) / 100
    const unrounded_figure = discount * value * quantity
    return Number.parseFloat(unrounded_figure).toFixed(2)
}

let construct_product_card = (card, product_data) => {

    const product_card_name = card.querySelector("#card_header_button");
    const product_name = card.querySelector("#product_name");
    const product_price = card.querySelector("#product_price");

    product_card_name.innerHTML = product_data.name
    product_name.value = product_data.name
    product_price.value = product_data.price   

    product_name.addEventListener("input", function (){

        product_data.name = this.value
        $(card).find('.alert').show()    
        
    })

    const product_post_discount_price = card.querySelectorAll("#product_post_discount_price");
    const product_discount = card.querySelectorAll("#product_discount");
    const product_slider_label = card.querySelectorAll("#product_slider_label");
    const product_discount_slider = card.querySelectorAll("#product_unit_slider");

    for (let i=0; i < product_discount_slider.length; i++){

        product_slider_label[i].innerHTML = product_data.discount_levels[i].quantity + " x unit discount"

        product_post_discount_price[i].innerHTML = "£" + get_discounted_price(product_data.discount_levels[i].discount, product_data.price, product_data.discount_levels[i].quantity)
        product_discount[i].innerHTML = product_data.discount_levels[i].discount + "%"
        product_discount_slider[i].value = product_data.discount_levels[i].discount

        // slider listener to update unit price tag
        product_discount_slider[i].addEventListener("input", function () {
            
            product_data.discount_levels[i].discount_price = get_discounted_price(this.value, product_price.value, product_data.discount_levels[i].quantity)
            product_data.discount_levels[i].discount = parseFloat(this.value)
            product_post_discount_price[i].innerHTML = "£" + product_data.discount_levels[i].discount_price
            product_discount[i].innerHTML = this.value + "%"
            $(card).find('.alert').show()
            
        });

        // price input listener to update all unit price tags
        product_price.addEventListener("input", function () {
        
            product_data.price = this.value
            product_data.discount_levels[i].discount_price = get_discounted_price(product_discount_slider[i].value, this.value, product_data.discount_levels[i].quantity)
            product_post_discount_price[i].innerHTML = "£" + product_data.discount_levels[i].discount_price
            $(card).find('.alert').show()
            
        })
    }
    
    // Save product data for product on card
    const save_button = card.querySelector("#save_button")

    save_button.addEventListener("click", async function(){
        
        var response = await postData("/products", product_data)
        if(response.ok) {$('.alert').hide()}; 

    })

    // Add new discount slider to a product card
    const new_discount_level = document.getElementById("new_discount_level");
    const new_discount_button = card.querySelector("#new_discount_button")
    const discount_level_widgets = card.querySelector("#discount_level_widgets")

    new_discount_button.addEventListener("click", function(){

        var fragment = new_discount_level.cloneNode(true)
        fragment.removeAttribute("hidden")
        discount_level_widgets.append(fragment)
        
    })

};