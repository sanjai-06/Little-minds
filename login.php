<?php
// Enable error reporting for debugging purposes
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database connection
$con = mysqli_connect("localhost", "root", "", "login");
if (!$con) {
    die('Connection failed: ' . mysqli_connect_error());
}

// Check if form is submitted
if (isset($_POST["submit"])) {
    // Get form data safely using prepared statements
    $name = $_POST['username'];
    $email = $_POST['useremail'];
    $pass = $_POST['pas'];

    
    $hashedPassword = password_hash($pass, PASSWORD_DEFAULT);
    $stmt = $con->prepare("INSERT INTO signup (username, email, pasword) VALUES (?, ?, ?)");

    if ($stmt === false) {
        die('Error preparing statement: ' . $con->error);
    }

    // Bind the parameters
    $stmt->bind_param("sss", $name, $email, $hashedPassword);

    // Execute the query
    if ($stmt->execute()) {
        header("Location: index.html");
        exit();
    } else {
        echo "Error executing query: " . $stmt->error;
    }

    // Close the statement and connection
    $stmt->close();
    mysqli_close($con);
} else {
    echo "Form not submitted properly.";
}
?>
