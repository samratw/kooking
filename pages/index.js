import React, { useState } from "react";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoSearchSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import Seller from "../models/Seller";
import mongoose from "mongoose";

export default function Home({ restaurants }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const TopFoods = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Pizza"
    },
    {
      id: 2,
      image: "https://images.pexels.com/photos/3926123/pexels-photo-3926123.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Momo"
    },
    {
      id: 3,
      image: "https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Burger"
    },
    {
      id: 4,
      image: "https://images.pexels.com/photos/8887052/pexels-photo-8887052.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Sweets"
    },
    {
      id: 5,
      image: "https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Noodles"
    },
    {
      id: 6,
      image: "https://images.pexels.com/photos/17696653/pexels-photo-17696653/free-photo-of-chicken-wings-in-rice-with-saffron.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Biryani"
    },
    {
      id: 7,
      image: "https://images.pexels.com/photos/824653/pexels-photo-824653.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Sandwich"
    },
    {
      id: 8,
      image: "https://images.pexels.com/photos/1586942/pexels-photo-1586942.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Fries"
    },
    {
      id: 9,
      image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Pasta"
    }
  ];

  return (
    <div>
      <section className="relative flex flex-col bg-green-600 p-3 justify-center items-center rounded-t">
        <p className="text-orange-500 text-2xl lg:text-6xl font-bold py-4">KooKing</p>
        <p className="text-white text-x1 lg:text-4xl font-semibold">Bringing Flavor To Your Door</p>
      </section>

      <section className="p-2 border-b-2 border-orange-500 rounded-b">
        <p className="text-2xl text-center font-bold py-4">Top Food's</p>
        <ul>
          <Swiper
            pagination={{ type: "bullets", clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            modules={[Autoplay, Pagination]}
          >
            {TopFoods.map((index) => (
              <SwiperSlide key={index.id}>
                <div className="mb-8 flex flex-col justify-center items-center">
                  <img
                    src={index.image}
                    className="w-[20rem] h-[20rem] rounded-xl object-cover object-center"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </ul>
      </section>

      <section>
        <div className="container my-28 mx-auto">
          <div className="flex flex-col text-center text-2xl font-bold title-font text-gray-900">RESTAURANT'S</div>
          <div className="flex m-6 items-center lg:text-lg w-1/2">
            <IoSearchSharp className="z-10 -mr-8 text-2xl cursor-pointer" />
            <input
              type="search"
              id="search"
              placeholder="Find Restaurant's..."
              className="block md:block w-full border border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-400 rounded-lg p-3 pl-8 shadow-sm text-gray-700 focus:outline-none transition duration-150 ease-in-out"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap">
            {filteredRestaurants.map((index) => (
              <Link passHref={true} key={index._id} href={`/restaurant/${index.name}?id=${index._id}`} legacyBehavior>
                <div className="p-4 lg:w-1/4 md:w-1/2 cursor-pointer">
                  <div className="flex flex-col p-2 items-center text-center border border-gray-500 rounded">
                    <img
                      alt="restaurant"
                      className="flex-shrink-0 rounded w-full h-52 object-cover object-center border-b border-black"
                      src={index.image}
                    />
                    <h2 className="m-2 title-font font-semibold text-lg text-gray-900">
                      {index.name} - {index.address}
                    </h2>
                    <h3 className="flex text-gray-500 mb-3">
                      <FaHeart className="m-1 text-red-600" />
                      {index.likes}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let restaurants = await Seller.find();
  return {
    props: { restaurants: JSON.parse(JSON.stringify(restaurants)) },
  };
}