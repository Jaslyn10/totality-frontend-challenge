import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import BookingProvider from './context/BookingContext';
import UserProvider from './context/UserContext';  // Import UserProvider

ReactDOM.render(
  <UserProvider>
    <BookingProvider>
      <App />
    </BookingProvider>
  </UserProvider>,
  document.getElementById('root')
);
