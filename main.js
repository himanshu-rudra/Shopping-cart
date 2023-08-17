
let shop = document.getElementById('shop');

// ! making the input values inside the cards dynamic  instead hard-coded
// ! hardcoded means we are putting values for each of the values

let shopItemsData = [{
    id: "001",
    name: "casual shirt",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-1.jpg"
},
{
    id: "002",
    name: "office shirt",
    price: 100,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-2.jpg"
},
{
    id: "003",
    name: "Tshirt",
    price: 25,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-3.jpg"
},
{
    id: "004",
    name: "Mens suit",
    price: 400,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-4.jpg"
}
];
let generateShop = () => {

    return (shop.innerHTML = shopItemsData.map((item) => {
        let {id,name,price,desc,img} = item;
        return (`<div class="item" id=product-id-${id}>
        <img src=${img} width="220" alt="">
        <div class="detail">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                    <i class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">0</div>
                    <i class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
    </div>`)
    }).join("")
 )
}


generateShop();