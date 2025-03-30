import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyAccount = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [npassword, setNpassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [showpassword, setShowpassword] = useState(false);
    const [user, setUser] = useState();
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            router.push("/");
        }
        if (user && user.token) {
            setUser(user);
            setEmail(user.email);
            fetchData(user.token);
        }
    }, [])

    const fetchData = async (token) => {
        let data = { token: token }
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myaccount`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(data),
            })
        let res = await a.json();
        setName(res.name);
        setPhone(res.phone);
    }

    const handleChange = (e) => {
        if (e.target.name === "name") {
            setName(e.target.value);
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
        if (e.target.name === "npassword") {
            setNpassword(e.target.value);
        }
        if (e.target.name === "cpassword") {
            setCpassword(e.target.value);
        }
    };

    const handleUserSubmit = async () => {
        let data = { token: user.token, name, phone, password, npassword, cpassword, email }
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/userupdate`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(data),
            })
        let res = await a.json();

        setPassword('');
        setNpassword('');
        setCpassword('');

        if (res.success) {
            toast.success(res.success, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            toast.error('Error Updating', {
                position: "top-right",
                autoClose: 2000,
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
        <div>
            <ToastContainer />
            <div className="min-h-screen bg-white m-8">
                <h2 className="font-semibold mb-10 text-3xl text-center text-orange-500">My Account</h2>
                <div>
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-7 sm:col-span-3">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input onChange={handleChange} value={name} name="name" type="name" id="name" className="w-full text-lg border border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 rounded-lg p-3 shadow-sm focus:outline-none transition duration-150 ease-in-out" />
                        </div>
                        <div className="col-span-7 sm:col-span-3">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input onChange={handleChange} value={email} name="email" type="email" id="email" className="w-full text-lg border border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 rounded-lg p-3 shadow-sm focus:outline-none transition duration-150 ease-in-out" />
                        </div>
                        <div className="col-span-7 sm:col-span-3">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Phone No.</label>
                            <input onChange={handleChange} value={phone} name="phone" type="phone" id="phone" className="w-full text-lg border border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 rounded-lg p-3 shadow-sm focus:outline-none transition duration-150 ease-in-out" />
                        </div>
                        {!showpassword && (
                            <div className="col-span-7 sm:col-span-3">
                                <label htmlFor="password" className="flex text-sm font-medium text-gray-700">Password</label>
                                <button onClick={() => { setShowpassword(true) }} className="bg-orange-600 font-semibold text-white border p-2 rounded">Change Password</button>
                            </div>
                        )}
                        {showpassword && (
                            <div className="col-span-6 sm:col-span-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Current Password</label>
                                <div className="flex items-center text-lg">
                                    <input onChange={handleChange} value={password} name="password" type={visible ? "text" : "password"} id="password" className="w-full text-lg border border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 rounded-lg p-3 shadow-sm focus:outline-none transition duration-150 ease-in-out" />
                                    {visible ? <FaEye className="-ml-8 cursor-pointer" onClick={() => setVisible(!visible)} /> : <FaEyeSlash className="-ml-8 cursor-pointer" onClick={() => setVisible(!visible)} />}
                                </div>
                            </div>)}
                        {showpassword && (
                            <div className="col-span-6 sm:col-span-2">
                                <label htmlFor="npassword" className="block text-sm font-medium text-gray-700">New Password</label>
                                <div className="flex items-center text-lg">
                                    <input onChange={handleChange} value={npassword} name="npassword" type={visible ? "text" : "password"} id="npassword" className="w-full text-lg border border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 rounded-lg p-3 shadow-sm focus:outline-none transition duration-150 ease-in-out" />
                                    {visible ? <FaEye className="-ml-8 cursor-pointer" onClick={() => setVisible(!visible)} /> : <FaEyeSlash className="-ml-8 cursor-pointer" onClick={() => setVisible(!visible)} />}
                                </div>
                            </div>)}
                        {showpassword && (
                            <div className="col-span-6 sm:col-span-2">
                                <label htmlFor="cpassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                                <div className="flex items-center text-lg">
                                    <input onChange={handleChange} value={cpassword} name="cpassword" type={visible ? "text" : "password"} id="cpassword" className="w-full text-lg border border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 rounded-lg p-3 shadow-sm focus:outline-none transition duration-150 ease-in-out" />
                                    {visible ? <FaEye className="-ml-8 cursor-pointer" onClick={() => setVisible(!visible)} /> : <FaEyeSlash className="-ml-8 cursor-pointer" onClick={() => setVisible(!visible)} />}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <button onClick={handleUserSubmit} className="flex text-white text-lg font-bold bg-orange-500 m-6 p-2 disabled:bg-gray-300 rounded">Save</button>
            </div>
        </div>
    )
}

export default MyAccount;