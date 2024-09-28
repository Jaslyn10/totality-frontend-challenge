import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'; 
import { auth } from './firebase';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Firebase listener for auth state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>

      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/checkout" element={<CheckoutPage user={user} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/favorites" element={<FavoritesPage user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
