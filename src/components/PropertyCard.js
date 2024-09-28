import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import PropertyReview from './PropertyReview'; 
import { BookingContext } from '../context/BookingContext';

const PropertyCard = ({ property }) => {
  const { user } = useContext(UserContext);
  const { addToCart } = useContext(BookingContext); 
  const db = getFirestore();

  const handleAddToFavorites = async () => {
    if (user) {
      const docRef = doc(db, 'favorites', user.uid);
      const docSnap = await getDoc(docRef);
  
      try {
        if (docSnap.exists()) {
          const currentFavorites = docSnap.data().properties || [];
          
          // Check if the property is already in favorites
          const isAlreadyFavorite = currentFavorites.some(item => item.id === property.id);
          
          if (!isAlreadyFavorite) {
            // If not, add it to favorites
            await setDoc(docRef, {
              properties: [...currentFavorites, property],
            });
            alert(`${property.title} added to favorites`);
          } else {
            // Alert the user if it's already a favorite
            alert('This property is already in your favorites.');
          }
        } else {
          // Create a new favorites document if it doesn't exist
          await setDoc(docRef, {
            properties: [property],
          });
          alert(`${property.title} added to favorites`);
        }
      } catch (error) {
        console.error("Error adding to favorites: ", error);
        alert('Failed to add to favorites. Please try again.');
      }
    } else {
      alert('Please log in to add favorites.');
    }
  };
  
  

  // Function to handle booking
  const handleBookProperty = () => {
    addToCart(property); // Call the addToCart function to book the property
    alert(`${property.title} booked successfully!`); // Feedback for booking
  };

  return (
    <div className="property-card">
      <img src={property.image} alt={property.title} />
      <h3>{property.title}</h3>
      <p>{property.description}</p>
      <p><strong>Price:</strong> ${property.price}/night</p>
      <button onClick={handleAddToFavorites}>Add to Favorites</button>
      <button onClick={handleBookProperty}>Book Now</button> 

      {/* Add PropertyReview component to enable reviews */}
      <PropertyReview propertyId={property.id} />  
    </div>
  );
};

export default PropertyCard;
