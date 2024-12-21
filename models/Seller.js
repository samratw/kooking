const mongoose = require('mongoose');
const SellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    image: { type: String, required: true },
    likes: { type: Number, required: true },
    password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Seller || mongoose.model("Seller", SellerSchema);