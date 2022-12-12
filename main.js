let carts = document.querySelectorAll(".add-cart");
let products = [
    {
        name: "Black clothes",
        tag: "black clothes",
        price: 100,
        inCart: 0,
        img: "clothes1.png"
    },

    {
        name: "Grey-W clothes",
        tag: "grey-w",
        price: 80,
        inCart: 0,
        img: "clothes2.jpg"
    },

    {
        name: "Blue-Sky",
        tag: "blue-sky",
        price: 200,
        inCart: 0,
        img: "clothes3.png"
    },

    {
        name: "Grey",
        tag: "grey",
        price: 200,
        inCart: 0,
        img: "clothes4.png"
    },

    {
        name: "Blue",
        tag: "blue",
        price: 200,
        inCart: 0,
        img: "clothes5.jpg"
    }
];
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);

    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(products) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(products);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

}

function totalCost(product) {
    // console.log("the product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productheader = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    //let cartCost = localStorage.getItem('totalCost');
    console.log(cartItems);
    if (cartItems && productheader) {
        // console.log("running");
        productheader.innerHTML = '';
        Object.values(cartItems).map(item => {
            productheader.innerHTML += `
            <div class="product-item">
        <div class="product-title">
        <i class="fa-solid fa-circle-xmark"></i>
        <img src="./images/${item.img}">
        <span>${item.name}</span>
        </div>
        <div class="price">$${item.price}</div>
        <div class="quantity">
        <i class="fa-solid fa-circle-minus"></i><span>${item.inCart}</span>
        <i class="fa-solid fa-circle-plus"></i>
        </div>
        <div class="total">
        $${item.inCart * item.price}
        </div>
        </div>
        `;
        });

        productheader.innerHTML += `
       <div class="baskettotalContainer">
       <h4 class="basketTotalTitle">
       BasketTotal
       </h4>
       <h4 class="basketTotal">
        $${cartCost}
       </h4>
       </div>
       
       `;
    }

    let plusBtn = document.getElementsByClassName("fa-circle-plus");

    for (let i = 0; i < plusBtn.length; i++) {
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
        console.log(cartItems);
        plusBtn[i].addEventListener('click', () => {
            Object.values(cartItems)[i].inCart += 1;
            localStorage.setItem("productsInCart", JSON.stringify(cartItems));
            cartCost = parseInt(cartCost);
            localStorage.setItem("totalCost", cartCost + Object.values(cartItems)[i].price);
            displayCart();
        })
    }

    let minusBtn = document.getElementsByClassName("fa-circle-minus");

    for (let i = 0; i < minusBtn.length; i++) {
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);
        console.log(cartItems);
        minusBtn[i].addEventListener('click', () => {
            if (Object.values(cartItems)[i].inCart > 1) {
                Object.values(cartItems)[i].inCart -= 1;
                localStorage.setItem("productsInCart", JSON.stringify(cartItems));
                cartCost = parseInt(cartCost);
                localStorage.setItem("totalCost", cartCost - Object.values(cartItems)[i].price);
                displayCart();
            }
        })
    }

    var removeBtn = document.getElementsByClassName('fa-circle-xmark');
    for (i = 0; i < removeBtn.length; i++) {
        var button = removeBtn[i]
        button.addEventListener('click', function removeFromCart(e) {
            e.target.parentElement.parentElement.remove();
        })
    }
}


onLoadCartNumbers();
displayCart();

