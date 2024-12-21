import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("seller")) {
            router.push("/seller");
        }
    }, [router]);

    const handleChange = async (e) => {
        if (e.target.name == "email") {
            setEmail(e.target.value)
        }
        if (e.target.name == "password") {
            setPassword(e.target.value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { email, password }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/sellerlogin`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json();
        setEmail('');
        setPassword('');
        if (response.success) {
            toast.success('Successfully Logged In.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            localStorage.setItem("seller", JSON.stringify({ token: response.token, email: response.email, name: response.name }));
            router.push("/seller");
        }
        else {
            toast.error(response.error, {
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
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-14">
            <ToastContainer style={{ width: '700px' }} />
            <p className="m-4 text-center text-lg text-gray-500">
                Don't Have An Seller's Account?
                <Link href={"/seller/signup"} className="mx-1 font-semibold text-orange-500 hover:text-orange-400">Signup</Link>
            </p>

            <div className="text-center text-2xl font-bold">
                Login To Your Seller's Account
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label for="email" className="block font-medium text-gray-900">Email</label>
                        <div className="mt-2">
                            <input value={email} onChange={handleChange} type="email" name="email" id="email" autoComplete="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label for="password" className="block font-medium text-gray-900">Password</label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-orange-500 hover:text-orange-400">Forgot password?</a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input value={password} onChange={handleChange} type="password" name="password" id="password" autoComplete="current-password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-500 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" disabled={!(email && password)} className="flex w-full justify-center rounded-md disabled:bg-orange-200 bg-orange-500 px-3 py-1.5 font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">Sign in</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default login;