
// Constructor function for slider widget

function SliderWidget(

    product_post_discount_price,
    product_discount,
    product_slider_label,
    product_discount_slider,
    product_discount_data,
    product_price

) {

    this.product_post_discount_price = product_post_discount_price;
    this.product_discount = product_discount;
    this.product_slider_label = product_slider_label;
    this.product_discount_slider = product_discount_slider;
    this.product_discount_data = product_discount_data;
    this.product_price = product_price;

    this.setProductSlider = function () {

        this.product_slider_label.innerHTML = this.product_discount_data.quantity + " x unit discount"
        this.product_post_discount_price.innerHTML = "£" + get_discounted_price(this.product_discount_data.discount, this.product_price, this.product_discount_data.quantity)
        this.product_discount.innerHTML = this.product_discount_data.discount + "%"
        this.product_discount_slider.value = this.product_discount_data.discount

    };

    this.updateProductSlider = function () {

        this.product_discount_data.discount = parseFloat(this.product_discount_slider.value)
        let discount_price = get_discounted_price(
            this.product_discount_slider.value,
            this.product_price,
            this.product_discount_data.quantity
        )
        this.product_post_discount_price.innerHTML = "£" + discount_price
        this.product_discount.innerHTML = this.product_discount_slider.value + "%"
    }
};

let addSliderEventListeners = (SliderObject, card, product_data) => {

    const product_price = card.querySelector("#product_price");

    product_price.addEventListener("input", function () {
        
        product_data.price = this.value;
        SliderObject.product_price = this.value;
        SliderObject.updateProductSlider();
        $(card).find('.alert').show();
    })

    SliderObject.product_discount_slider.addEventListener("input", function () {
        SliderObject.updateProductSlider();
        $(card).find('.alert').show();
    });

};

let get_discounted_price = (percent_to_discount, value, quantity) => {
    const discount = (100 - percent_to_discount) / 100;
    const unrounded_figure = discount * value * quantity;
    return Number.parseFloat(unrounded_figure).toFixed(2);
};

let construct_product_card = (card, product_data) => {

    console.log(product_data)

    const product_card_name = card.querySelector("#card_header_button");
    const product_name = card.querySelector("#product_name");
    const product_price = card.querySelector("#product_price");

    product_card_name.innerHTML = product_data.name;
    product_name.value = product_data.name;
    product_price.value = product_data.price;

    product_name.addEventListener("input", function () {

        product_data.name = this.value
        $(card).find('.alert').show()

    })

    // const product_discount_slider_count = product_data.discount_levels.length;

    const product_post_discount_price = card.querySelectorAll("#product_post_discount_price");
    const product_discount = card.querySelectorAll("#product_discount");
    const product_slider_label = card.querySelectorAll("#product_slider_label");
    const product_discount_slider = card.querySelectorAll("#product_unit_slider");

    for (let i = 0; i < product_data.discount_levels.length; i++) {

        let SliderWidgetObj = new SliderWidget(
            product_post_discount_price[i],
            product_discount[i],
            product_slider_label[i],
            product_discount_slider[i],
            product_data.discount_levels[i],
            product_data.price
        );

        SliderWidgetObj.setProductSlider();

        addSliderEventListeners (SliderWidgetObj, card, product_data); 
        
    };

    // Save product data for product on card
    const save_button = card.querySelector("#save_button")

    save_button.addEventListener("click", async function () {

        var response = await postData("/products", product_data)
        if (response.ok) { 
            $('.alert').hide();
            product_card_name.innerHTML = product_data.name
        };

    })

    // Add new discount slider to a product card
    const new_discount_level = document.querySelector("#new_discount_level");
    const new_discount_button = card.querySelector("#new_discount_button")
    const discount_level_widgets = card.querySelector("#discount_level_widgets")

    new_discount_button.addEventListener("click", function () {

        var fragment = new_discount_level.cloneNode(true)
        fragment.removeAttribute("hidden", "id")
        discount_level_widgets.append(fragment)

        let new_discount_level_data = {
            discount: 0,
            product_id: product_data.id,
            quantity: 0
        }

        product_data.discount_levels.push(new_discount_level_data)

        let NewSliderWidgetObj = new SliderWidget(
            fragment.querySelector("#product_post_discount_price"),
            fragment.querySelector("#product_discount"),
            fragment.querySelector("#product_slider_label"),
            fragment.querySelector("#product_unit_slider"), 
            product_data.discount_levels[product_data.discount_levels.length-1],
            product_data.price
        )

        NewSliderWidgetObj.setProductSlider();

        addSliderEventListeners (NewSliderWidgetObj, card, product_data); 

        const product_discount_quatity = fragment.querySelector("#product_discount_quatity");

        product_discount_quatity.addEventListener("input", function(){
            NewSliderWidgetObj.product_discount_data.quantity = this.value;
            NewSliderWidgetObj.updateProductSlider()
        })


    })

};