import React from 'react';
import { useCart } from './CartContext';
import './CartPage.css';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getTotalAmount, getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, quantity);
    }
  };

  const handleProceedToPayment = () => {
    navigate('/checkout'); 
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="cart-list">
            {cart.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price}</p>
                  <p>Quantity: 
                    <input
                      type="number"
                      className="quantity-input"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    />
                  </p>
                  <button onClick={() => removeFromCart(item.id)} className="remove-button">Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h2>Cart Summary</h2>
            <p>Total Items: {getTotalItems()}</p>
            <p>Subtotal: ₹{getTotalAmount()}</p>
            <p>GST (18%): ₹{(getTotalAmount() * 0.18).toFixed(2)}</p>
            <p>Total Amount: ₹{(getTotalAmount() * 1.18).toFixed(2)}</p>
            <button className="checkout-button" onClick={handleProceedToPayment}>Proceed to Payment</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
