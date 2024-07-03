const express = require('express');
const Product = require('../models/Product');
const { authenticate, isAdmin } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send('Product created');
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).send('Product not found');
    res.send('Product updated');
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    res.send('Product deleted');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
