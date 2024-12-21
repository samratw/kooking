import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const signup = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("seller")) {
            router.push("/seller");
        }
    }, [router]);

    const handleChange = (e) => {
        if (e.target.name === "name") {
            setName(e.target.value);
        }
        if (e.target.name === "address") {
            setAddress(e.target.value);
        }
        if (e.target.name === "email") {
            setEmail(e.target.value);
        }
        if (e.target.name === "phone") {
            setPhone(e.target.value);
        }
        if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { name, address, email, phone, password };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/sellersignup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                // Handle non-200 responses
                const errorData = await res.json();
                throw new Error(errorData.error || "Something went wrong.");
            }

            const response = await res.json();
            setName("");
            setEmail("");
            setPhone("");
            setPassword("");

            toast.success(response.success, {
                position: "top-right",
                autoClose: 15000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.log(error.message);
            toast.error(error.message, {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-14">
            <ToastContainer style={{ width: '700px' }} />
            <p className="m-4 text-center text-lg text-gray-500">
                Already Have An Seller's Account?
                <Link href={"/seller/login"} className="mx-1 font-semibold text-orange-500 hover:text-orange-400">Login</Link>
            </p>

            <div className="text-center text-2xl font-bold">
                Signup For Your Seller's Account
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label for="email" className="block font-medium text-gray-900">Restaurant's Name</label>
                        <div className="mt-2">
                            <input value={name} onChange={handleChange} type="name" name="name" id="name" autoComplete="name" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <label for="email" className="block font-medium text-gray-900">Restaurant's Address</label>
                        <div className="mt-2">
                            <input value={address} onChange={handleChange} type="address" name="address" id="address" autoComplete="address" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <label for="email" className="block font-medium text-gray-900">Email</label>
                        <div className="mt-2">
                            <input value={email} onChange={handleChange} type="email" name="email" id="email" autoComplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <label for="email" className="block font-medium text-gray-900">Phone No.</label>
                        <div className="mt-2">
                            <input value={phone} onChange={handleChange} type="phone" name="phone" id="phone" autoComplete="phone" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <label for="password" className="block font-medium text-gray-900">Password</label>
                        <div className="mt-2">
                            <input value={password} onChange={handleChange} type="password" name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" disabled={!(name && email && phone && password)} className="flex w-full justify-center rounded-md disabled:bg-orange-200 bg-orange-500 px-3 py-1.5 font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default signup;