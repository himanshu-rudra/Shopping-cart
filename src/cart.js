let basket = JSON.parse(localStorage.getItem('data')) || []; 
let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');




let calculation = () => {

    let cartIcon = document.getElementById('cartAmount');
    // ! method two by instructor
    cartIcon.textContent = basket.map((element) => element.item).reduce((x, y) => x + y, 0)
}

calculation(); //! this will used to calculate no. of item

let generateCartItem = () => {

    if(basket.length !== 0){
        // ! when cart is not empty
        return(
            shoppingCart.innerHTML = basket.map((x) =>{
                let { id,item } = x;
                let search = shopItemsData.find((y) => Number(y.id) === id ) || [] ;
                return `
                <div class="cart-item">
                <img  width="100" src="${search.img}" alt=""/>
                <div class="details">
                    <div class="title-price-x">
                        <h4>
                            <p>${search.name}</p>
                            <p>$ ${search.price}</p>
                        </h4>
                        <i class="bi bi-x-lg"></i>
                    </div>
                
                    <div class="cart-buttons"></div>
                
                    <h3></h3>
                </div></div>
                `
            }).join(" ")
        )
    }
    else{

        // ! when cart is empty 
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="HomeBtn">Back to Home</button>
        </a>
        `;
    }
}


generateCartItem();