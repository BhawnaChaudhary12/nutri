import React, { useState } from 'react';
import './Header.css';
import { BsSearch, BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

// nav
const Navigation = () => (
  <nav className="navbar">
    <ul className="nav-list">
      <li className="nav-item">
        <Link to="/" target="_self">Home</Link>
      </li>
      <li className="nav-item">
        <Link to="/products" target="_self">Products</Link>
      </li>
      <li className="nav-item">
        <Link to="/about" target="_self">About Us</Link>
      </li>
      <li className="nav-item">
        <Link to="/contact" target="_self">Contact Us</Link>
      </li>
    </ul>
  </nav>
);

const Header = () => {
  const [cartItems, setCartItems] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products = {
    "Intimate Care": { price: 141, imgSrc: "/images/nutrishri2.jpg" },
    "Sunscreen": { price: 175, imgSrc: "/images/sun screen 0.1.jpg" },
    "Face Wash": { price: 156, imgSrc: "/images/nutrishri3.jpg" },
    "Bath Soap": { price: 41.80, imgSrc: "/images/soap 0.2.jpg" },
  };

  const handleQuantityChange = (productName, change) => {
    setCartItems(prevItems => {
      const updatedItems = { ...prevItems };
      const currentQuantity = updatedItems[productName] || 0;
      const newQuantity = currentQuantity + change;

      if (newQuantity <= 0) {
        delete updatedItems[productName];
      } else {
        updatedItems[productName] = newQuantity;
      }

      return updatedItems;
    });
  };

  const calculateTotal = () => {
    return Object.entries(cartItems).reduce((total, [productName, quantity]) => {
      return total + products[productName].price * quantity;
    }, 0).toFixed(2);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <>
      <div className="header">
        <div className="container">
          <p className="welcome-note">Welcome to <b>NutraShri</b></p>
        </div>
      </div>
      <div className="header-down">
        <div className="logo">
          <img src="/images/logo.jpg" alt="NutraShri Logo" />
        </div>

        <div className="headerSearch">
          <input type="text" className="search-input" placeholder="Search..." />
          <button className="search-button"><BsSearch size={12} /></button>
        </div>

        <div className="cart-icon" onClick={openCart}>
          <Link to="/cart" className="cart-icon-link">
            <span>{Object.keys(cartItems).length}</span>
            <BsCart4 />
          </Link>
        </div>
      </div>

      <Navigation />

      <section id="swiper" className="swiper-section">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[Autoplay, Pagination]}
          pagination={false}
        >
          <SwiperSlide><img src="/images/555.png" alt="Slide1" /></SwiperSlide>
          <SwiperSlide><img src="/images/89.png" alt="Slide2" /></SwiperSlide>
          <SwiperSlide><img src="/images/122.png" alt="Slide3" /></SwiperSlide>
          <SwiperSlide><img src="/images/555.png" alt="Slide4" /></SwiperSlide>
        </Swiper>
      </section>

      <section id="products" className="products">
        <h2>Our Products</h2>
        <div className="product-grid">
          {Object.keys(products).map(productName => (
            <div key={productName} className="product-card">
              <Link to={`/product-details/${productName}`}>
                <img src={products[productName].imgSrc} alt={productName} />
                <h3>{productName}</h3>
                <p>₹ {products[productName].price}</p>
              </Link>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(productName, -1)}>-</button>
                <span>{cartItems[productName] || 0}</span>
                <button onClick={() => handleQuantityChange(productName, 1)}>+</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {isCartOpen && (
        <div id="cart-modal" className="cart-modal">
          <h2>Your Cart</h2>
          <div id="cart-items">
            {Object.entries(cartItems).length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              Object.entries(cartItems).map(([product, quantity]) => (
                <div key={product} className="cart-item">
                  <span>{product}</span>: <span>{quantity}</span>
                </div>
              ))
            )}
          </div>
          <hr />
          <div className="cart-total">
            <span>Total:</span> ₹ {calculateTotal()}
          </div>
          <button onClick={() => console.log('Proceed to Checkout')}>Proceed to Checkout</button>
          <button onClick={closeCart}>Close</button>
        </div>
      )}
    </>
  );
};

export default Header;
