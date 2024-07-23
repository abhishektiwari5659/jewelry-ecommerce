const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

// Create new cart
router.post('/', async (req, res) => {
    const cart = new Cart({ items: [] });
    await cart.save();
    res.json(cart);
});

// Get cart
router.get('/:id', async (req, res) => {
    const cart = await Cart.findById(req.params.id);
    res.json(cart);
});

// Add item to cart
router.post('/:id', async (req, res) => {
    const { productId, name, price, quantity } = req.body;
    let cart = await Cart.findById(req.params.id);
    if (!cart) {
        cart = new Cart({ items: [] });
    }
    cart.items.push({ productId, name, price, quantity });
    await cart.save();
    res.json(cart);
});

// Update item quantity
router.put('/:id', async (req, res) => {
    const { productId, quantity } = req.body;
    const cart = await Cart.findById(req.params.id);
    const item = cart.items.find(item => item.productId === productId);
    if (item) {
        item.quantity = quantity;
    }
    await cart.save();
    res.json(cart);
});

// Remove item from cart
router.delete('/:id/:productId', async (req, res) => {
    const cart = await Cart.findById(req.params.id);
    cart.items = cart.items.filter(item => item.productId !== req.params.productId);
    await cart.save();
    res.json(cart);
});

module.exports = router;
