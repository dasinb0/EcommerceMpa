let carts = document.querySelectorAll('.btn');
let products = [
    {
        name: 'NIKE-1',
        tag: 'yellowshoes',
        price: 100,
        inCart: 0,
    },
    {
        name: 'NIKE-2',
        tag: 'black&silvershoes',
        price: 200,
        inCart: 0,
    },
    {
        name: 'NIKE-3',
        tag: 'violetshoes',
        price: 175,
        inCart: 0,
    },
    {
        name: 'NIKE-4',
        tag: 'blue&blackshoes',
        price: 120,
        inCart: 0,
    },
    {
        name: 'NIKE-5',
        tag: 'greyshoes',
        price: 150,
        inCart: 0,
    },
    {
        name: 'NIKE-6',
        tag: 'orangeshoes',
        price: 220,
        inCart: 0,
    },
    {
        name: 'NIKE-7',
        tag: 'blueshoes',
        price: 110,
        inCart: 0,
    },
    {
        name: 'NIKE-8',
        tag: 'red&blackshoes',
        price: 150,
        inCart: 0,
    }
];



for (let i = 0; i < carts.length; i++) {
    let currentProduct = products[i];
    carts[i].addEventListener('click', (event) => {
      cartNumbers(currentProduct, event);
      totalCost(currentProduct);
    });
  }
  

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.contador').textContent = productNumbers;

    }
}


function cartNumbers(product, event) {
    event.preventDefault();
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.contador').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.contador').textContent = 1;
    }

    setItems(product);

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
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class="product">
            <ion-icon name="close-circle"></ion-icon>
            <img src="./image/${item.tag}.png">
            <span>${item.name}<span>
            </div>
            <div class="price">${item.price}</div>
            <div class="quantity">
            <ion-icon class="decrease" name="arrow-dropleft-circle"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>
            </div>
            <div class="total">
            ${item.inCart * item.price}
            </div>
            ` ;
        });
         
        productContainer.innerHTML += `
           <div class="TotalContainer">
               <h4 class="TotalTitle">
                 Total
               </h4>
               <h4 class="Total">
               ${cartCost}
               </h4>
           </div>

        `
          

    }
}

onLoadCartNumbers();
displayCart();