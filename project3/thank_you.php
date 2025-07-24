<!DOCTYPE html>
<html>
<head>
    <title>Thank You</title>
    <link href="https://fonts.googleapis.com/css2?family=Lexend&display=swap" rel="stylesheet">
    <style>
        body 
        { 
            font-family: 'Lexend', 
            sans-serif; padding: 20px; 
            background-color: #fcfcfa; 
            text-align: center;
        }

        h1 
        {
            color: #d6a1aa;
            text-align: center;
        }
        
        button 
        {
            background-color: #eedcd5;
            border-radius: 10px;
            border: none;
            padding: 10px 20px;
        }

        ul {
            list-style-position: inside;
            padding: 0;
            margin: 0 auto;
            display: inline-block;
            text-align: left;
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
    die("Connection failed: " . $conn->connect_error);
}

$order_id = isset($_GET['order_id']) ? intval($_GET['order_id']) : 0;
if ($order_id <= 0) {
    die("No order found.");
}

$sql = "SELECT p.name, oi.quantity, p.price
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $order_id);
$stmt->execute();
$result = $stmt->get_result();

$total = 0;
?>

 <h1>Thank you for your order!</h1>
    <p>Your order ID: <?= htmlspecialchars($order_id) ?></p>
    <ul>
        <?php while ($row = $result->fetch_assoc()):
            $item_total = $row['price'] * $row['quantity'];
            $total += $item_total;
        ?>
            <li><?= $row['name'] ?> — <?= $row['quantity'] ?> × $<?= number_format($row['price'], 2) ?> = $<?= number_format($item_total, 2) ?></li>
        <?php endwhile; ?>
    </ul>
    <p><strong>Total:</strong> $<?= number_format($total, 2) ?></p>
    <p>Expected ship date: <?= date('F j, Y', strtotime('+2 days')) ?></p>
    <button onclick="window.location.href='products.php'">Back to Shopping</button>

</body>
</html>
