// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Item from "../../models/Item";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { id, name, category, desc, price } = req.body;
    await Item.findByIdAndUpdate({ _id: id }, { name, category, desc, price });
    res.status(200).json({ success: true })
  }
  else {
    res.status(400).json({ error: "This method is NOT ALLOWED" })
  }
}
export default connectDb(handler);