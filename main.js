'use strict';

const addToCartButtonsDOM = document.querySelectorAll('[data-action="ADD_TO_CART"]');
addToCartButtonsDOM.forEach(addToCartButtonsDOM => {
    addToCartButtonsDOM.addEventListener('click', () => {
       const productDOM = addToCartButtonsDOM.parentNode;
       const product = {
           image: productDOM.querySelector('.product__image').getAttribute('src'),
           name: productDOM.querySelector('.product__name').innerText,
           price: productDOM.querySelector('.product__price').innerText,
       };
       console.log(product);
    });
});


