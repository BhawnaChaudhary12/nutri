import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from '../../Components/CartContext';
import Header from '../../Components/Header'; // Correct the path for Header component
import Products from '../../Components/Products';
import AboutUs from '../../Components/AboutUs';
import ContactUs from '../../Components/ContactUs';
import CartPage from '../../Components/CartPage';
import ProductDetails from '../../Components/ProductDetails';
import CheckoutPage from '../../Components/CheckoutPage'; // Import the CheckoutPage
import axios from 'axios';

const App = () => {
  const location = useLocation();

  // Check if the current path matches any of the paths where the header should not be shown
  const hideHeaderPaths = ['/cart', '/products', '/about', '/contact', '/checkout'];

  // Check if the location pathname starts with "/product-details"
  const isProductDetailsPage = location.pathname.startsWith('/product-details');

  const showHeader = !(hideHeaderPaths.includes(location.pathname) || isProductDetailsPage);

  useEffect(() => {
    // Example API call
    axios.get('/api/your-endpoint') // Use just '/api/your-endpoint' due to the proxy
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <div>
      {showHeader && <Header />}
      <Routes>
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} /> {/* Add the Checkout route */}
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <CartProvider>
      <App />
    </CartProvider>
  </Router>
);

export default AppWithRouter;
