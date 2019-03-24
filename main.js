'use strict';

let cart = [];

if (JSON.parse(localStorage.getItem('cart')) !== null) {
    cart = JSON.parse(localStorage.getItem('cart'));
}

const cartDOM = document.querySelector('.cart');
const addToCartButtonsDOM = document.querySelectorAll('[data-action="ADD_TO_CART"]');

console.log(cart);

addToCartButtonsDOM.forEach(addToCartButtonDOM => {
addToCartButtonDOM.addEventListener('click', () => {
    const productDOM = addToCartButtonDOM.parentNode;
    const product = {
        image: productDOM.querySelector('.product__image').getAttribute('src'),
        name: productDOM.querySelector('.product__name').innerText,
        price: productDOM.querySelector('.product__price').innerText,
        quantity: 1,
    };

    const isIncart = (cart.filter(cartItem => (cartItem.name === product.name)).length > 0);

    if (!isIncart) {
        cartDOM.insertAdjacentHTML('beforeend',
            `
        <div class="cart__item">
            <img class="cart__item__image" src="${product.image}" alt="${product.name}">
            <h3 class="cart__item__name">${product.name}</h3>
            <h3 class="cart__item__price">${product.price}</h3>
            <h3 class="cart__item__quantity">${product.quantity}</h3>
            <button class="btn btn--primary btn--small btn--danger" data-action="DECREASE__ITEM">&minus;</button>
            <button class="btn btn--primary btn--small" data-action="INCREASE__ITEM">&plus;</button>
            <button class="btn btn--danger btn--small" data-action="REMOVE__ITEM">&times;</button>
        </div>
    `);
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        addToCartButtonDOM.innerText = 'In Cart';
        addToCartButtonDOM.disabled = true;

        const cartItemsDOM = cartDOM.querySelectorAll('.cart__item');
        cartItemsDOM.forEach((cartItemDOM) => {
            if (cartItemDOM.querySelector('.cart__item__name').innerText === product.name) {

                cartItemDOM.querySelector('[data-action="INCREASE__ITEM"]').addEventListener('click', () => {
                    cart.forEach(cartItem => {
                        if (cartItem.name === product.name) {
                            cartItemDOM.querySelector('.cart__item__quantity').innerText = ++cartItem.quantity;
                            cartItemDOM.querySelector('[data-action="DECREASE__ITEM"]').classList.remove('btn--danger');
                            localStorage.setItem('cart', JSON.stringify(cart));
                        }
                    })
                });

            }

    cartItemDOM.querySelector('[data-action="DECREASE__ITEM"]').addEventListener('click', () => {
        cart.forEach(cartItem => {
            if (cartItem.name === product.name) {
                if (cartItem.quantity > 1) {
                    cartItemDOM.querySelector('.cart__item__quantity').innerText = --cartItem.quantity;
                    localStorage.setItem('cart', JSON.stringify(cart));
                } else {
                    cartItemDOM.classList.add('cart__item--removed');
                    setTimeout(() => cartItemDOM.remove(), 250);
                    cart = cart.filter(cartItem => cartItem.name !== product.name);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    addToCartButtonDOM.innerText = 'Add To Cart';
                    addToCartButtonDOM.disabled = false;
                }

                if ( cartItem.quantity === 1) {
                    cartItemDOM.querySelector('[data-action="DECREASE__ITEM"]').classList.add('btn--danger');
                }

            }
        });
    });

    cartItemDOM.querySelector('[data-action="REMOVE__ITEM"]').addEventListener('click', () => {
        cart.forEach(cartItem => {
            if (cartItem.name === product.name) {
                cartItemDOM.querySelector('.cart__item__quantity').innerText = --cartItem.quantity;
                cartItemDOM.classList.add('cart__item--removed');
                setTimeout(() => cartItemDOM.remove(), 250);
                cart = cart.filter(cartItem => cartItem.name !== product.name);
                localStorage.setItem('cart', JSON.stringify(cart));
                addToCartButtonDOM.innerText = 'Add To Cart';
                addToCartButtonDOM.disabled = false;


            }

            
        });
    });

        });
    }


});
});