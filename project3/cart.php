<!DOCTYPE html>
<html>
<head>
    <title>Your Cart</title>
    <link href="https://fonts.googleapis.com/css2?family=Lexend&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Lexend', sans-serif;
            background-color: #fcfcfa;
            padding: 20px;
        }
        h1 {
            color: #d6a1aa;
            text-align: center;
        }
        #cart-list > div {
            border: 1px solid #d6a1aa;
            border-radius: 5px;
            margin: 10px 0;
            padding: 10px;
            background-color: #fff6f5;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        button {
            background-color: #eedcd5;
            border-radius: 10px;
            border: none;
            padding: 8px 15px;
            cursor: pointer;
            font-family: 'Lexend', sans-serif;
        }
        button:hover {
            background-color: #d6a1aa;
            color: white;
        }
        #order-total {
            text-align: right;
            margin-top: 20px;
            color: #a35c66;
            font-weight: bold;
        }
        .button_format {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 30px;
        }
    </style>
</head>
<body>

<?php
session_start();

$host = 'localhost';
$username = 'um3gonskvtz0f';
$password = 'SitePassword123!';
$dbname = 'dbhio5pdlikg2j';

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("<p>Connection failed: " . $conn->connect_error . "</p>");
}

$sql = "SELECT id, name, price FROM products";
$result = $conn->query($sql);

$products = [];
while ($row = $result->fetch_assoc()) {
    $products[$row['id']] = $row;
}
?>

<h1>Your Cart</h1>
<div id="cart-list"></div>
<h2 id="order-total">Total: $0.00</h2>

<div class="button_format">
    <button onclick="checkout()">Check Out</button>
    <button onclick="window.location.href='products.php'">Continue Shopping</button>
</div>

<script>
    const allProducts = <?= json_encode($products) ?>;

    function renderCart() {
        let cart = JSON.parse(localStorage.getItem('cart') || '{}');
        const cartList = document.getElementById('cart-list');
        cartList.innerHTML = '';

        let orderTotal = 0;

        if (Object.keys(cart).length === 0) {
            cartList.innerHTML = '<p>Your cart is empty.</p>';
            document.getElementById('order-total').innerText = 'Total: $0.00';
            return;
        }

        for (const id in cart) {
            if (allProducts[id]) {
                const product = allProducts[id];
                const quantity = cart[id];
                const priceNum = Number(product.price);
                const total = priceNum * quantity;
                orderTotal += total;

                const itemDiv = document.createElement('div');
                itemDiv.innerHTML = `
                    <span><strong>${product.name}</strong> - Quantity: ${quantity} - Price: $${priceNum.toFixed(2)} - Total: $${total.toFixed(2)}</span>
                    <button onclick="removeFromCart(${id})">Remove from cart</button>
                `;
                cartList.appendChild(itemDiv);
            }
        }
        document.getElementById('order-total').innerText = 'Total: $' + orderTotal.toFixed(2);
    }

    function removeFromCart(id) {
        let cart = JSON.parse(localStorage.getItem('cart') || '{}');
        delete cart[id];
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    function checkout() {
    let cart = JSON.parse(localStorage.getItem('cart') || '{}');
    if (Object.keys(cart).length === 0) {
        alert('Your cart is empty!');
        return;
    }

    fetch("submit_order.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({ items: cart })
    })


    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.removeItem('cart');
            window.location.href = 'thank_you.php?order_id=' + data.order_id;
        } else {
            alert("Failed to submit order.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong during checkout.");
    });
}


    window.onload = renderCart;
</script>

</body>
</html>
