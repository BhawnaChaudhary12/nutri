import React, { useState } from 'react';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'COD', 
  });

  const handleChange = (e) => {
    setCustomerDetails({
      ...customerDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Customer details submitted:', customerDetails);
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        {['name', 'email', 'address', 'city', 'postalCode', 'country'].map((field) => (
          <div key={field} className="form-group">
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              value={customerDetails[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="form-group">
          <label>Payment Method</label>
          <select
            name="paymentMethod"
            value={customerDetails.paymentMethod}
            onChange={handleChange}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="UPI">UPI</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
