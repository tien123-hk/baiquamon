import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Contactmana.css';

const Contactmana = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const response = await axios.get('http://localhost:8086/BE/contact');
            setReviews(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setLoading(false);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                await axios.delete(`http://localhost:8086/BE/contact/${reviewId}`);
                setReviews(reviews.filter(review => review._id !== reviewId));
                alert('Review deleted successfully');
            } catch (error) {
                console.error('Error deleting review:', error);
                alert('Failed to delete review');
            }
        }
    };

    const getStarRating = (rating) => {
        return '⭐'.repeat(rating);
    };

    const filteredReviews = filter === 'all' 
        ? reviews 
        : reviews.filter(review => review.reviewType === filter);

    return (
        <div className="review-management-container">
            <h2>Review Management</h2>
            
            <div className="filter-section">
                <select 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)}
                    className="filter-select"
                >
                    <option value="all">All Reviews</option>
                    <option value="contact">General Contact</option>
                    <option value="product">Product Review</option>
                    <option value="service">Service Review</option>
                    <option value="suggestion">Suggestion</option>
                </select>
            </div>

            {loading ? (
                <p>Loading reviews...</p>
            ) : (
                <div className="reviews-grid">
                    {filteredReviews.map(review => (
                        <div key={review._id} className="review-card">
                            <div className="review-header">
                                <h3>{review.name}</h3>
                                <span className="review-date">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="review-type">{review.reviewType}</div>
                            <div className="review-rating">
                                {getStarRating(review.rating)}
                            </div>
                            <div className="review-subject">{review.subject}</div>
                            <div className="review-message">{review.message}</div>
                            <div className="review-email">{review.email}</div>
                            <button 
                                onClick={() => handleDeleteReview(review._id)}
                                className="delete-button"
                            >
                                Delete Review
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Contactmana;