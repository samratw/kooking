import User from "../../models/User";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, phone, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({ error: "Already in use." });
    }
    else {
      let u = new User({ name, email, phone, password })
      await u.save();

      return res.status(200).json({ success: "Successful." });
    }
  }
  else {
    res.status(400).json({ error: "This method is NOT ALLOWED" })
  }
}

export default connectDb(handler);