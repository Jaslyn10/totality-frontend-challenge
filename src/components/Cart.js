import React, { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';
import Grid from '@mui/material/Grid';  
import '../Cart.css';  

const Cart = () => {
  const { cart, removeFromCart } = useContext(BookingContext);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const formatBookingDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options); 
  };

  return (
    <div className="cart">
      <h2 className="page-heading">Your Bookings</h2>

      {cart.length === 0 ? (
        <p className="no-bookings-message">No bookings yet.</p>
      ) : (
        <>
          <Grid container spacing={3}>  
            {cart.map((item) => (
              <Grid item xs={12} key={item.id}>  {/* Full width on mobile */}
                <div className="booking-item">
                  <h4>{item.title}</h4>
                  <p>${item.price}/night</p>
                  <p>Booking Date: {formatBookingDate(item.bookingDate)}</p> 
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </Grid>
            ))}
          </Grid>
          <div className="cart-summary">
            <h3>Total: ${calculateTotal()}</h3>
            <h3>Booking Count: {cart.length}</h3> 
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
