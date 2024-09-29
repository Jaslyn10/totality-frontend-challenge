import React, { useState, useEffect, useContext, useCallback } from 'react';
import PropertyCard from './PropertyCard';
import { BookingContext } from '../context/BookingContext';
import Grid from '@mui/material/Grid';  
import '../PropertyList.css';  
import propertyData from './propertyData.js'; 

const PropertyList = () => {
  const { addToCart } = useContext(BookingContext);
  const [properties, setProperties] = useState([]);  
  const [filteredProperties, setFilteredProperties] = useState([]); 

  const [locationFilter, setLocationFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);  // Price range filter 
  const [bedroomsFilter, setBedroomsFilter] = useState(0);  // Filter by bedrooms
  const [selectedAmenities, setSelectedAmenities] = useState([]);  // Filter by amenities

  useEffect(() => {
    setProperties(propertyData);
    setFilteredProperties(propertyData);  // Show all properties by default
  }, []);

  // Function to filter properties, wrapped in useCallback to prevent re-creation on each render
  const filterProperties = useCallback(() => {
    const filtered = properties.filter((property) => {
      // location filter
      const matchesLocation = locationFilter ? property.location === locationFilter : true;

      // price range filter
      const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];

      // bedrooms filter
      const matchesBedrooms = bedroomsFilter ? property.bedrooms === bedroomsFilter : true;

      // amenities filter (if any selected amenity matches)
      const matchesAmenities = selectedAmenities.length
        ? selectedAmenities.some(amenity => property.amenities.includes(amenity))
        : true;  // If no amenities are selected, match all properties

      return matchesLocation && matchesPrice && matchesBedrooms && matchesAmenities;
    });

    setFilteredProperties(filtered);
  }, [properties, locationFilter, priceRange, bedroomsFilter, selectedAmenities]);

  useEffect(() => {
    filterProperties(); 
  }, [filterProperties]);  // Add filterProperties to the dependency array

  const handleAddToCart = (property) => {
    addToCart(property);
  };

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)  
        : [...prev, amenity] 
    );
  };

  return (
    <div className="property-list-container">

      {/* Filters */}
      <div className="filter-buttons">
        <h4>Filter by Location</h4>
        <button onClick={() => setLocationFilter('Beach')}>Beach</button>
        <button onClick={() => setLocationFilter('Mountain')}>Mountain</button>
        <button onClick={() => setLocationFilter('')}>All Locations</button>

        <h4>Filter by Price Range</h4>
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
        />
        <p>Up to ${priceRange[1]}</p>

        <h4>Filter by Bedrooms</h4>
        <select value={bedroomsFilter} onChange={(e) => setBedroomsFilter(Number(e.target.value))}>
          <option value={0} class="any">Any</option>
          <option value={1}>1 Bedroom</option>
          <option value={2}>2 Bedrooms</option>
          <option value={3}>3 Bedrooms</option>
          <option value={4}>4 Bedrooms</option>
        </select>

        <h4>Filter by Amenities</h4>
        <div>
          <label>
            <input
              type="checkbox"
              onChange={() => handleAmenityChange('Wi-Fi')}
              checked={selectedAmenities.includes('Wi-Fi')}
            />
            Wi-Fi
          </label>
          <br></br>
          <label>
            <input
              type="checkbox"
              onChange={() => handleAmenityChange('Pool')}
              checked={selectedAmenities.includes('Pool')}
            />
            Pool
          </label>
          <br/>
          <label>
            <input
              type="checkbox"
              onChange={() => handleAmenityChange('Fireplace')}
              checked={selectedAmenities.includes('Fireplace')}
            />
            Fireplace
          </label>
        </div>
      </div>
      <hr />

      {/* Display filtered properties */}
      <Grid container spacing={3}>
        {filteredProperties.map((property) => (
          <Grid item xs={12} sm={6} md={4} key={property.id}>
            <div className="property-card">
              <PropertyCard
                property={property}
                onBook={handleAddToCart}
              />
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PropertyList;
