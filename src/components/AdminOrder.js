import React, { useEffect, useState } from 'react';
import './OrderPage.css'; // Import the CSS file for styling

const OrdersPage = () => {
    const [orders, setOrders] = useState([]); // To store fetched orders
    const [loading, setLoading] = useState(true); // To handle loading state
    const [error, setError] = useState(null); // To handle errors

    useEffect(() => {
        // Fetch orders from the API
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/order'); // Replace with your actual API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json(); // Parse JSON data
                setOrders(data); // Set orders to the state
                setLoading(false); // Set loading to false after data is fetched
            } catch (err) {
                setError('Failed to fetch orders'); // Set error if fetch fails
                setLoading(false); // Set loading to false if an error occurs
            }
        };

        fetchOrders(); // Call fetch function
    }, []); // Empty dependency array ensures it runs only once when the component mounts

    if (loading) {
        return <div className="loading">Loading...</div>; // Show loading message while fetching
    }

    if (error) {
        return <div className="error">{error}</div>; // Show error message if there's an error
    }

    return (
        <div className="orders-page">
            <h1 className="page-title">Orders</h1>
            <div className="order-count">
                <span>Total Orders: {orders.length}</span>
            </div>
            {orders.length === 0 ? (
                <p className="no-orders">No orders found.</p> // Display if no orders are present
            ) : (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User ID</th>
                            <th>Total Price</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user}</td>
                                <td>{order.totalPrice}</td>
                                <td>{new Date(order.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OrdersPage;
