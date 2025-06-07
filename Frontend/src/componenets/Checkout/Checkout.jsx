import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';



export default function Checkout() {

  const location = useLocation();
  const orderData = location.state?.data;
  console.log(orderData.selectedSize)
  
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user: form,
      order: {
        title:orderData.title ,
        selectedVariant:orderData.selectedVariant ,
        selectedSize:orderData.selectedSize ,
        quantity:orderData.quantity ,
        price: orderData.price,
        date: new Date(),
      },
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user`, payload);

      if (res.status === 200 && res.data.success) {
        window.location.href = `/thank-you?orderId=${res.data.orderId}`;
      } else {
        alert(res.data.message || "Transaction failed.");
      }
    } catch (err) {
      console.error("Error submitting order:", err);
      alert("Something went wrong while submitting the order. Enter 16 digit card number 3 digit cvv 10 digit phone number .");
    }
  };

  const subtotal = orderData.price * orderData.quantity;
  const total = subtotal;

  if (!orderData) {
    return <p>No order data found. Please go back and select a product.</p>;
  }
  return (

    
    <div className="py-16 bg-white">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="md:flex md:gap-6">
          <div className="md:w-2/3 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Billing Details</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} className="w-full border rounded p-2" required />
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border rounded p-2" required />
              <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} className="w-full border rounded p-2" required />
              <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} className="w-full border rounded p-2" required />

              <div className="flex gap-4">
                <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} className="w-1/2 border rounded p-2" required />
                <input type="text" name="state" placeholder="State" value={form.state} onChange={handleChange} className="w-1/4 border rounded p-2" required />
                <input type="text" name="zipCode" placeholder="Zip Code" value={form.zipCode} onChange={handleChange} className="w-1/4 border rounded p-2" required />
              </div>

              <h3 className="text-xl font-semibold mt-6">Payment Info</h3>
              <input type="text" name="cardNumber" placeholder="Card Number" value={form.cardNumber} onChange={handleChange} className="w-full border rounded p-2" required maxLength={16} />
              <div className="flex gap-4">
                <input type="month" name="expiryDate" placeholder="Expiry Date" value={form.expiryDate} onChange={handleChange} className="w-1/2 border rounded p-2" required />
                <input type="text" name="cvv" placeholder="CVV" value={form.cvv} onChange={handleChange} className="w-1/2 border rounded p-2" maxLength={3} required />
              </div>

              <button type="submit"  className="w-full bg-black text-white py-3 rounded hover:bg-gray-800">Place Order</button>
            </form>
          </div>

          <div className="md:w-1/3 mt-10 md:mt-0 bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Product:</span>
                <span>{orderData.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Variant:</span>
                <span>{orderData.selectedVariant}</span>
              </div>
              <div className="flex justify-between">
                <span>Size:</span>
                <span>{orderData.selectedSize}</span>
              </div>
              <div className="flex justify-between">
                <span>Quantity:</span>
                <span>{orderData.quantity}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Subtotal:</span>
                <span>Rs.{subtotal}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>Rs.{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
