import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../CSS/Shopdetail.css";
import Fb from '../assets/anh/fb.png'
import Insk from '../assets/anh/insk.png'
import Tw from '../assets/anh/twitter.png'
import Tien from '../assets/anh/tien.jpg'
import Tu from '../assets/anh/tu.jpg'
import Vinh from '../assets/anh/vinh.jpg'



const Shopdetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [inputValue, setInputValue] = useState(1);
    const [user, setUser] = useState(null);
    const [isInWishlist, setIsInWishlist] = useState(false);
    
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = localStorage.getItem('user');
                if (userData) {
                    const parsedUser = JSON.parse(userData);
                    setUser(parsedUser.user); // Store only the user object part
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
        fetchProductDetails();
    }, [id]);

    const addToWishlist = async () => {
        if (!user) {
            alert('Please login to add items to wishlist');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8086/wishlist/add', {
                userId: user.id,  // Now this will correctly access the MongoDB _id
                productId: id,
                name: product.name,
                price: product.price,
                img: product.img
            });
            
            if (response.data) {
                setIsInWishlist(true);
                alert('Product added to wishlist successfully!');
            }
        } catch (error) {
            console.error('Wishlist operation failed:', error);
            alert('Failed to add to wishlist');
        }
    };

    const addToCart = async () => {
        if (!user) {
            alert('Please login to add items to cart');
            return;
        }
    
        try {
            // Check if product already exists in cart
            const cartResponse = await axios.get(`http://localhost:8086/cart/${user.id}`);
            const existingItem = cartResponse.data.find(item => item.productId === id);

            if (existingItem) {
                // Update quantity if product exists
                await axios.put(`http://localhost:8086/cart/update/${existingItem._id}`, {
                    userId: user.id,
                    quantity: existingItem.quantity + parseInt(inputValue)
                });
                alert('Product quantity updated in cart!');
            } else {
                // Add new product if it doesn't exist
                const cartData = {
                    userId: user.id,
                    productId: id,
                    name: product.name,
                    price: product.price,
                    img: product.img,
                    quantity: parseInt(inputValue)
                };
                await axios.post('http://localhost:8086/cart/add', cartData);
                alert('Product added to cart successfully!');
            }
        } catch (error) {
            console.error('Cart operation failed:', error);
            alert('Failed to add item to cart');
        }
    };

  

    

        
   


    const fetchProductDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8086/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };






    // Remove the second addToWishlist function and keep this one


    const getProductImages = (product) => {
        if (!product) return [];
        return [product.img, product.imga, product.imgb].filter(Boolean);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="aboutus">
            <div className="all-title-box">
                <div className="container10">
                    <div className="row10">
                        <div className="c10">
                            <h2>SHOP DETAIL</h2>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="#">SHOP</a>
                                </li>
                                <li className="breadcrumb-itemactive">/SHOP DETAIL</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>



            <div className="row11">
                <div className="c11 splide c11Splide">
                    <div
                        id="carousel-example-1"
                        className="single-product-slidercarouselslide splide__track">
                        {product && getProductImages(product).length > 0 && (
                            <div className="carousel-inner splide__list">
                                <div className="carousel-item active">
                                    <img
                                        src={getProductImages(product)[currentImageIndex]}
                                        alt={product?.name || 'Product image'}
                                        className="image"
                                    />
                                </div>
                                <div className="controls">
                                    <button onClick={() => setCurrentImageIndex((prev) =>
                                        prev === 0 ? getProductImages(product).length - 1 : prev - 1
                                    )}>⬅</button>
                                    <button onClick={() => setCurrentImageIndex((prev) =>
                                        (prev + 1) % getProductImages(product).length
                                    )}>➡</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="c12">
                    <div className="single-product-details">
                        <h2>{product?.name}</h2>
                        <h5>${typeof product?.price === 'number' ? product.price.toFixed(2) : product.price}</h5>
                        <h4>Description:</h4>
                        <p>{product?.description}</p>
                        <p>Category: {product?.category}</p>
                        <p>Stock: {product?.stock}</p>
                        <input
                            className="form-control"
                            type="number"
                            value={inputValue}
                            onChange={(e) => setInputValue(Number(e.target.value))}
                            min="1"
                            max={product.stock}
                        />
                        <div className="price-box-bar">
                            <div className="action-buttons">
                           
                                
                                <button
                                    className="btn hvr-hover"
                                    onClick={addToCart}
                                    disabled={product.stock === 0}
                                >
                                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                </button>

                                <button
                                    className="btn hvr-hover"
                                    onClick={addToWishlist}
                                >
                                    {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                                </button>
                                <div className="social-icons">
                                    <img src={Fb} alt="Facebook" className="social-icon" />
                                    <img src={Insk} alt="Instagram" className="social-icon" />
                                    <img src={Tw} alt="Twitter" className="social-icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="rowmy-5">
                <div className="cardcard-outline-secondaryy-4">
                    <div className="card-header">
                        <h2>Product Reviews</h2>
                    </div>
                    <div className="card-body">
                        <div className="media mb-3">
                            <div className="mr-2">
                                <img
                                    className="rounded-circle border p-1"
                                    src={Vinh}
                                    alt="Generic placeholder"
                                />
                            </div>
                            <div className="media-body">
                                <p>Very beautiful tree , enthusiastic staff</p>
                                <small className="text-muted">Posted by PhạmVinh on 3/1/18</small>
                            </div>
                        </div>
                        <hr />
                        <div className="media mb-3">
                            <div className="mr-2">
                                <img
                                    className="rounded-circle border p-1"
                                    src={Tien}
                                />
                            </div>
                            <div className="media-body">
                                <p>Very beautiful tree</p>
                                <small className="text-muted">Posted by Tiến on 3/1/18</small>
                            </div>
                        </div>
                        <hr />
                        <div className="media mb-3">
                            <div className="mr-2">
                                <img
                                    className="rounded-circle border p-1"
                                    src={Tu}
                                />
                            </div>
                            <div className="media-body">
                                <p>5 star rating</p>
                                <small className="text-muted">Posted by Tú on 3/1/18</small>
                            </div>
                        </div>
                        <hr />
                        <a href="#" className="btn6hvr-hover">
                            Leave a Review
                        </a>
                    </div>
                </div>
            </div>
        </div>



    );
};

export default Shopdetail;

