'use strict';

let cart = [];

const cartDOM = document.querySelector('.cart');

const addToCartButtonsDOM = document.querySelectorAll('[data-action="ADD_TO_CART"]');
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
               <button class="btn btn--primary btn--small" data-action="DECREASE__ITEM">&minus;</button>
               <button class="btn btn--primary btn--small" data-action="INCREASE__ITEM">&plus;</button>
               <button class="btn btn--danger btn--small" data-action="REMOVE__ITEM">&times;</button>
            </div>
       `);
            cart.push(product);
            addToCartButtonDOM.innerText = 'In Cart';

            const cartItemsDOM = cartDOM.querySelectorAll('.cart__item');
            cartItemsDOM.forEach((cartItemDOM) => {
                if (cartItemDOM.querySelector('.cart__item__name').innerText === product.name) {

                    cartItemDOM.querySelector('[data-action="INCREASE__ITEM"]').addEventListener('click', () => {
                        cart.forEach(cartItem => {
                            if (cartItem.name === product.name) {
                                cartItemDOM.querySelector('.cart__item__quantity').innerText = ++cartItem.quantity;
                            }
                        })
                    });

                }

                cartItemDOM.querySelector('[data-action="DECREASE__ITEM"]').addEventListener('click', () => {
                    cart.forEach(cartItem => {
                        if (cartItem.name === product.name) {
                            if (cartItem.quantity > 1) {
                                cartItemDOM.querySelector('.cart__item__quantity').innerText = --cartItem.quantity;
                            } else {
                                cartItemDOM.classList.add('cart__item--removed');
                                setTimeout(() =>  cartItemDOM.remove(), 300);
                                cart = cart.filter(cartItem => cartItem.name !== product.name);
                                addToCartButtonDOM.innerText = 'Add To Cart';
                            }

                        }
                    })
                });

            });
        }


    });
});