import Order from "../../models/Order";
import connectDb from "../../middleware/mongoose";
import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const status = req.body.status;
        if (status) {
            await Order.findByIdAndUpdate({ _id: req.body.id }, { status: status })
            res.status(200).json({ success: "Status Updated" })
        }
        else {
            const token = req.body.token;
            const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);
            let orders = await Order.find({ seller_email: data.email })
            res.status(200).json({ orders })
        }
    }
    else {
        res.status(400).json({ error: "This method is NOT ALLOWED" })
    }
}

export default connectDb(handler);