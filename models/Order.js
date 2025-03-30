const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    items: [{ name: { type: String, required: true }, price: { type: Number, required: true }, quantity: { type: Number, required: true } }],
    seller_email: { type: String, required: true },
    user_email: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    total: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, default: 'Pending' }
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);