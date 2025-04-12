import '../CSS/Wishlist.css'
import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = localStorage.getItem('user');
                console.log('User data from localStorage:', userData);
                if (userData) {
                    const parsedUser = JSON.parse(userData);
                   
                    setUser(parsedUser.user);
                    fetchWishlist(parsedUser.user.id);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const fetchWishlist = async (userId) => {
        try {
            console.log('Fetching wishlist for userId:', userId);
            const response = await axios.get(`http://localhost:8086/wishlist/${userId}`);
            console.log('Full API Response:', response);
            console.log('Wishlist data:', response.data);
            setWishlistItems(response.data);
        } catch (error) {
            console.error('Error fetching wishlist:', error.response || error);
        }
    };

    const removeItem = async (productId) => {
        if (!user) return;
        try {
            await axios.delete(`http://localhost:8086/wishlist/${user.id}/${productId}`);
            setWishlistItems(prevItems => prevItems.filter(item => item.productId !== productId));
            alert('Item removed from wishlist');
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            alert('Failed to remove item');
        }
    };

    const handleClick = async (productId) => {
        navigate(`/shopdetail/${productId}`);
    };

    return (
        <>
            <div className="all-title-box">
                <div className="container10">
                    <div className="row10">
                        <div className="c10">
                            <h2>WISHLIST</h2>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="#">SHOP</a>
                                </li>
                                <li className="breadcrumb-itemactive">/ WISHLIST</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="wishlist-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Images</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Stock</th>
                            <th>Add Item</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishlistItems.map((item) => (
                            <tr key={item.productId}>
                                <td className="thumbnail-img">
                                    <a onClick={() => handleClick(item.productId)}>
                                        <img className="img-fluid" src={item.img} alt={item.name} />
                                    </a>
                                </td>
                                <td className="name-pr">
                                    <p>{item.name || 'No name available'}</p>
                                </td>
                                <td className="price-pr">
                                    <p>${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}</p>
                                </td>
                                <td>
                                    <p>{item.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                                </td>
                                <td>
                                    <button 
                                        className='btn hvr-hover'
                                        onClick={() => handleClick(item.productId)}
                                    >
                                        View Details
                                    </button>
                                </td>
                                <td className="remove-pr">
                                    <button 
                                        className="close-btn" 
                                        onClick={() => removeItem(item.productId)}
                                    >✖</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Wishlist;