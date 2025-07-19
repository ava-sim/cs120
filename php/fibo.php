<?php
if (isset($_GET['n']) && is_numeric($_GET['n'])) {
    $n = intval($_GET['n']);
    $fib = [];

    if ($n > 0) $fib[] = 0;
    if ($n > 1) $fib[] = 1;

    for ($i = 2; $i < $n; $i++) {
        $fib[] = $fib[$i - 1] + $fib[$i - 2];
    }

    $response = [
        "length" => $n,
        "fibSequence" => $fib
    ];

    echo json_encode($response);
} else {
    echo json_encode(["error" => "Please provide a valid numeric value for 'n'."]);
}
?>
