import React, { useState } from 'react';
import mongoose from "mongoose";
import Item from "../../models/Item";
import Seller from "../../models/Seller";
import { MdLocationOn } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";

const Restaurant = ({ restaurant, items }) => {
    const [likes, setLikes] = useState(restaurant.likes);
    const [liked, setLiked] = useState(false); // Track if liked

    // Group items by category
    const groupedItems = items.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    // Initialize state for quantities
    const [quantities, setQuantities] = useState(
        items.reduce((acc, item) => {
            acc[item._id] = 0;
            return acc;
        }, {})
    );

    // Handle quantity changes
    const handleQuantityChange = (id, delta) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(prev[id] + delta, 0), // Prevent negative quantities
        }));
    };

    // Handle like button toggle
    const handleLikeToggle = () => {
        setLiked((prevLiked) => !prevLiked);
        setLikes((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
    };

    return (
        <div>
            <div className="bg-gray-50 p-3 gap-2 flex m-6 font-bold text-2xl text-center">
                <img src={restaurant.image} className="w-40 h-40" />
                <div>
                    <div>{restaurant.name}</div>
                    <div className="my-2 flex">
                        <MdLocationOn className="m-1 text-orange-500" />
                        {restaurant.address}
                    </div>
                    <div className="m-3 flex">
                        <FaHeart
                            className={`m-1 cursor-pointer ${liked ? 'text-red-600' : 'text-gray-500'}`}
                            onClick={handleLikeToggle}
                        />
                        {likes}
                    </div>
                </div>
            </div>
            <div className="m-4 relative overflow-x-auto">
                {Object.entries(groupedItems).map(([category, items]) => (
                    <div key={category} className="mb-4">
                        <h3 className="bg-gray-50 p-4 text-center text-xl font-bold text-orange-500">{category}</h3>
                        <table className="w-full text-left rtl:text-right">
                            <thead className="uppercase border-b border-gray-700">
                                <tr>
                                    <th scope="col" className="p-3">Name</th>
                                    <th scope="col" className="p-3">Price</th>
                                    <th scope="col" className="p-3">Qty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item._id} className="bg-white border-b border-gray-700 text-lg">
                                        <td className="p-3 font-medium whitespace-nowrap">{item.name}
                                            <div className="text-sm text-gray-500">{item.desc}</div>
                                        </td>
                                        <td className="p-3">
                                            Rs.{item.price * Math.max(quantities[item._id], 1)}
                                        </td>
                                        <td className="p-3 flex items-center space-x-4 font-bold">
                                            <button
                                                className="px-2 py-1 bg-orange-500 text-white rounded"
                                                onClick={() => handleQuantityChange(item._id, -1)}
                                            >
                                                -
                                            </button>
                                            <span>{quantities[item._id]}</span>
                                            <button
                                                className="px-2 py-1 bg-orange-500 text-white rounded"
                                                onClick={() => handleQuantityChange(item._id, 1)}
                                            >
                                                +
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    }
    let restaurant = await Seller.findOne({ _id: context.query.id });
    let items = await Item.find({ email: { $in: restaurant.email } });
    return {
        props: { restaurant: JSON.parse(JSON.stringify(restaurant)), items: JSON.parse(JSON.stringify(items)) },
    };
}

export default Restaurant;