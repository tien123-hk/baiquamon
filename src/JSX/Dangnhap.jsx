import React, { useState } from "react";
import axios from "axios";
import "../CSS/Dangnhap.css";

const AuthPopup = ({ isOpen, onClose, onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user",
        position: "",
        phone: "",
        image: ""
    });

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "user",
            position: "",
            phone: "",
            image: ""
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async () => {
        try {
            const loginData = {
                email: formData.email.trim().toLowerCase(),
                password: formData.password
            };

           
            if (formData.email === 'admin') {
                try {
                    const adminResponse = await axios.post('http://localhost:8086/admin/login', {
                        username: formData.email,
                        password: formData.password
                    });
                    
                    if (adminResponse.data) {
                        const adminUserData = {
                            ...adminResponse.data,
                            isAdmin: true,
                            role: 'employee',
                            username: 'Admin',
                            email: 'admin',
                            canManageAccounts: true // Add this flag for account management
                        };
                        localStorage.setItem('user', JSON.stringify(adminUserData));
                        onLoginSuccess(adminUserData);
                        onClose();
                        return;
                    }
                } catch (adminError) {
                    console.log('Not an admin account, trying regular login');
                }
            }

            // Regular user login
            const response = await axios.post('http://localhost:8086/BE/auth/login', loginData);

            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                onLoginSuccess(response.data);
                onClose();
                setFormData({
                    email: "",
                    password: "",
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            alert("Invalid email or password");
        }
    };

    const handleRegister = async () => {
        try {
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords don't match!");
                return;
            }

            const registerData = {
                username: formData.username,
                email: formData.email.trim().toLowerCase(),

                password: formData.password,
                role: formData.role === 'employee' ? 'employee' : 'user',
                position: formData.position || '',
                phone: formData.phone || '',
                image: formData.image || ''
            };

            const response = await axios.post('http://localhost:8086/BE/auth/register', registerData);
            
            if (response.data) {
                alert("Registration successful! Please login.");
                setIsLogin(true);
                setFormData({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    role: "user",
                    position: "",
                    phone: "",
                    image: ""
                });
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert(error.response?.data?.message || "Registration failed");
        }
    };

    // Add check for isOpen
    if (!isOpen) return null;

    return (
        <div className="popup-overlay1">
            <div className="popup-container1">
                <button 
                    className="close-btn" 
                    onClick={onClose}  // Simplified the close handler
                >
                    ✖
                </button>
                <h2>{isLogin ? "Login" : "Register"}</h2>

                <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                    {!isLogin && (
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {!isLogin && (
                        <>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <select 
                                name="role" 
                                value={formData.role} 
                                onChange={handleChange}
                            >
                                <option value="user">Khách hàng</option>
                                <option value="employee">Nhân viên</option>
                            </select>

                            {formData.role === 'employee' && (
                                <>
                                    <input
                                        type="text"
                                        name="position"
                                        placeholder="Position"
                                        value={formData.position}
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Phone Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="image"
                                        placeholder="Image URL"
                                        value={formData.image}
                                        onChange={handleChange}
                                        required
                                    />
                                </>
                            )}
                        </>
                    )}
                    <button type="button" onClick={isLogin ? handleLogin : handleRegister}>
                        {isLogin ? "Login" : "Register"}
                    </button>
                </form>

                <p className="toggle-text">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <span onClick={toggleAuthMode}>
                        {isLogin ? " Register" : " Login"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AuthPopup;
