
import '../CSS/Cart.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        district: '',
        ward: '',
        paymentMethod: 'cash' // Add default payment method
    });

    // Update the handleCustomerInfoChange function
    const handleCustomerInfoChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Update the form inputs to use name attribute and handleCustomerInfoChange

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = localStorage.getItem('user');

                if (userData) {
                    const parsedUser = JSON.parse(userData);

                    setUser(parsedUser.user); // Store only the user object
                    fetchCartItems(parsedUser.user.id); // Use the correct user ID
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const fetchCartItems = async (userId) => {
        try {
            console.log('Fetching cart for userId:', userId);
            const response = await axios.get(`https://be-1lkh.onrender.com/cart/${userId}`);
            console.log('Cart response:', response.data);
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const handleRemoveItem = async (itemId) => {
        if (!user) return;
        try {
            await axios.delete(`https://be-1lkh.onrender.com/cart/${user.id}/${itemId}`);
            // Fetch updated cart items immediately after deletion
            await fetchCartItems(user.id);
            alert('Item removed from cart successfully');
        } catch (error) {
            console.error('Error removing item:', error);
            alert('Failed to remove item');
        }
    };

    const handleQuantityChange = async (itemId, newQuantity) => {
        if (!user) return;
        try {
            await axios.put(`https://be-1lkh.onrender.com/cart/update/${itemId}`, {
                userId: user.id,
                quantity: parseInt(newQuantity)
            });

            // Update local state after successful API call
            await fetchCartItems(user.id);
        } catch (error) {
            console.error('Error updating quantity:', error);
            alert('Failed to update quantity');
        }
    };

    const handleConfirmOrder = async () => {
        if (!user) {
            alert('Please login to place order');
            return;
        }

        if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            const orderData = {
                customer: {
                    name: customerInfo.name,
                    phone: customerInfo.phone,
                    address: `${customerInfo.address}, ${customerInfo.ward}, ${customerInfo.district}, ${customerInfo.city}`
                },
                items: cartItems.map(item => ({
                    product: item._id,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
            };

            // Create order first
            const response = await axios.post('https://be-1lkh.onrender.com/orders', orderData);

            if (response.data) {
                // Clear all items from cart
                await axios.delete(`https://be-1lkh.onrender.com/cart/${user.id}`);

                // Reset local state
                setCartItems([]);
                setIsCheckoutOpen(false);
                setCustomerInfo({
                    name: '',
                    phone: '',
                    address: '',
                    city: '',
                    district: '',
                    ward: ''
                });

                alert('Đặt hàng thành công!');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Đặt hàng thất bại. Vui lòng thử lại.');
        }
    };
    const PaymentMethod = ({ onClose, onSelectPayment, totalAmount, orderData }) => {
        const handleCODPayment = async () => {
            try {
                // Thêm phương thức thanh toán vào orderData
                const finalOrderData = {
                    ...orderData,
                    paymentMethod: 'cod',
                    paymentStatus: 'pending'
                };

                // Gửi đơn hàng lên server
                const response = await axios.post('https://be-1lkh.onrender.com/orders', finalOrderData);

                if (response.data) {
                    // Xóa giỏ hàng sau khi đặt hàng thành công
                    await axios.delete(`https://be-1lkh.onrender.com/cart/${orderData.userId}`);
                    alert('Đặt hàng thành công!');
                    onSelectPayment('cod'); // Đóng popup và cập nhật trạng thái
                }
            } catch (error) {
                console.error('Lỗi khi đặt hàng:', error);
                alert('Đặt hàng thất bại. Vui lòng thử lại.');
            }
        };
    }


    useEffect(() => {
        if (customerInfo.paymentMethod === 'paypal' && window.paypal) {
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: cartItems.reduce((total, item) =>
                                    total + (item.price * item.quantity), 0).toFixed(2)
                            }
                        }]
                    });
                },
                onApprove: (data, actions) => {
                    return actions.order.capture().then(function (details) {
                        alert('Thanh toán thành công!');
                        handleConfirmOrder();
                    });
                }
            }).render('#paypal-button');
        }
    }, [customerInfo.paymentMethod]);

    // Sửa lại hàm handlePayPalPayment
    const handlePayPalPayment = async (details) => {
        try {
            // Kiểm tra thông tin khách hàng trước khi thanh toán
            if (!customerInfo.name || !customerInfo.phone || !customerInfo.address ||
                !customerInfo.city || !customerInfo.district || !customerInfo.ward) {
                alert('Please fill in all customer information before payment');
                return;
            }

            const orderData = {
                userId: user.id,
                customer: {
                    name: customerInfo.name,
                    phone: customerInfo.phone,
                    address: `${customerInfo.address}, ${customerInfo.ward}, ${customerInfo.district}, ${customerInfo.city}`
                },
                items: cartItems.map(item => ({
                    product: item._id,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
                paymentMethod: 'paypal',
                paymentStatus: 'completed',
                paypalDetails: {
                    transactionId: details.id,
                    payerEmail: details.payer.email_address,
                    payerName: `${details.payer.name.given_name} ${details.payer.name.surname}`
                }
            };

            const response = await axios.post('https://be-1lkh.onrender.com/orders', orderData);
            if (response.data) {
                await axios.delete(`https://be-1lkh.onrender.com/cart/${user.id}`);
                setCartItems([]);
                setIsCheckoutOpen(false);
                setCustomerInfo({
                    name: '',
                    phone: '',
                    address: '',
                    city: '',
                    district: '',
                    ward: '',
                    paymentMethod: 'cash'
                });
                alert('Payment successful!');
            }
        } catch (error) {
            console.error('Payment processing error:', error);
            alert('Payment failed. Please try again.');
        }
    };
    const handleMoMoPayment = async () => {
        try {
            const momoPaymentData = {
                partnerCode: 'MOMO',
                accessKey: 'F8BBA842ECF85',
                secretKey: 'K951B6PE1waDMi640xX08PD3vg6EkVlz',
                orderInfo: `Thanh toán đơn hàng cho ${orderData.userId}`,
                amount: totalAmount.toFixed(2),
                // Sửa lại redirectUrl và ipnUrl để phù hợp với môi trường của bạn
                redirectUrl: 'http://localhost:5173/payment-return',
                ipnUrl: 'https://be-1lkh.onrender.com/momo-notify',
                requestType: 'payWithMethod',
                extraData: '',
                lang: 'vi',
                autoCapture: true,
                orderGroupId: '',
                partnerName: "Test",
                storeId: "MomoTestStore"
            };

            // Sửa lại URL endpoint để khớp với route trong server
            const response = await axios.post('https://be-1lkh.onrender.com/create-momo-payment', momoPaymentData);

            if (response.data && response.data.payUrl) {
                // Lưu thông tin đơn hàng
                localStorage.setItem('pendingMoMoOrder', JSON.stringify({
                    ...orderData,
                    paymentMethod: 'momo',
                    paymentStatus: 'pending',
                    momoOrderId: response.data.orderId
                }));

                // Chuyển hướng đến trang thanh toán MoMo
                window.location.href = response.data.payUrl;
            }
        } catch (error) {
            console.error('Lỗi thanh toán MoMo:', error);
            alert('Không thể tạo thanh toán MoMo. Vui lòng thử lại.');
        }
    };

    // ... existing code ... 
    
    // Trong phần payment options
    return (
        <div className="Cart">
            <div className="all-title-box">
                <div className="container10">
                    <div className="row10">
                        <div className="c10">
                            <h2>CART</h2>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#">SHOP</a></li>
                                <li className="breadcrumb-item active">/ CART</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-12">
                <div className="table-main table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Images</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                                <tr key={item._id}>
                                    <td className="thumbnail-img">
                                        <img src={item.img} alt={item.name} />
                                    </td>
                                    <td className="name-pr">{item.name}</td>
                                    <td className="price-pr">${item.price}</td>
                                    <td className="quantity-box">
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                                            min="1"
                                        />
                                    </td>
                                    <td className="total-pr">${item.price * item.quantity}</td>
                                    <td className="remove-pr">
                                        <button onClick={() => handleRemoveItem(item._id)}>
                                            ×
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row my-5">
                <div className="col-lg-6 col-sm-6">
                    <div className="coupon-box">
                        <div className="input-group input-group-sm">
                            <input
                                className="form-control"
                                placeholder="Enter your coupon code"
                                aria-label="Coupon code"
                                type="text"
                            />
                            <div className="input-group-append">
                                <button className="btn btn-theme" type="button">
                                    Apply Coupon
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-sm-6">
                    <div className="update-box">
                        <input
                            value="Order"
                            type="submit"
                            onClick={() => setIsCheckoutOpen(true)}
                        />
                    </div>
                </div>
            </div>


            {isCheckoutOpen && (
                <div className="popup-overlay">
                    <div className="popup-container">
                        <h2>Order confirmation</h2>

                        <div className="order-items">
                            {cartItems.map(item => (
                                <div key={item._id} className="order-item">
                                    <img src={item.img} alt={item.name} />
                                    <div className="order-item-details">
                                        <h4>{item.name}</h4>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price: ${item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="total-amount">
                            Total price: ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                        </div>

                        {/* Add payment method selection */}
                        <div className="payment-method">
                            <h4>Payment Method</h4>
                          

                          
                            <div className="payment-options">
                                <label>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cash"
                                        onChange={(e) => setCustomerInfo({ ...customerInfo, paymentMethod: e.target.value })}
                                        defaultChecked
                                    />
                                    Cash on delivery
                                </label>
                            
                                <label>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="paypal"
                                        onChange={(e) => setCustomerInfo({ ...customerInfo, paymentMethod: e.target.value })}
                                    />
                                    Payment via PayPal
                                </label>
                            </div>
                            
                            <div className="payment-option">
                                {customerInfo.paymentMethod === 'paypal' && (
                                    <PayPalScriptProvider options={{
                                        "client-id": "Ae1Pw8WbfflMacyDbpJJhz6NFgi0DCvZjGQp6dRkGtb3GtN7mYwbjZt-0IB8-ZxpEvaDUnGatab4glYk"
                                    }}>
                                        <PayPalButtons
                                            createOrder={(data, actions) => {
                                                return actions.order.create({
                                                    purchase_units: [{
                                                        amount: {
                                                            value: cartItems.reduce((total, item) =>
                                                                total + (item.price * item.quantity), 0).toFixed(2)
                                                        }
                                                    }]
                                                });
                                            }}
                                            onApprove={(data, actions) => {
                                                return actions.order.capture()
                                                    .then(details => handlePayPalPayment(details))
                                                    .catch(err => {
                                                        console.error('PayPal capture error:', err);
                                                        alert('Payment failed. Please try again.');
                                                    });
                                            }}
                                            style={{ layout: "horizontal" }}
                                        />
                                    </PayPalScriptProvider>
                                )}
                            </div>
                       
                        </div>

                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={customerInfo.name || ''}
                            onChange={handleCustomerInfoChange}
                            required
                        />

                        <input
                            type="text"
                            name="phone"
                            placeholder="Number"
                            value={customerInfo.phone || ''}
                            onChange={handleCustomerInfoChange}
                            required
                        />
                        <div className="address-inputs">
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={customerInfo.city || ''}
                                onChange={handleCustomerInfoChange}
                                required
                            />
                            <input
                                type="text"
                                name="district"
                                placeholder="District"
                                value={customerInfo.district || ''}
                                onChange={handleCustomerInfoChange}
                                required
                            />
                            <input
                                type="text"
                                name="ward"
                                placeholder="Ward"
                                value={customerInfo.ward || ''}
                                onChange={handleCustomerInfoChange}
                                required
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={customerInfo.address || ''}
                                onChange={handleCustomerInfoChange}
                                required
                            />
                        </div>


                        <div className="popup-actions">
                            <button onClick={handleConfirmOrder}>Confirm Order</button>
                            <button onClick={() => setIsCheckoutOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
