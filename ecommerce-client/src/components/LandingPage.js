import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to Our E-commerce Site</h1>
      <nav>
        <ul>
          <li><Link to="/login">User Login</Link></li>
          <li><Link to="/register">User Register</Link></li>
          <li><Link to="/admin/login">Admin Login</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/cart">Cart</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default LandingPage;
