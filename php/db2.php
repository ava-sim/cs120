<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
?>

<html>
<link
    href="https://fonts.googleapis.com/css2?family=Rubik&display=swap"
    rel="stylesheet"
  />
    <link
      href="https://fonts.googleapis.com/css2?family=Barrio&family=Open+Sans&display=swap"
      rel="stylesheet"
    />
<head>
    <style>
        .song {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
            text-align: center;
            justify-self: center;
            font-family: 'Rubik', sans-serif;
        }


        h1 {
            font-family: 'Barrio', cursive;
            text-align: center;
        }

    </style>
</head>
<body>
<?php
$server = 'localhost';
$userid = 'um3gonskvtz0f'; 
$pw = 'SitePassword123!'; 
$db = 'dbvxsnlxnbwcdv';

$conn = new mysqli($server, $userid, $pw, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['genres']) && is_array($_GET['genres'])) {
    $genreIDs = array_map('intval', $_GET['genres']); 
    $genreList = implode(',', $genreIDs);

    $sql = "
        SELECT s.name, s.artist, g.genre_name AS genre
        FROM Songs s 
        JOIN SongGenres sg ON s.id = sg.song_id 
        JOIN Genres g ON sg.genre_id = g.id
        WHERE sg.genre_id IN ($genreList)";

    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        echo "<h1>Song List</h1>";
        while ($row = $result->fetch_assoc()) {
            echo "<div class='song'><strong>" . $row["name"] . "</strong> &nbsp;by " . 
                $row["artist"] . 
                " — Genre: " . $row["genre"] . "</div>";
        }
    } else {
        echo "<p>No songs for selected genres.</p>";
    }

}

$conn->close();
?>
</body>
</html>
