import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ThankYou = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("orderId");
        setOrderId(id);
        console.log(id);

        if (id) {
           axios.get(`${import.meta.env.VITE_API_BASE_URL}/thank-you/${id}`)
                .then((res) => {
                    setOrder(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching order:", err);
                    setLoading(false);
                });
        }
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!order) return <p>Order not found.</p>;

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded">
            <h1 className="text-2xl font-bold text-green-600 mb-4">Thank you for your order! Here is your order status</h1>
            <p><strong>Order Number:</strong> {order._id}</p>

            <h2 className="text-xl font-semibold mt-6">Order Summary</h2>
            <ul className="mt-2">
                <li><strong>Product:</strong> {order.order.title}</li>
                <li><strong>Variant:</strong> {order.order.selectedVariant}</li>
                <li><strong>Size:</strong> {order.order.selectedSize}</li>
                <li><strong>Quantity:</strong> {order.order.quantity}</li>
                <li><strong>Price:</strong> ₹{order.order.price}</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6">Customer Details</h2>
            <ul className="mt-2">
                <li><strong>Name:</strong> {order.user.fullName}</li>
                <li><strong>Email:</strong> {order.user.email}</li>
                <li><strong>Phone:</strong> {order.user.phone}</li>
                <li><strong>Address:</strong> {order.user.address}, {order.user.city}, {order.user.state}, {order.user.zip}</li>
            </ul>

            <p className="mt-6 text-lg font-semibold text-blue-700">
                {order.status === 'approved' && "Your order has been APPROVED."}
                {order.status === 'declined' && "Sorry, your order was DECLINED."}
                {order.status === 'error' && "There was an ERROR with your order."}
            </p>
        </div>
    );
};

export default ThankYou;
