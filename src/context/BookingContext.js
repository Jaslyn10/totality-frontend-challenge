import React, { createContext, useState } from 'react';


export const BookingContext = createContext();

const BookingProvider = ({ children }) => {
  // State to manage cart items
  const [cart, setCart] = useState([]);

  // Function to add a property to the cart
  const addToCart = (property) => {
    const bookingDate = new Date();  
    setCart([...cart, { ...property, bookingDate }]);  
  };

  // Function to remove a property from the cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]); 
  };

  // Function to update cart item (for increasing or decreasing quantity if necessary)
  const updateCart = (id, newProperty) => {
    setCart(cart.map((item) => (item.id === id ? newProperty : item)));
  };

  return (
    <BookingContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateCart }}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;
