import React from 'react';
import Link from 'next/link';

const success = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-4">
        </div>
        <h1 className="text-2xl font-bold text-green-700 mb-2">Success!</h1>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully.
        </p>
        <Link href="/" className="mx-2 inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition">
            Go to Home
        </Link>
        <Link href="/orders" className="mx-2 inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition">
            Go to My Orders
        </Link>
      </div>
    </div>
  )
}

export default success;