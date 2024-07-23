const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
    key_id: 'rzp_test_bDI9G3zKYaOmJC',
    key_secret: 'pT63MyomcQVuCDsnv7NvXHQc'
});

app.post('/createOrder', (req, res) => {
    const amount = req.body.amount;
    const options = {
        amount: amount,
        currency: "INR",
        receipt: "order_rcptid_11"
    };

    razorpay.orders.create(options, (err, order) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(order);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
