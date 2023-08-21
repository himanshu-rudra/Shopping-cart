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

    if (basket.length !== 0) {
        // ! when cart is not empty
        return (
            shoppingCart.innerHTML = basket.map((x) => {
                let { id, item } = x;
                let search = shopItemsData.find((y) => Number(y.id) === id) || [];
                return `
                <div class="cart-item">
                <img  width="100" src="${search.img}" alt=""/>
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class="cart-item-price">$${search.price}</p>
                        </h4>
                        <i  onclick=removeItem(${id}) class="bi bi-x-lg"></i>
                    </div>
                
                    
                    <div class="buttons" style="margin-left:10px;">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                    
                
                    <h3 style="margin-left:10px; padding-top:10px;">$${item * search.price}</h3>
                </div></div>
                `
            }).join(" ")
        )
    }
    else {

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
    generateCartItem();
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
    generateCartItem();
    localStorage.setItem("data", JSON.stringify(basket));
}

let update = (idt) => {

    let search = basket.find((x) => x.id === idt);
    let valInDe = document.getElementById(idt);
    valInDe.innerHTML = search.item;
    calculation();
    totalAmount();
}


let removeItem = (idt) =>{
       let selectedItem = idt;
       basket = basket.filter((x) => x.id !== idt);
       console.log(basket);
       generateCartItem();
       totalAmount();
       calculation();
       localStorage.setItem("data", JSON.stringify(basket));

}


let totalAmount = () => {
    if(basket.length !== 0){
       let amount = basket.map((x) => {
         let {id,item} = x;
         let search = shopItemsData.find((y)=> Number(y.id) === id) || [];
         return item * search.price;
       }).reduce((x,y) => x+y,0);
       

       label.innerHTML = `
       <h2>$${amount}</h2>
       <button class="checkout">checkout</button>
       <button  onclick="clearCart()" class="removeAll">Clear Cart</button>`
    }else return;

    
}

let clearCart = () => {
    basket = [];
    generateCartItem();
    localStorage.setItem("data", JSON.stringify(basket));
    
}

totalAmount();


