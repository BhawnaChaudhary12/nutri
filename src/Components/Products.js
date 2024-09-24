import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Product.css'; 

const productData = {
  'Intimate Care': { 
    price: 141, 
    description: 'Gentle intimate wash for daily use.', 
    image: '/images/nutrishri2.jpg' 
  },
  'Sunscreen': { 
    price: 175, 
    description: 'SPF 50 Sunscreen for sun protection.', 
    image: '/images/sun screen 0.1.jpg' 
  },
  'Face Wash': { 
    price: 156, 
    description: 'Vitamin C enriched face wash.', 
    image: '/images/nutrishri3.jpg' 
  },
  'Bath Soap': { 
    price: 41.80, 
    description: 'Moisturising bath soap.', 
    image: '/images/soap 0.2.jpg' 
  }
};

const Products = () => {
  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/product-details/${id}`);
  };

  return (
    <div className="products-page">
      <h1 className="page-title">Our Products</h1>
      <div className="product-list">
        {Object.keys(productData).map((id) => (
          <div 
            key={id} 
            className="product-box" 
            onClick={() => handleProductClick(id)} 
          >
            <img 
              src={productData[id].image} 
              alt={id} 
              className="product-image" 
            />
            <div className="product-details">
              <h3>{id}</h3>
              <p>Price: ₹{productData[id].price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="view-cart">
        <Link to="/cart" className="cart-link">View Cart</Link>
      </div>
    </div>
  );
};

export default Products;
