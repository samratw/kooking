import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer>
            <div>
                <div className="p-6 my-20 flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col border-t border-orange-500">
                    <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                        <div className="logo flex mx-6 w-full items-center cursor-pointer">
                            <Link href={"/"} className="text-orange-500 text-2xl font-bold">KooKing</Link>
                        </div>
                        <p className="mt-2 text-gray-600">Bring Flavor To Your Door.</p>
                    </div>
                    <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-bold text-black tracking-widest text-lg mb-3">We're KooKing</h2>
                            <nav className="list-none mb-10 font-semibold text-gray-800">
                                <li>
                                    <Link href={"/about-us"} className="hover:text-orange-400">About Us</Link>
                                </li>
                                <li>
                                    <Link href={"/available-areas"} className="hover:text-orange-400">Available Areas</Link>
                                </li>
                                <li>
                                    <Link href={"/Delivery-charges"} className="hover:text-orange-400">Delivery Charges</Link>
                                </li>
                                <li>
                                    <Link href={"/blog"} className="hover:text-orange-400">Blog</Link>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-bold text-black tracking-widest text-lg mb-3">Get Help</h2>
                            <nav className="list-none mb-10 font-semibold text-gray-600">
                                <li>
                                    <Link href={"/Video&Animation"} className="hover:text-orange-400">How to Order?</Link>
                                </li>
                                <li>
                                    <Link href={"/faqs"} className="hover:text-orange-400">FAQs</Link>
                                </li>
                                <li>
                                    <Link href={"/contact-us"} className="hover:text-orange-400">Contact Us</Link>
                                </li>
                                <li>
                                    <Link href={"/privacy-policy"} className="hover:text-orange-400">Privacy Policy</Link>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/3 md:w-1/2 w-full px-4">
                            <h2 className="title-font font-bold text-black tracking-widest text-lg mb-3">Call us</h2>
                            <nav className="list-none mb-10 font-semibold text-gray-600">
                                <li>
                                    <div className="hover:text-orange-400">Kathmandu: 9898989809, 9898989809</div>
                                    <div className="hover:text-orange-400">Pokhara: 9802772843, 9802772843</div>
                                    <div className="hover:text-orange-400">Chitwan: 6757575759, 6757575759</div>
                                </li>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="bg-orange-500">
                    <div className="container mx-auto p-4 flex flex-wrap flex-col sm:flex-row">
                        <p className="text-white text-lg sm:text-left">© 2025 KooKing
                            <span className="inline-flex ml-4 sm:justify-start">
                                <a className="text-white">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                    </svg>
                                </a>
                                <a className="ml-3 text-white">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                    </svg>
                                </a>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;