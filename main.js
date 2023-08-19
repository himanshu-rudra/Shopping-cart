
let shop = document.getElementById('shop');

// ! making the input values inside the cards dynamic  instead hard-coded
// ! hardcoded means we are putting values for each of the values

let shopItemsData = [{
    id: "1",
    name: "casual shirt",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-1.jpg"
},
{
    id: "2",
    name: "office shirt",
    price: 100,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-2.jpg"
},
{
    id: "3",
    name: "Tshirt",
    price: 25,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-3.jpg"
},
{
    id: "4",
    name: "Mens suit",
    price: 400,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "images/img-4.jpg"
}
];


//! this is used to store information which has been included in cart.
//! this will check and get data in local storage 
let basket = JSON.parse(localStorage.getItem('data')) || []; 
 

let generateShop = () => {

    return (shop.innerHTML = shopItemsData.map((item) => {
        let { id, name, price, desc, img } = item;
        //! we had id as string in shopItemsData and id as number in basket                         
        let newId = Number(id);
        let search = basket.find((x) => x.id === newId) || [];
        return (`<div class="item" id=product-id-${id}>
        <img src=${img} width="220" alt="">
        <div class="detail">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">
                    //! conditional operator
                    ${search.item === undefined ? 0 : search.item}
                    </div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
    </div>`)
    }).join("")
    )
}
generateShop();


// ! incrementing, decrementing, updating the cart 

let increment = (idt) => {
    // console.log(idt);
    let search = basket.find((x) => x.id === idt);

    if (search === undefined) {
        basket.push({
            id: idt,
            item: 1,
        });
    }
    else {
        search.item += 1
    }

    // console.log(basket);
    update(idt);
    //! making the value of quantity stick even if page refresh using local storage
    localStorage.setItem("data", JSON.stringify(basket));
}

let decrement = (idt) => {
    // console.log(idt);
    let search = basket.find((x) => x.id === idt);
    if(search === undefined) return; //! to avoid the error which is formed after decrement from 0 from starting 
    else if (search.item === 0) return; //! for stopping the function
    else {
        search.item -= 1
    }

    //! making the value of quantity stick even if page refresh using local storage
    
    update(idt);
    basket = basket.filter((x) => x.item !== 0 ); //! we cant placae this before update because it wont decrement than 1
    localStorage.setItem("data", JSON.stringify(basket));
}

let update = (idt) => {

    let search = basket.find((x) => x.id === idt);
    let valInDe = document.getElementById(idt);
    valInDe.innerHTML = search.item;
    calculation();
}


let calculation = () => {

    let cartIcon = document.getElementById('cartAmount');
    // ! method two by instructor
    cartIcon.textContent = basket.map((element) => element.item).reduce((x, y) => x + y, 0)
}

calculation(); //! this will used to calculate no. of item

