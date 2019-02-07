
$(document).ready(() => {

    // // adds active class to current view on navbar
    setActiveNav()

    // $.get("static/snippets.html", function(html_string)
    // {
    //     console.log(html_string)
    //     var test = $(html_string).find('#new_discount_level')
    //     console.log(test)

    // },'html'); 

    // const url = "static/snippets.html"
    // async function test(){
    //     var response = await fetch(url);

    // }
    const view = document.getElementById("view").dataset.name 

    if(view.localeCompare("products")==0){
        const product_card = document.querySelectorAll(".card")

        products = JSON.parse(product_data)

        for (let i=0; i < product_card.length; i++){
            construct_product_card(product_card[i], products.data[i])  
        }
    }

});

async function postData(url = ``, data = {}) {
    // Default options are marked with *
        var response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response
    };

function setActiveNav(){

    var meta_view_name = document.getElementById("view").dataset.name;
    var nav_elm = document.getElementById(meta_view_name);
    nav_elm.classList.add("active");

};


    
