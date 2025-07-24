<!DOCTYPE html>
<html>
<link href="https://fonts.googleapis.com/css2?family=Lexend&display=swap" rel="stylesheet">
<head>
    <title>All Products</title>
    <style>

        body 
        {
            font-family: 'Lexend', sans-serif;
            background-color: #fcfcfa;
        }

        h1 
        {
            color: #d6a1aa;
            text-align: center;
        }

        .product 
        { 
            border: 1px solid #d6a1aa;
            padding: 10px; 
            margin: 10px; 
            width: 300px; 
            border-radius: 5px;
        }

        .all_products 
        {
            display: flex;
            text-align: center;
            flex-wrap: wrap;
            justify-content: space-evenly;
        }
        .desc 
        { 
            display: none;
        }

        img 
        { 
            width: 200px;
            height: 300px;
            justify-self: center;
        }

        button
        {
            background-color: #eedcd5;
            border-radius: 10px;
            border: none;
            padding: 10px 20px;

        }

        .first_info
        {
            display: flex;
            justify-content: space-around;
            align-items: center; 
        }

        .button_format
        {
            display: flex;
            justify-content: space-around;
        }

        .orders
        {
            display: block;
            margin: 0 auto 20px auto;
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

if ($conn->connect_error) 
{
    die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT id, name, price, description, img_url FROM products";
$result = $conn->query($sql);
?>


<h1>PRODUCTS</h1>
<button class="orders" onclick="window.location.href='all_orders.php'">See All Orders</button>

<div class="all_products">
    <?php while ($row = $result->fetch_assoc()): ?>
        <div class="product">
            <img src="<?= $row['img_url'] ?>" alt="<?= $row['name'] ?>">
            <h3><?= $row['name'] ?></h3>

            <div class="first_info">
                <p>$<?= number_format($row['price'], 2) ?></p>
                <div>
                    <label for="quantity-<?= $row['id'] ?>">Quantity:</label>
                    <select id="quantity-<?= $row['id'] ?>">
                        <?php for ($i = 1; $i <= 10; $i++): ?>
                            <option value="<?= $i ?>"><?= $i ?></option>
                        <?php endfor; ?>
                    </select>
                </div>
            </div>

            <div class="button_format">
                <button onclick="addToCart(<?= $row['id'] ?>)">Add to Cart</button>
                <button id="button-<?= $row['id'] ?>" onclick="toggleDesc(<?= $row['id'] ?>)">More</button>
            </div>
            <div class="desc" id="desc-<?= $row['id'] ?>">
                <p><?= $row['description'] ?></p>
            </div>
        </div>
    <?php endwhile; ?>
</div>

 <script>
        function toggleDesc(id) 
        {
            const desc = document.getElementById('desc-' + id);
            const button = document.getElementById('button-' + id);
            const isHidden = window.getComputedStyle(desc).display === 'none';

            if (isHidden) {
                desc.style.display = 'block';
                button.innerText = 'Less';
            } else {
                desc.style.display = 'none';
                button.innerText = 'More';
            }
        }


        function addToCart(id) 
        {
            const quantity = document.getElementById('quantity-' + id).value;
            let cart = JSON.parse(localStorage.getItem('cart') || '{}');
            cart[id] = (cart[id] || 0) + parseInt(quantity);
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'cart.php';
        }
    </script>
</body>
</html>
