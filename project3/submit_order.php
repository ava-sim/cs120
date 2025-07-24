<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
header('Content-Type: application/json');

$host = 'localhost';
$username = 'um3gonskvtz0f';
$password = 'SitePassword123!';
$dbname = 'dbhio5pdlikg2j';

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Connection failed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

file_put_contents("debug_submit_order.txt", print_r($data, true));

if (!isset($data['items']) || empty($data['items'])) {
    http_response_code(400);
    echo json_encode(["error" => "No items"]);
    exit();
}

$stmt = $conn->prepare("INSERT INTO orders (date) VALUES (CURDATE())");
$stmt->execute();
$order_id = $conn->insert_id;

$stmt = $conn->prepare("INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)");
foreach ($data['items'] as $product_id => $quantity) {
    $stmt->bind_param("iii", $order_id, $product_id, $quantity);
    $stmt->execute();
}

echo json_encode(["success" => true, "order_id" => $order_id]);
?>
