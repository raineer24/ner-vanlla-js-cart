'use strict';

const addToCartButtonsDOM = document.querySelectorAll('[data-action="ADD_TO_CART"]');
addToCartButtonsDOM.forEach(addToCartButtonsDOM => {
    addToCartButtonsDOM.addEventListener('click', () => {
        console.log(product.querySelector('.product__image'));
    console.log(product.querySelector('.product__name'));
    console.log(product.querySelector('.product__price'));
    });
    const product = addToCartButtonsDOM.parentNode;
    });


