import React, { useEffect, useState } from 'react';
import mongoose from 'mongoose';
import Order from '../../models/Order';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderDetails = ({ order }) => {
  const [status, setStatus] = useState(order?.status || "Pending");

  const updateStatus = async (newStatus) => {
    try {
      const response = await fetch(`/api/sellerorders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: order._id, status: newStatus }),
      });
      const result = await response.json();
      if (result.success) {
        setStatus(newStatus);
         toast.success(result.success, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (!order) {
    return <div className="text-center text-xl">Loading order details...</div>;
  }

  return (
    <div className="container mx-auto min-h-screen p-6">
        <ToastContainer />
      <h2 className="text-3xl font-semibold text-center text-orange-500">Order Details</h2>
      <div className="bg-white p-6 shadow-md rounded-lg mt-6">
        <p className="text-lg"><strong>Order ID:</strong> #{order._id}</p>
        <p className="text-lg"><strong>User Email:</strong> {order.user_email}</p>
        <p className="text-lg"><strong>Phone:</strong> {order.phone}</p>
        <p className="text-lg"><strong>Address:</strong> {order.address}</p>
        <p className="text-lg"><strong>Total:</strong> Rs. {order.total}</p>
        <p className="text-lg"><strong>Payment Method:</strong> {order.paymentMethod}</p>
        <p className="text-lg"><strong>Status:</strong> {status}</p>
        <div className="mt-4 border-b border-orange-500 pb-2">
          <button 
            className="px-4 py-2 bg-orange-500 text-white rounded mr-2"
            onClick={() => updateStatus('On Way')}
          >On Way</button>
          <button 
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => updateStatus('Delivered')}
          >Delivered</button>
        </div>
        <h3 className="text-2xl font-semibold mt-6">Items</h3>
        <ul className="mt-4">
          {order.items.map((item, index) => (
            <li key={index} className="border-b py-2">
              <strong>{item.name}</strong> - Rs. {item.price} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    let order = await Order.findById(context.query.id);
    return {
      props: { order: JSON.parse(JSON.stringify(order)) },
    };
}

export default OrderDetails;