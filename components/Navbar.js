import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaChevronDown } from "react-icons/fa";

const Navbar = ({ logout, logOut }) => {
    const [name, setName] = useState('');
    const [dropdown, setDropdown] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (window.location.href.includes(`${process.env.NEXT_PUBLIC_HOST}/seller`)) {
            setIsSeller(true);
            const myuser = JSON.parse(localStorage.getItem("seller"));
            if (myuser) {
                setName(myuser.name);
            }
        }
        else {
            setIsSeller(false);
            const myuser = JSON.parse(localStorage.getItem("user"));
            if (myuser) {
                setName(myuser.name);
            }
        }
    }, [router]);

    if (!isSeller) {
        return (
            <div className="flex flex-col shadow-2xl bg-white sticky top-0 z-20">
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
                    <div className="logo flex mx-6 w-full items-center cursor-pointer">
                        <Link href={"/"} className="text-orange-500 text-2xl font-bold">KooKing</Link>
                    </div>
                    <div className="flex items-center absolute lg:gap-4 right-14 text-2xl cursor-pointer">
                        <div>
                            {dropdown && (
                                <div className="fixed w-40 z-20 p-2 bg-white font-semibold text-lg top-14 right-3 border border-gray-300 rounded">
                                    <ul>
                                        <Link href={"/myaccount"}><li className="p-2 hover:bg-orange-100 rounded">My Account</li></Link>
                                        <Link href={"/orders"}><li className="p-2 hover:bg-orange-100 rounded">My Orders</li></Link>
                                        <li onClick={logout} className="p-2 hover:bg-orange-100 rounded">Log Out</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        {!localStorage.getItem("user") ? <Link href={"/login"} className="border-2 border-orange-400 text-orange-500 hover:bg-orange-50 p-1 text-sm font-semibold rounded">Login</Link> : <div onClick={() => setDropdown(!dropdown)} className="flex text-orange-500 hover:bg-gray-50 p-1 text-lg font-semibold rounded"><p className="mr-1 text-black">Hey!</p>{name.split(" ")[0]}<FaChevronDown className="my-2 ml-1 text-black" /></div>}
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="flex flex-col shadow-2xl bg-white sticky top-0 z-20">
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
                    <div className="logo flex w-full items-center lg:gap-10 gap-4 cursor-pointer">
                        <Link href={"/seller"} className="text-orange-500 text-2xl font-bold">KooKing Seller</Link>
                        {localStorage.getItem("seller") && (
                            <div className="flex items-center lg:text-lg font-bold md:w-1/2 w-full">
                                <Link href={"/seller/additem"} className="p-2 hover:bg-orange-50 rounded">Add Item</Link>
                                <Link href={"/seller/updateitem"} className="p-2 hover:bg-orange-50 rounded">Update Item</Link>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center absolute lg:gap-4 right-14">
                        {!localStorage.getItem("seller") ? <Link href={"/seller/login"} className="border-2 border-orange-400 text-orange-500 hover:bg-orange-50 p-1 text-sm font-semibold rounded">Login</Link> : <div className="flex text-orange-500 text-lg font-semibold rounded"><p className="mr-1 text-black">Welcome!</p>{name} <div onClick={logOut} className="mx-4 border-2 border-orange-400 text-orange-500 hover:bg-orange-50 p-1 text-sm font-semibold rounded cursor-pointer">Logout</div></div>}
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar