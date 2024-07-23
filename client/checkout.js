document.addEventListener('DOMContentLoaded', () => {
    const orderSummary = document.getElementById('order-summary');
    const totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

    function renderOrderSummary() {
        if (totalPrice && orderSummary) {
            orderSummary.innerHTML = `<p>Total Price: $${totalPrice.toFixed(2)}</p>`;
        } else {
            orderSummary.innerHTML = `<p>No items in the cart.</p>`;
        }
    }

    renderOrderSummary();

    document.getElementById('rzp-button1').addEventListener('click', function(e) {
        e.preventDefault();

        fetch('/createOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: totalPrice * 100 }) // Amount in paise
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.id) {
                const options = {
                    "key": "rzp_test_bDI9G3zKYaOmJC", // Enter the Key ID generated from the Dashboard
                    "amount": data.amount,
                    "currency": "INR",
                    "name": "Jewelry Store",
                    "description": "Test Transaction",
                    "image": "../images/logo.png",
                    "order_id": data.id,
                    "handler": function(response) {
                        alert("Payment ID: " + response.razorpay_payment_id);
                        alert("Order ID: " + response.razorpay_order_id);
                        alert("Signature: " + response.razorpay_signature);
                        // Handle the success or failure response here
                    },
                    "prefill": {
                        "name": "Your Name",
                        "email": "your.email@example.com",
                        "contact": "9999999999"
                    },
                    "theme": {
                        "color": "#F37254"
                    }
                };
                const rzp1 = new Razorpay(options);
                rzp1.open();
            } else {
                console.error('Error in response:', data);
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
