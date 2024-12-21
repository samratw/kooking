const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.models.Item || mongoose.model("Item", ItemSchema);