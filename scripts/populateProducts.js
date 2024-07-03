const mongoose = require('mongoose');
const Product = require('../models/Product');

mongoose.connect('mongodb://localhost:27017/your_database_name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const products = [
  { name: 'Product 1', description: 'Description 1', price: 100 },
  { name: 'Product 2', description: 'Description 2', price: 200 },
  { name: 'Product 3', description: 'Description 3', price: 300 }
];

const populateProducts = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Products populated');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error populating products', error);
    mongoose.disconnect();
  }
};

populateProducts();
