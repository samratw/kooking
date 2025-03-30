import connectDb from '../../middleware/mongoose';
import Order from '../../models/Order';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { cart, user_email, phone, address, paymentMethod } = req.body;
       // const orderId = Math.floor(Math.random() * Date.now());
        const order = new Order({
            items: cart,
            seller_email: cart[0].email,
            user_email,
            phone,
            address,
            total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
            paymentMethod,
            status: 'Pending',
        })
        await order.save();
        return res.status(200).json({ success: true });
    }
    else {
        return res.status(400).json({ error: "This method is NOT ALLOWED" });
    }
};

export default connectDb(handler);