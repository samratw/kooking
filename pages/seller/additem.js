import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const additem = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("seller"))) {
            router.push("/seller/login");
        }
        else {
            setEmail(JSON.parse(localStorage.getItem("seller")).email);
        }
    }, [])

    const handleChange = (e) => {
        if (e.target.name === "name") {
            setName(e.target.value);
        }
        if (e.target.name === "category") {
            setCategory(e.target.value);
        }
        if (e.target.name === "description") {
            setDesc(e.target.value);
        }
        if (e.target.name === "price") {
            setPrice(e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { email, name, category, desc, price }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/additem`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        if (response.Success) {
            toast.success('Successfully Added', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        setName('');
        setCategory('');
        setDesc('');
        setPrice('');
    }

    return (
        <div className="min-h-screen">
            <ToastContainer />
            <h2 className="font-bold text-3xl m-6 text-center text-orange-500">Add Item</h2>
            <div className="m-8 space-y-8">
                <label htmlFor="name" className="block text-lg font-medium">Name
                    <input value={name} onChange={handleChange} id="name" name="name" placeholder="Enter Item Name (Ex: Momo)" className="block w-full rounded-md bg-white p-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500" />
                </label>

                <label htmlFor="category" className="block text-lg font-medium">Category
                    <input value={category} onChange={handleChange} id="category" name="category" placeholder="Enter Category Of The Item" className="block w-full rounded-md bg-white p-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500" />
                </label>

                <label htmlFor="description" className="block text-lg font-medium">Description
                    <textarea value={desc} onChange={handleChange} id="description" name="description" rows="2" placeholder="Enter Description About The Item..." className="block w-full rounded-md bg-white p-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500" />
                </label>

                <label htmlFor="price" className="block text-lg font-medium">Price
                    <input value={price} onChange={handleChange} id="price" name="price" placeholder="Enter Price Of The Item" className="block w-full rounded-md bg-white p-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500" />
                </label>

                <br />
                <button onClick={handleSubmit} type="submit" disabled={!(name && category && desc && price)} className="flex text-white text-lg font-bold bg-black m-6 p-2 disabled:bg-gray-300 rounded">
                    Add Item
                </button>
            </div>
        </div>
    );
};

export default additem;