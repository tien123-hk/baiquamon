import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/AccountManagement.css';

const AccountManagement = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        try {
            const response = await axios.get('http://localhost:8086/BE/auth/accounts');
            setAccounts(response.data);
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    };

    const handleDelete = async (accountId) => {
        if (window.confirm('Are you sure you want to delete this account?')) {
            try {
                await axios.delete(`http://localhost:8086/BE/auth/accounts/${accountId}`);
                fetchAccounts(); // Refresh the list after deletion
            } catch (error) {
                console.error('Error deleting account:', error);
                alert('Failed to delete account');
            }
        }
    };
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8086/BE/contact', {
            ...formData,
            rating: parseInt(formData.rating)
        });
        if (response.data) {
            alert('Thank you for your feedback!');
            setFormData({
                ...formData,
                subject: '',
                message: '',
                rating: 5,
                reviewType: 'contact'
            });
        }
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send feedback. Please try again.');
    }
};

    return (
        <div className="account-management">
            <h2>Account management</h2>
            <div className="account-list">
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Phone</th>
                            <th>Position</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map(account => (
                            <tr key={account._id}>
                                <td>{account.username}</td>
                                <td>{account.email}</td>
                                <td>{account.role}</td>
                                <td>{account.phone || 'N/A'}</td>
                                <td>{account.position || 'N/A'}</td>
                                <td>
                                    <button onClick={() => handleEdit(account._id)}>Edit</button>
                                    <button onClick={() => handleDelete(account._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AccountManagement;