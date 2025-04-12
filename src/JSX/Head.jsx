import React, { useState, useEffect } from "react";
import '../CSS/Head.css';
import AuthPopup from "./Dangnhap.jsx";  
import Logo from '../assets/anh/13.jpg';
import Gio from '../assets/anh/gio.png';
import { Link } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";

const Head = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
      
        setUser(loggedInUser);
    }, []);

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        setIsPopupOpen(false);
    };

    return (
        <div className="body1">
            <div className="main-top">
                <div className="row">
                    <div className="a1">
                        <div className="custom-select-box">
                            <select id="basic" className="ab">
                                <option>$ USD</option>
                                <option>Đ VND</option>
                                <option>€ EUR</option>
                            </select>
                        </div>
                        <div className="right-phone-box">
                            <p>Call US : <a href="#">+84 335677868</a></p>
                        </div>
                        <div className="our-link">
                            <ul>
                                <li>
                                    <Link to='/myacc'>
                                        <p><i className="fa fa-user s_color"></i> MY ACCOUNT |</p>
                                    </Link>
                                </li>
                                <li>
                                    <p><i className="fas fa-location-arrow"></i> OUR LOCATION |</p>
                                </li>
                                <li>
                                    <Link to='/contact'>
                                        <p><i className="fas fa-headset"></i> CONTACT US</p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="a2">
                        <div className="login-box">
                            {user ? (
                                <div>
                                    <span>Welcome, {user.username || user.user?.username}</span>
                                    <button onClick={() => {
                                        setUser(null);
                                        localStorage.removeItem('user');
                                    }}>Logout</button>
                                </div>
                            ) : (
                                <button onClick={() => setIsPopupOpen(true)}>Login / Register</button>
                            )}
                            <AuthPopup
                                isOpen={isPopupOpen}
                                onClose={() => setIsPopupOpen(false)}
                                onLoginSuccess={handleLoginSuccess}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <header className="main-header">
                <nav className="bb">
                    <div className="container">
                        <div className="navbar-header">
                            <p className="navbar-brand">
                                <Link to='/home'><img src={Logo} className="logo" alt="" /></Link>
                            </p>
                        </div>

                        <div className="b1">
                            <ul className="b12">
                                {(!user || (user.role !== 'employee' && user.user?.role !== 'employee')) && (
                                    <>
                                        <li className="nav-item">
                                            <Link to='/home'><p className="nav-link">HOME</p></Link>
                                        </li>
                                        <li className="nav-item active">
                                            <Link to='/aboutus'><p className="nav-link">ABOUT US</p></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to='/gallery'><p className="nav-link">GALLERY</p></Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to='/contact'><p className="nav-link">CONTACT US</p></Link>
                                        </li>
                                    </>
                                )}
                                <li className="b13">
                                    <p className="b14" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>SHOP</p>
                                    {isDropdownOpen && (
                                        <div className="dropdown-menu">
                                            <Link to='/sidebarshop' onClick={() => setIsDropdownOpen(false)}><p>Sidebar Shop</p></Link>
                                            <Link to='/shopdetail' onClick={() => setIsDropdownOpen(false)}><p>Shop Detail</p></Link>
                                            <Link to='/cart' onClick={() => setIsDropdownOpen(false)}><p>Cart</p></Link>
                                            <Link to='/home' onClick={() => setIsDropdownOpen(false)}><p>Checkout</p></Link>
                                            <Link to='/myacc' onClick={() => setIsDropdownOpen(false)}><p>My Account</p></Link>
                                            <Link to='/wishlist' onClick={() => setIsDropdownOpen(false)}><p>Wishlist</p></Link>
                                        </div>
                                    )}
                                </li>
                                {
                                    user && (
                                        user.role === 'employee' || user.user?.role === 'employee' ? (
                                            <li className="nav-item" style={{ display: 'flex', gap: '10px' }}>
                                                <Link to='/shopmanagement'>
                                                    <button className="nav-link" style={{ backgroundColor: '#b0b435', color: 'white', border: 'none', padding: '8px 15px' }}>
                                                        Product Managenment
                                                    </button>
                                                </Link>
                                                <Link to='/quanlidonhang'>
                                                    <button className="nav-link" style={{ backgroundColor: '#b0b435', color: 'white', border: 'none', padding: '8px 15px' }}>
                                                        Order Managenment
                                                    </button>
                                                </Link>
                                                {user.canManageAccounts && (
                                                    <Link to='/accountmanagement'>
                                                        <button className="nav-link" style={{ backgroundColor: '#b0b435', color: 'white', border: 'none', padding: '8px 15px' }}>
                                                            Account Management
                                                        </button>
                                                    </Link>
                                                )}
                                                <Link to='/contactmana'>
                                                    <button className="nav-link" style={{ backgroundColor: '#b0b435', color: 'white', border: 'none', padding: '8px 15px' }}>
                                                        Review Management
                                                    </button>
                                                </Link>
                                            </li>
                                        ) : (
                                            <li className="nav-item">
                                                <Link to='/cart'>
                                                    <p className="nav-link cart-link" style={{gap:'20px'}}>
                                                        <FaCartShopping />
                                                        Cart
                                                    </p>
                                                </Link>
                                            </li>
                                        )
                                    )
                                }

                            </ul>
                        </div>

                        <div className="attr-nav">

                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Head;
