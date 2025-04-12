import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/ShopManagement.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


    const Quanlidonhang = () => {
        const [orders, setOrders] = useState([]);
        const [showPendingOrders, setShowPendingOrders] = useState(false);
        const [showRevenue, setShowRevenue] = useState(false);
        const [revenue, setRevenue] = useState(0);
        const [completedOrders, setCompletedOrders] = useState([]);
        const [revenueData, setRevenueData] = useState([]);

        const handleRevenueClick = async () => {
            try {
                const response = await axios.get('https://be-1lkh.onrender.com/orders');
                const orders = response.data;
                
                // Calculate total revenue
                const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
                
                // Get completed orders
                const completed = orders.filter(order => order.status === 'completed');
                
                // Prepare chart data
                const chartData = orders.reduce((acc, order) => {
                    const date = new Date(order.createdAt).toLocaleDateString();
                    const existing = acc.find(item => item.date === date);
                    if (existing) {
                        existing.revenue += order.totalAmount;
                        existing.orders += 1;
                        existing.items += order.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
                    } else {
                        acc.push({ 
                            date, 
                            revenue: order.totalAmount,
                            orders: 1,
                            items: order.items.reduce((sum, item) => sum + (item.quantity || 0), 0)
                        });
                    }
                    return acc;
                }, []);

                setRevenue(totalRevenue);
                setCompletedOrders(completed);
                setRevenueData(chartData);
                setShowRevenue(true);
                setShowPendingOrders(false);
            } catch (error) {
                console.error('Error calculating revenue:', error);
            }
        };

        const handlePendingOrdersClick = async () => {
            try {
                const response = await axios.get('https://be-1lkh.onrender.com/orders');
                setOrders(response.data);
                setShowPendingOrders(true);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        const handleConfirmOrder = async (orderId) => {
            try {
                // Update order status to 'completed'
                await axios.put(`https://be-1lkh.onrender.com/orders/${orderId}`, {
                    status: 'completed'
                });
            
                // Remove from pending orders list
                setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
            
                // Refresh revenue data if revenue view is active
                if (showRevenue) {
                    handleRevenueClick();
                }
            
                alert('Đơn hàng đã được xác nhận và chuyển sang trạng thái đang giao!');
            } catch (error) {
                console.error('Error confirming order:', error);
                alert('Không thể xác nhận đơn hàng. Vui lòng thử lại!');
            }
        };
        

        return (
            <div className="shop-management-container">
                <div className="all-title-box">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h2>Order Management</h2>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="management-buttons">
                    <button 
                        className="management-btn revenue"
                        onClick={handleRevenueClick}
                    >
                        Revenue
                    </button>
                    <button
                        className="management-btn pending-orders"
                        onClick={handlePendingOrdersClick}
                    >
                        Order needs confirmation
                    </button>
                </div>

                {showRevenue && (
                    <>
                        <div className="revenue-container">
                            <h3>Total Revenue</h3>
                            <div className="revenue-amount">
                                ${revenue.toLocaleString()}
                            </div>
                        </div>
                        
                        <div className="revenue-details">
                            <div className="revenue-chart">
                                <h3>Statistical Chart</h3>
                                <BarChart width={800} height={300} data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis yAxisId="left" />
                                    <YAxis yAxisId="right" orientation="right" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar yAxisId="left" dataKey="revenue" fill="#b0b435" name="Revenue ($)" />
                                    <Bar yAxisId="right" dataKey="orders" fill="#82ca9d" name="Order number" />
                                    <Bar yAxisId="right" dataKey="items" fill="#8884d8" name="Product number" />
                                </BarChart>
                            </div>

                            <div className="sold-orders-list">
                                <h3>Sold order</h3>
                                {completedOrders.map(order => (
                                    <div key={order._id} className="sold-order-item">
                                        <p><strong>Code:</strong> {order._id}</p>
                                        <p><strong>Name:</strong> {order.customer.name}</p>
                                        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                                        <p><strong>Total:</strong> ${order.totalAmount.toLocaleString()}</p>
                                        <p><strong>Quantity:</strong> {order.items.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {showPendingOrders && (
                    <div className="orders-table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer Name</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Order Date</th>
                                    <th>Total Items</th>
                                    <th>Total Amount</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                              
                                {orders.map((order) => {
                                    const totalItems = order.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
                                    
                                    return (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.customer.name}</td>
                                            <td>{order.customer.phone}</td>
                                            <td>{order.customer.address}</td>
                                            <td>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                                            <td>{totalItems}</td>
                                            <td>${order.totalAmount?.toLocaleString() || '0'}</td>
                                            <td>{order.status === 'completed' ? 'On delivery' : 'Waitting for confirmation'}</td>
                                            <td>
                                                {order.status !== 'completed' && (
                                                    <button
                                                        className="btn btn-success"
                                                        onClick={() => handleConfirmOrder(order._id)}
                                                    >
                                                        Confirm
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
      
    );
};

export default Quanlidonhang;

