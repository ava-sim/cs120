<!DOCTYPE html>
<html lang="en">
<link
    href="https://fonts.googleapis.com/css2?family=Rubik&display=swap"
    rel="stylesheet"
  />
    <link
      href="https://fonts.googleapis.com/css2?family=Barrio&family=Open+Sans&display=swap"
      rel="stylesheet"
    />
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Choose Genres</title>
    <style>
        h1 {
                font-family: 'Barrio', cursive;
                text-align: center;
            }
        input[type=submit] {
            background-color: navy;
            color: white;
            padding: 10px 20px
            border: none;
            border-radius: 5px;
            font-size: 16px;
        }
        form {
            text-align: left;
            justify-self: center;
            font-family: 'Rubik', sans-serif;
        }
    </style>
</head>
<body>

<?php
$host = 'localhost';
$username = 'um3gonskvtz0f';
$password = 'SitePassword123!';
$dbname = 'dbvxsnlxnbwcdv';

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) 
{
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, genre_name FROM Genres";
$result = $conn->query($sql);


if ($result) 
{
    echo "<form method='get' action='db2.php'>";
    echo "<h1>Choose genres:</h1>";

    while ($row = $result->fetch_assoc()) 
    {
        $id = $row['id'];
        $genre_name = $row['genre_name'];
        echo "<input type='checkbox' name='genres[]' value='$id'> $genre_name <br>";
    }

    echo "<br><input type='submit' value='Display songs'>";
    echo "</form>";
} 
else 
{
    echo "Query failed: " . $conn->error;
}

$conn->close();
?>

</body>
</html>

