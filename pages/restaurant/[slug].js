import React, { useState } from 'react';
import mongoose from 'mongoose';
import Item from '../../models/Item';
import Seller from '../../models/Seller';
import { MdLocationOn } from 'react-icons/md';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Restaurant = ({ restaurant, items }) => {
    const [likes, setLikes] = useState(restaurant.likes);
    const [liked, setLiked] = useState(false);
    const [cart, setCart] = useState({});
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [cartOpen, setCartOpen] = useState(false);
    const router = useRouter();

    const groupedItems = items.reduce((acc, item) => {
        acc[item.category] = acc[item.category] || [];
        acc[item.category].push(item);
        return acc;
    }, {});

    const [quantities, setQuantities] = useState(
        items.reduce((acc, item) => ({ ...acc, [item._id]: 0 }), {})
    );

    const handleQuantityChange = (item, delta) => {
        setQuantities((prev) => {
            const newQty = Math.max(prev[item._id] + delta, 0);
            setCart((prevCart) => {
                const newCart = { ...prevCart };
                if (newQty > 0) newCart[item._id] = { ...item, quantity: newQty };
                else delete newCart[item._id];
                return newCart;
            });
            return { ...prev, [item._id]: newQty };
        });
    };

    const handleLikeToggle = () => {
        setLiked((prevLiked) => !prevLiked);
        setLikes((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
    };

    const handleEsewaCheckout = async () => {
        const response = await fetch('/api/esewa', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cart: Object.values(cart) }),
        });

        const res = await response.json();
        if (res.url) {
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cart: Object.values(cart), user_email: JSON.parse(localStorage.getItem("user")).email, phone, address, paymentMethod: 'eSewa' }),
            });
            await response.json();
            window.location.href = res.url;
        }
    };

    const handleCashPay = async () => {
        const response = await fetch('/api/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cart: Object.values(cart), user_email: JSON.parse(localStorage.getItem("user")).email, phone, address, paymentMethod: 'Cash' }),
        });

        const data = await response.json();
        if (data.success) {
            router.push('/success');
        } else {
            router.push('/failure');
        }
    };

    return (
        <div className="flex justify-center p-4 min-h-screen">
            <div className="w-full max-w-[80rem]">
                <div className="w-2/3 bg-gray-100 p-3 flex items-center rounded-b shadow-md sticky top-[4.4rem] z-20">
                    <Image src={restaurant.image} alt={restaurant.name} width={100} height={100} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="ml-6">
                        <h1 className="text-2xl font-bold">{restaurant.name}</h1>
                        <p className="flex items-center text-gray-700 mt-2">
                            <MdLocationOn className="text-orange-500 mr-2" /> {restaurant.address}
                        </p>
                        <div className="flex items-center mt-3">
                            <FaHeart
                                className={`cursor-pointer text-xl ${liked ? 'text-red-600' : 'text-gray-500'}`}
                                onClick={handleLikeToggle}
                            />
                            <span className="ml-2 text-lg font-semibold">{likes}</span>
                        </div>
                    </div>
                    <button
                        className="mx-auto flex items-center bg-orange-500 text-white px-5 py-2 rounded shadow-md hover:bg-orange-600 sticky top-0"
                        onClick={() => setCartOpen(true)}
                    >
                        <FaShoppingCart className="mr-2" /> View Cart ({Object.keys(cart).length})
                    </button>
                </div>

                {Object.entries(groupedItems).map(([category, items]) => (
                    <div key={category} className="mt-10">
                        <h2 className="text-2xl font-semibold text-orange-500 border-b pb-2 mb-4">{category}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {items.map((item) => (
                                <div key={item._id} className="bg-white p-4 rounded-lg shadow-md">
                                    <h3 className="text-lg font-bold">{item.name}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                                    <p className="mt-2 font-semibold">Rs. {item.price * Math.max(quantities[item._id], 1)}</p>
                                    <div className="mt-3 flex items-center">
                                        <button className="px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600" onClick={() => handleQuantityChange(item, -1)}>-</button>
                                        <span className="px-4 text-lg font-bold">{quantities[item._id]}</span>
                                        <button className="px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600" onClick={() => handleQuantityChange(item, 1)}>+</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {cartOpen && (
                    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50 p-6">
                        <div className="w-[78vw] flex p-6 bg-white rounded-lg shadow-xl">
                            <div className="w-1/2 pr-3 border-r-2">
                                <h3 className="text-xl font-bold mb-4 border-b pb-2">Your Cart</h3>
                                {Object.values(cart).length > 0 ? (
                                    <ul className="mb-4 space-y-3">
                                        {Object.values(cart).map((cartItem) => (
                                            <li key={cartItem._id} className="flex justify-between p-3 bg-gray-50 rounded-lg shadow">
                                                <span>{cartItem.name} (x{cartItem.quantity})</span>
                                                <span className="font-semibold">Rs. {cartItem.price * cartItem.quantity}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 mb-3">Your cart is empty.</p>
                                )}
                            </div>

                            <div className="w-1/2 pl-3">
                                <h3 className="text-xl font-bold mb-4 border-b pb-2">Checkout</h3>
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full p-3 border rounded-lg mb-3"
                                />
                                <input
                                    type="text"
                                    placeholder="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full p-3 border rounded-lg mb-4"
                                />
                                <div className="flex flex-col space-y-4">
                                    <button onClick={handleEsewaCheckout} disabled={!(phone && address)} className="px-6 py-3 disabled:bg-green-200 bg-green-500 text-white rounded-lg shadow-lg">Pay with eSewa</button>
                                    <button onClick={handleCashPay} disabled={!(phone && address)} className="px-6 py-3 disabled:bg-orange-200 bg-orange-500 text-white rounded-lg shadow-lg">Pay On Delivery</button>
                                    <button className="px-6 py-3 font-semibold bg-gray-300 rounded-lg shadow-lg hover:bg-gray-400" onClick={() => setCartOpen(false)}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    const restaurant = await Seller.findById(context.query.id);
    const items = await Item.find({ email: restaurant.email });
    return {
        props: {
            restaurant: JSON.parse(JSON.stringify(restaurant)),
            items: JSON.parse(JSON.stringify(items))
        }
    };
}

export default Restaurant;