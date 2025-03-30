// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        let { token } = req.body;
        let user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        let dbuser = await User.findOne({ email: user.email });
        const { email, name, phone, _id } = dbuser;
        res.status(200).json({ email, name, phone, _id })
    }
    else {
        res.status(400).json({ error: "This method is NOT ALLOWED" })
    }
}

export default connectDb(handler);