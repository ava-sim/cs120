<!DOCTYPE html>
<html>
<head>
    <title>All Orders</title>
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

        .order {
            border: 1px solid #d6a1aa;
            border-radius: 10px;
            background-color: #fff6f5;
            padding: 15px;
            margin: 20px auto;
            width: 70%;
        }

        ul {
            list-style-position: inside;
            padding-left: 0;
        }

        p strong {
            color: #a35c66;
        }
    </style>
</head>
<body>

<?php
session_start();

ini_set('display_errors', 1);
error_reporting(E_ALL);

$host = 'localhost';
$username = 'um3gonskvtz0f';
$password = 'SitePassword123!';
$dbname = 'dbhio5pdlikg2j';

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT oi.order_id, p.name, oi.quantity, p.price
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        ORDER BY oi.order_id DESC";

$result = $conn->query($sql);

$orders = [];
while ($row = $result->fetch_assoc()) {
    $orders[$row['order_id']][] = $row;
}
?>

<h1>All Orders</h1>

<?php foreach ($orders as $order_id => $items): ?>
    <div class="order">
        <h2>Order #<?= $order_id ?></h2>
        <ul>
            <?php 
            $total = 0;
            foreach ($items as $item):
                $item_total = $item['price'] * $item['quantity'];
                $total += $item_total;
            ?>
                <li><?= $item['name'] ?> — <?= $item['quantity'] ?> × $<?= number_format($item['price'], 2) ?> = $<?= number_format($item_total, 2) ?></li>
            <?php endforeach; ?>
        </ul>
        <p><strong>Total:</strong> $<?= number_format($total, 2) ?></p>
    </div>
<?php endforeach; ?>

</body>
</html>
