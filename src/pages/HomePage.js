import React, { useContext } from 'react';
import PropertyList from '../components/PropertyList';
import Cart from '../components/Cart';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import '../HomePage.css'; 

const HomePage = () => {
    const { user, logout } = useContext(UserContext);  // Access user and logout from UserContext

    return (
        <div>
            {/* Page heading */}
            <h1 className="page-heading">Property Rental Platform</h1>

            {/* Navigation Bar */}
            <nav className="navbar">
                {user ? (
                    <>
                        <p className="welcome-message">Welcome, {user.displayName || user.email}</p>
                        <button onClick={logout}>Logout</button>
                        <button><Link to="/favorites">Favorites</Link></button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                    </>
                )}
                
                {user && (
                    <button>
                        <Link to="/checkout">Checkout</Link>
                    </button>
                )}
            </nav>
            <PropertyList />
            <Cart />
        </div>
    );
};

export default HomePage;
