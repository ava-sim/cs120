<?php

function displayHours() {
    $hours = [
        "Monday" => "9am - 5:30pm",
        "Tuesday" => "9am - 5:30pm",
        "Wednesday" => "9am - 5:30pm",
        "Thursday" => "9am - 4:30pm",
        "Friday" => "9am - 5:30pm",
        "Saturday" => "Closed",
        "Sunday" => "Closed"
    ];

    $output = "<div class='hours'>";
    foreach ($hours as $day => $time) {
        $output .= "<div class='row'><span class='day'>$day</span><span class='time'>$time</span></div>";
    }
    $output .= "</div>";
    return $output;
}
?>

<!DOCTYPE html>
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
        .hours {
            width: 300px;
            font-family: 'Rubik', sans-serif;
            border: 1px;
            padding: 10px;
            text-align: center;
            justify-self: center;
        }

        .row {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
        }

        .day {
            font-weight: bold;
        }

        h2 {
            font-family: 'Barrio', cursive;
            text-align: center;
        }

    </style>
</head>
<body>
    <h2>Ava Sim's Hours</h2>
    <?php echo displayHours(); ?>
</body>
</html>
