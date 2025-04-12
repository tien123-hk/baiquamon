import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/ShopManagement.css';

const ShopManagement = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        img: '',
        imga: '',
        imgb: '',
        category: '',
        stock: ''
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8086/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:8086/products/${productId}`);
                fetchProducts();
                alert('Product deleted successfully!');
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product');
            }
        }
    };

    const [currentImages, setCurrentImages] = useState({});

    // Add this function to handle image navigation
    const handleImageChange = (productId, direction) => {
        const product = products.find(p => p._id === productId);
        const images = [product.img, product.imga, product.imgb].filter(Boolean);

        setCurrentImages(prev => {
            const currentIndex = (prev[productId] || 0);
            let newIndex;

            if (direction === 'next') {
                newIndex = (currentIndex + 1) % images.length;
            } else {
                newIndex = (currentIndex - 1 + images.length) % images.length;
            }

            return { ...prev, [productId]: newIndex };
        });
    };

    const [isEditing, setIsEditing] = useState(false);
    // Update the table row rendering
    const handleEdit = (product) => {
        setIsEditing(true);
        setFormData({
            _id: product._id,
            name: product.name,
            price: product.price,
            description: product.description,
            img: product.img,
            imga: product.imga || '',
            imgb: product.imgb || '',
            category: product.category,
            stock: product.stock
        });
    };
    // Update handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData = {
                name: formData.name,
                price: Number(formData.price),
                description: formData.description,
                img: formData.img,
                imga: formData.imga || null,
                imgb: formData.imgb || null,
                category: formData.category,
                stock: Number(formData.stock)
            };

            if (isEditing) {
                await axios.put(`http://localhost:8086/products/${formData._id}`, productData);
                alert("Product updated successfully!");
                setIsEditing(false);
            } else {
                await axios.post('http://localhost:8086/products/add', productData);
                alert("Product added successfully!");
            }

            fetchProducts();
            setFormData({
                name: "",
                price: "",
                description: "",
                img: "",
                imga: "",
                imgb: "",
                category: "",
                stock: ""
            });
        } catch (error) {
            console.error('Error:', error);
            alert(error.response?.data?.message || "Operation failed");
        }
    };
    return (
        <div className="shop-management-container">
            <div className="all-title-box">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Product Management</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cart-box-main">
                <div className="container123">
                    <div className="product-form-box">
                        <h3>{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Product Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="price"
                                        placeholder="Price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <textarea
                                    className="form-control"
                                    name="description"
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="img"
                                        placeholder="Main Image URL"
                                        value={formData.img}
                                        onChange={handleChange}

                                    />

                                </div>
                                <div className="form-group col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="imga"
                                        placeholder="Additional Image A URL"
                                        value={formData.imga}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="imgb"
                                        placeholder="Additional Image B URL"
                                        value={formData.imgb}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="category"
                                        placeholder="Category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="stock"
                                        placeholder="Stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Add Product</button>
                        </form>
                    </div>

                    <div className="table-main table-responsive  mana">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Images</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Stock</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td className="thumbnail-img">
                                            <div className="image-navigation">
                                                <button
                                                    className="nav-btn prev"
                                                    onClick={() => handleImageChange(product._id, 'prev')}
                                                >
                                                    &#8249;
                                                </button>
                                                <img
                                                    src={[product.img, product.imga, product.imgb].filter(Boolean)[currentImages[product._id] || 0]}
                                                    alt={product.name}
                                                />
                                                <button
                                                    className="nav-btn next"
                                                    onClick={() => handleImageChange(product._id, 'next')}
                                                >
                                                    &#8250;
                                                </button>
                                            </div>
                                        </td>
                                        <td className="name-pr" onClick={() => handleEdit(product)} style={{ cursor: 'pointer' }}>
                                            <h4>{product.name}</h4>
                                            <p>{product.description}</p>
                                        </td>
                                        <td className="price-pr" onClick={() => handleEdit(product)} style={{ cursor: 'pointer' }}>
                                            <p>${product.price}</p>
                                        </td>
                                        <td className="category-pr" onClick={() => handleEdit(product)} style={{ cursor: 'pointer' }}>
                                            <p>{product.category}</p>
                                        </td>
                                        <td className="stock-pr" onClick={() => handleEdit(product)} style={{ cursor: 'pointer' }}>
                                            <p>{product.stock}</p>
                                        </td>
                                        <td className="action-pr">
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(product._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                </div>
            </div>
        </div>
        
    );
};

export default ShopManagement;
