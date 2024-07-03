import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      const response = await axios.get('http://localhost:5000/cart', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setCart(response.data);
    };
    fetchCart();
  }, []);

  if (!cart) return <div>Loading...</div>;

  return (
    <div>
      {cart.products.map(product => (
        <div key={product.productId._id}>
          <h3>{product.productId.name}</h3>
          <p>{product.quantity}</p>
        </div>
      ))}
    </div>
  );
};

export default Cart;
