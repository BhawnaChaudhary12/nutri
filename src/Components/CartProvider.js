
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from '../contexts/CartContext';
import Products from './Products';
import Cart from './Components/Cart'; 

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<CartPage />} />
          
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
