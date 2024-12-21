import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem("seller")) {
          router.push("/seller/login");
        }
      }, [router]);

    const Orders = [
        {
            id: 1,
            title: "Pizza",
            qty: 1,
            price: 100
        },
        {
            id: 2,
            title: "Momo",
            qty: 2,
            price: 200
        },
        {
            id: 3,
            title: "Burger",
            qty: 3,
            price: 300
        },
        {
            id: 4,
            title: "Sweets",
            qty: 4,
            price: 400
        },
        {
            id: 5,
            title: "Noodles",
            qty: 5,
            price: 500
        },
        {
            id: 6,
            title: "Biryani",
            qty: 6,
            price: 600
        },
        {
            id: 7,
            title: "Sandwich",
            qty: 7,
            price: 700
        },
        {
            id: 8,
            title: "Fries",
            qty: 8,
            price: 800
        },
        {
            id: 9,
            title: "Pasta",
            qty: 9,
            price: 900
        }
    ];

    return (
        <div>
            <div className="relative overflow-x-auto">
            <h2 className="my-8 font-semibold text-3xl text-center text-orange-500">My Orders</h2>
                <table className="w-full text-left rtl:text-right">
                    <thead className="uppercase border-b border-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Qty
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {Orders.map((index) => (
                        <tr key={index.id} className="bg-white border-b border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                {index.title}
                            </th>
                            <td className="px-6 py-4">
                                {index.qty}
                            </td>
                            <td className="px-6 py-4">
                                ${index.price}
                            </td>
                            <td className="px-6 py-4">
                                Pending
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}