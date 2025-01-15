import Seller from "../../models/Seller";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { name, address, email, phone, password, image } = req.body;
    const user = await Seller.findOne({ email });
    if (user) {
      return res.status(401).json({ error: "Already in use." });
    }
    else {
      let u = new Seller({ name, address, email, phone, password, image, likes: 0 });
      await u.save();

      return res.status(200).json({ success: "Successful." });
    }
  }
  else {
    res.status(400).json({ error: "This method is NOT ALLOWED" })
  }
}

export default connectDb(handler);