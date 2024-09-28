import React, { useContext, useState } from 'react';
import { BookingContext } from '../context/BookingContext';
import Grid from '@mui/material/Grid';  
import { useNavigate } from 'react-router-dom'; 
import '../CheckoutPage.css';  

const CheckoutPage = () => {
  const { cart, clearCart } = useContext(BookingContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    paymentDetails: ''
  });
  const navigate = useNavigate(); 

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    clearCart(); // Clear the entire cart
    alert('Booking confirmed!');
    
    // Redirect to homepage
    navigate('/'); 
  };

  return (
    <div className="checkout">
      <h2 className="page-heading">Checkout</h2>

      {cart.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty. Please book some properties first.</p>
      ) : (
        <div>
          <div className="booking-summary">
            <h3>Booking Summary:</h3>
            {cart.map((item) => (
              <div key={item.id}>
                <h4>{item.title}</h4>
                <p>${item.price}/night</p>
              </div>
            ))}
            <h3>Total: ${calculateTotal()}</h3>
          </div>

          <h3>Enter Your Details:</h3>
          <form onSubmit={handleSubmit} className="checkout-form">
            <Grid container spacing={3}>  {/* Use grid for form fields */}
              <Grid item xs={12} sm={6} className="grid-item">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6} className="grid-item">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} className="grid-item">
                <label>Payment Details:</label>
                <input
                  type="text"
                  name="paymentDetails"
                  value={formData.paymentDetails}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
            <button type="submit">Confirm Booking</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
