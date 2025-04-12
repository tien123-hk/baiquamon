import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../CSS/Gallery.css';
import Search from '../assets/anh/search.png';

const SidebarShop = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("default");

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        setUser(loggedInUser);
        fetchProducts();
    }, []); // Remove selectedCategory and sortBy from dependency array

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://be-1lkh.onrender.com/products/');
            let sortedProducts = [...response.data];
            
            if (sortBy === "price-asc") {
                sortedProducts.sort((a, b) => a.price - b.price);
            } else if (sortBy === "price-desc") {
                sortedProducts.sort((a, b) => b.price - a.price);
            }
            
            setProducts(sortedProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Add new useEffect for handling category and sort changes
    useEffect(() => {
        if (products.length > 0) {
            let filteredProducts = [...products];
            
            // Apply category filter
            if (selectedCategory !== "All") {
                filteredProducts = filteredProducts.filter(product => 
                    product.category === selectedCategory
                );
            }

            // Apply sorting
            if (sortBy === "price-asc") {
                filteredProducts.sort((a, b) => a.price - b.price);
            } else if (sortBy === "price-desc") {
                filteredProducts.sort((a, b) => b.price - a.price);
            }

            setProducts(filteredProducts);
        }
    }, [selectedCategory, sortBy]);

    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    
        try {
            let filteredProducts = [];
            
            if (value.trim() === '') {
                // Nếu không có từ khóa tìm kiếm, lấy tất cả sản phẩm
                const response = await axios.get('https://be-1lkh.onrender.com/products/');
                filteredProducts = response.data;
            } else {
                // Tìm kiếm local trong danh sách sản phẩm hiện tại
                filteredProducts = products.filter(product => 
                    product.name.toLowerCase().includes(value.toLowerCase()) ||
                    product.category.toLowerCase().includes(value.toLowerCase())
                );
            }
    
            // Áp dụng bộ lọc danh mục
            if (selectedCategory !== "All") {
                filteredProducts = filteredProducts.filter(product => 
                    product.category === selectedCategory
                );
            }
    
            // Áp dụng sắp xếp
            if (sortBy === "price-asc") {
                filteredProducts.sort((a, b) => a.price - b.price);
            } else if (sortBy === "price-desc") {
                filteredProducts.sort((a, b) => b.price - a.price);
            }
    
            setProducts(filteredProducts);
        } catch (error) {
            console.error('Lỗi khi tìm kiếm:', error);
            alert('Không thể tìm kiếm sản phẩm. Vui lòng thử lại!');
        }
    };

    const addToCart = async (product) => {
        if (!user) {
            alert('Please login to add items to cart');
            return;
        }

        try {
            const userId = user.user ? user.user.id : user.id;
            // Check if product already exists in cart
            const cartResponse = await axios.get(`https://be-1lkh.onrender.com/cart/${userId}`);
            const existingItem = cartResponse.data.find(item => item.productId === product._id);

            if (existingItem) {
                // Update quantity if product exists
                await axios.put(`https://be-1lkh.onrender.com/cart/update/${existingItem._id}`, {
                    userId: userId,
                    quantity: existingItem.quantity + 1
                });
                alert('Product quantity updated in cart!');
            } else {
                // Add new product if it doesn't exist
                const cartData = {
                    userId: userId,
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    img: product.img,
                    quantity: 1
                };
                const response = await axios.post('https://be-1lkh.onrender.com/cart/add', cartData);
                if (response.data) {
                    alert('Product added to cart successfully!');
                }
            }
        } catch (error) {
            console.error('Error managing cart:', error);
            alert('Failed to update cart');
        }
    };

    const handleClick = (productId) => {
        navigate(`/shopdetail/${productId}`);
    };

    return (
        <div className="Gallery">
            <div className="all-title-box">
                <div className="container10">
                    <div className="row10">
                        <div className="c10">
                            <h2>Sidebar Shop</h2>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="#">SHOP</a>
                                </li>
                                <li className="breadcrumb-item active">/ Sidebar Shop</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ourgallery">
                <h1>Sidebar Shop</h1>
                <p>All products are the most sold by the shop</p>
            </div>
            <div className="shopboxinner">
                <div className="shoptop">
                    <div className="shoptop11">
                        <p>Sort by</p>
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="default">Default</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                        <p>Showing {products.length} results</p>
                    </div>
                    <div className="shoptop12">
                        <input 
                            placeholder="Search Products..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <img src={Search} alt="search" />
                    </div>
                </div>

                <div className="shopall">
                    <div className="shopall11">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div key={product._id} className="spall">
                                    <img 
                                        src={product.img} 
                                        alt={product.name} 
                                        className="gallery-image" 
                                        onClick={() => handleClick(product._id)}
                                    />
                                    <b>{product.name}</b>
                                   
                                    <b>${ product.price}</b>
                                    <p>Stock: {product.stock}</p>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addToCart(product);
                                        }} 
                                        className="addtosp"
                                        disabled={product.stock === 0}
                                    >
                                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No products found.</p>
                        )}
                    </div>
                    <div className="shopall12">
                        <b>Categories</b>
                        <ul>
                        {["All", "Bulbs", "Fruits", "Podded", "Root"].map(category => (
                        <li key={category} 
                            className={selectedCategory === category ? "active" : ""}
                            onClick={() => setSelectedCategory(category)}>
                            {category}
                        </li>
                    ))}
                        </ul>

                    </div>
                </div>

            </div>

            {/* <div className="thanhhang">
                <div className="thanhcon" id="color-filter">
                    {["All", "Bulbs", "Fruits", "Podded", "Root"].map(category => (
                        <button key={category} 
                            className={selectedCategory === category ? "active" : ""}
                            onClick={() => setSelectedCategory(category)}>
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            
            <div className="galleryanh">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="gallery-item" onClick={() => handleClick(product._id)}>
                            <img src={product.img} alt={product.category} className="gallery-image" />
                            <button onClick={() => addToCart(product)} className="addto">Add to Cart</button>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div> */}
        </div>
    );
};

export default SidebarShop;
