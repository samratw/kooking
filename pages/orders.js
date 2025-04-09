import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/orders`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify({ token: JSON.parse(localStorage.getItem('user')).token }),
        })
      let res = await a.json()
      setOrders(res.orders)
    }
    if (!localStorage.getItem("user")) {
      router.push("/");
    }
    else {
      fetchOrders();
    }
  }, [])

  return (
    <div className="container min-h-screen mx-auto">
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <h2 className="font-semibold text-3xl m-6 text-center text-orange-500">My Orders</h2>
              <table className="min-w-full text-left border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3">Order ID</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Total</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr key={order._id} className="border-b border-gray-300">
                        <td className="px-6 py-4">#{order._id}</td>
                        <td className="px-6 py-4">{moment(order.createdAt).format('DD/MM/YYYY')}</td>
                        <td className="px-6 py-4">Rs. {order.total}</td>
                        <td className="px-6 py-4">{order.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-6 py-4 text-center">No orders found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;