import React, { useState, useContext, useEffect } from 'react';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { UserContext } from '../context/UserContext';

const PropertyReview = ({ propertyId }) => {
  const { user } = useContext(UserContext);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    if (!propertyId) {
      console.error('Error: propertyId is not provided.');
      return;
    }

    console.log('Fetching reviews for property ID:', propertyId);

    const fetchReviews = async () => {
      try {
        const docRef = doc(db, 'reviews', String(propertyId)); 
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log('Reviews found:', docSnap.data().reviews);
          setReviews(docSnap.data().reviews || []);
        } else {
          console.log('No reviews found for this property');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [propertyId, db]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
  
    if (!user) {
      alert('Please log in to submit a review.');
      return;
    }
  
    try {
      const newReview = { id: Date.now(), text: review, userId: user.uid };
      const docRef = doc(db, 'reviews', String(propertyId));  
  
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const currentReviews = docSnap.data().reviews || [];
        await setDoc(docRef, {
          reviews: [...currentReviews, newReview],
        });
      } else {
        await setDoc(docRef, {
          reviews: [newReview],
        });
      }
  
      // Log success message
      console.log('Review submitted successfully');
      
      setReviews([...reviews, newReview]);
      setReview('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  
  return (
    <div>
      <h4>Reviews:</h4>
      <ul>
        {reviews.map((rev) => (
          <li key={rev.id}>{rev.text}</li>
        ))}
      </ul>
      <form onSubmit={handleReviewSubmit}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write a review"
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default PropertyReview;
