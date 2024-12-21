// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "User Not Found." });
      }

      if (password !== user.password) {
        return res.status(401).json({ error: "Invalid Password." });
      }

      const token = jwt.sign({ user_id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: "4d" });
      res.status(200).json({ success: true, token, email: user.email, name: user.name });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong." });
    }
  }
  else {
    return res.status(400).json({ error: "This method is NOT ALLOWED" })
  }
}

export default connectDb(handler);