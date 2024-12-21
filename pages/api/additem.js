// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Item from "../../models/Item";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, name, category, desc, price } = req.body;
    let i = new Item({ email, name, category, desc, price })
    await i.save();
    res.status(200).json({ Success: "Success" })
  }
  else {
    res.status(400).json({ error: "This method is NOT ALLOWED" })
  }
}
export default connectDb(handler);