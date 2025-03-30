import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const UpdateItem = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [updatedData, setUpdatedData] = useState({ name: '', category: '', desc: '', price: '' });
  const router = useRouter();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const seller = localStorage.getItem('seller');
        if (!seller) {
          router.push('/seller/login');
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/item`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: JSON.parse(seller).token }),
        });

        const result = await response.json();
        setItems(result.items);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [router]);

  const handleEdit = (item) => {
    setEditingItem(item._id);
    setUpdatedData({ name: item.name, category: item.category, desc: item.desc, price: item.price });
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`/api/updateitem`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updatedData }),
      });

      const result = await response.json();
      if (result.success) {
        setItems(items.map(item => (item._id === id ? { ...item, ...updatedData } : item)));
        setEditingItem(null);
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div className="container mx-auto min-h-screen p-6">
      <h2 className="text-3xl font-semibold text-center text-orange-500">Update Items</h2>
      <div className="bg-white p-6 shadow-md rounded-lg mt-6">
        <table className="min-w-full text-left border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item._id} className="border-b border-gray-300">
                  {editingItem === item._id ? (
                    <>
                      <td className="px-6 py-4"><input type="text" value={updatedData.name} onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })} /></td>
                        <td className="px-6 py-4"><input type="text" value={updatedData.category} onChange={(e) => setUpdatedData({ ...updatedData, category: e.target.value })} /></td>
                        <td className="px-6 py-4"><input type="text" value={updatedData.desc} onChange={(e) => setUpdatedData({ ...updatedData, desc: e.target.value })} /></td>
                      <td className="px-6 py-4"><input type="number" value={updatedData.price} onChange={(e) => setUpdatedData({ ...updatedData, price: e.target.value })} /></td>
                      <td className="px-6 py-4">
                        <button className="px-4 py-2 bg-green-500 text-white rounded mr-2" onClick={() => handleUpdate(item._id)}>Save</button>
                        <button className="px-4 py-2 bg-orange-500 text-white rounded" onClick={() => setEditingItem(null)}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.category}</td>
                      <td className="px-6 py-4">{item.desc}</td>
                        <td className="px-6 py-4">Rs. {item.price}</td>
                      <td className="px-6 py-4">
                        <button className="px-4 py-2 bg-orange-500 text-white rounded" onClick={() => handleEdit(item)}>Edit</button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center">No items found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpdateItem;