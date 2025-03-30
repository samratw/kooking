import Item from "../../models/Item";
import connectDb from "../../middleware/mongoose";
import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const token = req.body.token;
        const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        let items = await Item.find({ email: data.email })
        res.status(200).json({ items })
    }
    else {
        res.status(400).json({ error: "This method is NOT ALLOWED" })
    }
}

export default connectDb(handler);