const express = require('express');
const Cart = require('../models/Cart');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId }).populate('products.productId');
    if (!cart) return res.status(404).send('Cart not found');
    res.json(cart);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      cart = new Cart({ userId: req.user.userId, products: [req.body] });
    } else {
      cart.products.push(req.body);
    }
    await cart.save();
    res.status(201).send('Item added to cart');
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) return res.status(404).send('Cart not found');
    cart.products = cart.products.filter(p => p.productId != req.params.id);
    await cart.save();
    res.send('Item removed from cart');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
