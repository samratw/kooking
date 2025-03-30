import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { cart } = req.body;
    if (!cart || cart.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const transactionUUID = uuidv4();

    const esewaUrl = `https://rc.esewa.com.np/epay/main`;

    const esewaPayload = {
        amt: totalAmount,
        psc: 0, // Product Service Charge
        pdc: 0, // Product Delivery Charge
        txAmt: 0, // Tax Amount
        tAmt: totalAmount, // Total Amount
        pid: transactionUUID, // Unique Transaction ID
        scd: 'EPAYTEST', // Merchant Code
        su: `${process.env.NEXT_PUBLIC_HOST}/success`, // Success URL
        fu: `${process.env.NEXT_PUBLIC_HOST}/failure`, // Failure URL
    };

    try {
        const response = await fetch(esewaUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(esewaPayload).toString(),
        });

        if (!response.ok) {
            console.log('Failed to initiate eSewa payment');
        }

        return res.status(200).json({ url: `${esewaUrl}?${new URLSearchParams(esewaPayload).toString()}` });
    } catch (error) {
        return res.status(500).json({ message: 'Error processing payment', error: error.message });
    }
}