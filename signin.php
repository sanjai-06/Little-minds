<?php
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database connection settings
$servername = "localhost";
$username = "root"; // Your database username
$password = ""; // Your database password
$dbname = "login"; // Your database name

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get user input and trim whitespace
    $user = trim($_POST['email']);
    $pass = trim($_POST['pass']); // No hashing here

    // Prepare the SQL statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM signup WHERE email = ?");
    if ($stmt === false) {
        die('Error preparing statement: ' . $conn->error);
    }

    // Bind the parameter and execute the statement
    $stmt->bind_param("s", $user);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if the username exists
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // Debugging output to see fetched data
        // Uncomment the line below for debugging (remove in production)
        // echo '<pre>'; print_r($row); echo '</pre>';
        print_r($row);
        // Verify the password using the plain text password
        if (password_verify($pass, $row['pasword'])) { // Use the plain text password
            header("Location: home.html");
            exit();
        } else {
            echo "Invalid username or password."; // This indicates the password did not match
        }
    } else {
        echo "Invalid username or password."; // This indicates the username was not found
    }

    // Close the statement
    $stmt->close();
}

// Close the connection
$conn->close();
?>
