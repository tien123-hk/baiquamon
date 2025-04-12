import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../CSS/Gallery.css';

const Gallery = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = localStorage.getItem('user');
                if (userData) {
                    const parsedUser = JSON.parse(userData);
                    setUser(parsedUser.user); // Store only the user object
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
        fetchProducts();
    }, []);

    const addToCart = async (product) => {
        if (!user) {
            alert('Please login to add items to cart');
            return;
        }

        try {
            // Check if product already exists in cart
            const cartResponse = await axios.get(`http://localhost:8086/cart/${user.id}`);
            const existingItem = cartResponse.data.find(item => item.productId === product._id);

            if (existingItem) {
                // Update quantity if product exists
                await axios.put(`http://localhost:8086/cart/update/${existingItem._id}`, {
                    userId: user.id,
                    quantity: existingItem.quantity + 1
                });
                alert('Product quantity updated in cart!');
            } else {
                // Add new product if it doesn't exist
                const cartData = {
                    userId: user.id,
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    img: product.img,
                    quantity: 1
                };
                const response = await axios.post('http://localhost:8086/cart/add', cartData);
                if (response.data) {
                    alert('Product added to cart successfully!');
                }
            }
        } catch (error) {
            console.error('Error managing cart:', error);
            alert('Failed to update cart');
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8086/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleClick = (id) => {
        navigate(`/shopdetail/${id}`);
    };

    const filteredProducts = selectedCategory === "All" 
        ? products 
        : products.filter(product => product.category === selectedCategory);

    return (
        <div className="Gallery">
            <div className="all-title-box">
                <div className="container10">
                    <div className="row10">
                        <div className="c10">
                            <h2>GALLERY</h2>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a >SHOP</a>
                                </li>
                                <li className="breadcrumb-itemactive">/ GALLERY</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>



            <div className="ourgallery">
                <h1>Our Gallery</h1>
                <p>Showroom of the most outstanding items</p>
            </div>
            <div className="thanhhang">
                <div className="thanhcon" id="color-filter">
                    <button className="active" onClick={() => setSelectedCategory("All")}>All</button>
                    <button className="active" onClick={() => setSelectedCategory("Bulbs")}>Bulbs</button>
                    <button className="active" onClick={() => setSelectedCategory("Fruits")}>Fruits</button>
                    <button className="active" onClick={() => setSelectedCategory("Podded")}>Podded vegetables</button>
                    <button className="active" onClick={() => setSelectedCategory("Root")}>Root and tuberous</button>
                </div>
            </div>
             <div className="galleryanh">
                {filteredProducts.map((product) => (
                    <div key={product._id} className="gallery-item">
                        <img 
                            src={product.img} 
                            alt={product.name} 
                            className="gallery-image" 
                            onClick={() => handleClick(product._id)}
                        />
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p>${product.price}</p>
                        </div>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                            }} 
                            className="addto"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;