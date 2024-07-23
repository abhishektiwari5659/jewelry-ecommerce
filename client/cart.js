document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCartItems() {
        cartItemsContainer.innerHTML = ''; // Clear existing items
        let total = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">${item.price}</span>
                <span class="cart-item-quantity">${item.quantity || 1}</span>
                <span class="cart-item-total">${item.price}</span>
                <button class="cart-item-remove" data-index="${index}">Remove</button>
            `;

            cartItemsContainer.appendChild(cartItem);
            total += parseFloat(item.price.replace('$', '')) * (item.quantity || 1);
        });

        cartTotalPrice.textContent = `$${total.toFixed(2)}`;
    }

    // Render cart items on page load
    renderCartItems();

    // Handle remove item button clicks
    cartItemsContainer.addEventListener('click', event => {
        if (event.target.classList.contains('cart-item-remove')) {
            const index = event.target.getAttribute('data-index');
            cart.splice(index, 1); // Remove item from cart array
            localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
            renderCartItems(); // Re-render cart items
        }
    });
});
