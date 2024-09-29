import React, { useState, useEffect, useContext } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { UserContext } from '../context/UserContext';
import PropertyCard from '../components/PropertyCard';
import '../FavoritesPage.css';  

const FavoritesPage = () => {
  const { user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const docRef = doc(db, 'favorites', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFavorites(docSnap.data().properties || []);
        } else {
          console.log('No favorites found');
        }
      }
    };

    fetchFavorites();
  }, [user, db]);

  const handleRemoveFromFavorites = async (property) => {
    const docRef = doc(db, 'favorites', user.uid);
    const updatedFavorites = favorites.filter((item) => item.id !== property.id);
    
    await setDoc(docRef, { properties: updatedFavorites });
    setFavorites(updatedFavorites);
    alert(`${property.title} removed from favorites`);
  };

  return (
    <div>
      <h2 className="page-heading">Your Favorite Properties</h2>

      {favorites.length === 0 ? (
        <p className="no-favorites-message">No favorites yet.</p>
      ) : (
        favorites.map((property) => (
          <div className="property-card-container" key={property.id}>
            <div className="property-card">
              <PropertyCard property={property} />
            </div>
            <button onClick={() => handleRemoveFromFavorites(property)}>
              Remove from Favorites
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesPage;
